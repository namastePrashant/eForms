import React, {
  useState,
  forwardRef,
} from 'react';
import { Form } from 'antd';
import Icon, { } from '@ant-design/icons';
import FormInput from '../../reusable/formInput';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { addDirtyCheck } from '../../store/reducer/checklist';
import { updateItemAnswer, updateAdditionalAnswer, updateSubSectionItemAnswer, updateGroupItemAnswer, removeGroupItemAnswer, updateSubSectionGroupItemAnswer, removeSubSectionGroupItemAnswer, addHasError, removeHasError, addRequired } from '../../store/reducer/checklist';

const DotSvg = () => (
  <svg height="6" width="6">
    <circle cx="3" cy="3" r="3" fill="black" />
  </svg>
);

const ItemsComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { item, itemIndex, configFields, sectionIndex, subSectionIndex, isSectionItem } = props;
  const [form] = Form.useForm();
  const [addMoreCount, setAddMoreCount] = useState(1)

  const handleItemAnswered = (value, addMoreIndex, isGroup, fieldIndex) => {
    // console.log('handleItemAnswered', value, addMoreIndex, isGroup);
    if (isSectionItem) {
      if (isGroup) {
        dispatch(updateGroupItemAnswer({ sectionIndex, itemIndex, value, addMoreIndex, fieldIndex }))
      } else {
        dispatch(updateItemAnswer({ sectionIndex, itemIndex, value }))
      }
    } else {
      if (isGroup) {
        dispatch(updateSubSectionGroupItemAnswer({ sectionIndex, subSectionIndex, itemIndex, value, addMoreIndex, fieldIndex }))
      } else {
        dispatch(updateSubSectionItemAnswer({ sectionIndex, subSectionIndex, itemIndex, value }))
      }
    }


  };

  const handleAdditionalAnswers = (
    value,
    fieldIndex,

  ) => {

    new Promise(resolve => {
      setTimeout(() => {
        dispatch(updateAdditionalAnswer({ sectionIndex, subSectionIndex, itemIndex, fieldIndex, value }))
      }, 0);
    });

  };

  let fields = item?.config?.fields;


  const handleRemoveGroupItemAnswer = (addMoreIndex) => {
    if (subSectionIndex !== undefined) {
      dispatch(removeSubSectionGroupItemAnswer({ addMoreIndex, sectionIndex, subSectionIndex, itemIndex }))
    } else {
      dispatch(removeGroupItemAnswer({ addMoreIndex, sectionIndex, itemIndex }))
    }
  }

  const handleDirtyFlag = () => {
    new Promise(resolve => {
      setTimeout(() => {
        dispatch(addDirtyCheck({ sectionIndex, subSectionIndex, itemIndex }))
      }, 0);
    });

  }

  // console.log('props.items', props.item)

  return (
    <>
      <div className={`item-container ${item.isDirty ? 'isDirty' : ''} ${item.hasError ? 'hasError' : ''}`}>
        < div className='col-12'>
          <div className={`row item-header ${item.required ? 'header-required' : ''}`}>
            <span className={`form-subheader`}>
              {item.question}
              {item?.type === 'dynamic dropdown' ?
                item?.options?.source_url?.split('=')[1] ? ' (' + item?.options?.source_url.split('=')[1]?.toUpperCase() + ')' : ''
                : ''}
              {item.required == 1 ? (<span className="icon-required" >*  </span>) : <></>}
              {/* {item.hasError && !item.answer && <Tooltip title="An error has occured in this item."> <ExclamationCircleOutlined style={{ color: 'red' }} /></Tooltip>} */}
            </span>

            {/* this is the one at right side of item header,which is only
                  for switch */}
            {item.type === 'switch' && (
              <FormInput
                type={item.type}
                options={
                  item.type === 'dropdown' || item.type === 'switch'
                    ? item.options
                    : []
                }
                config={item.config}
                onInputValueChange={(value, index, fieldIndex) => {

                  if (value === 'fail') {
                    if (item.config.fields[1].answer === undefined || item.config.fields[1].answer === '') {
                      dispatch(addHasError({ sectionIndex: sectionIndex, subSectionIndex: subSectionIndex, itemIndex: itemIndex, forSwitchFailCase: true }))
                    }
                    else {
                      dispatch(addRequired({ sectionIndex: sectionIndex, subSectionIndex: subSectionIndex, itemIndex: itemIndex }))
                    }
                  } else {
                    dispatch(removeHasError({ sectionIndex: sectionIndex, subSectionIndex: subSectionIndex, itemIndex: itemIndex, forSwitchFailCase: true }))
                  }

                  handleItemAnswered(value, index, fieldIndex);
                }}
                value={item?.answer}
                handleRemoveGroupItemAnswer={handleRemoveGroupItemAnswer}
                handleDirtyFlag={handleDirtyFlag}
                itemId={item?.id}
                required={item?.required}
                numOfAddMore={() => { }}
                onlyItems={props?.onlyItems}
                sectionIndex={sectionIndex}
                itemIndex={itemIndex}
                subSectionIndex={subSectionIndex}
              />
            )}
            {item.type === 'group' && item?.config?.count > 1 && (<span className="grp-item-count">{addMoreCount} / {item?.config?.count}</span>)}

          </div>
        </div>
        <div className='col-md-12'>
          {/* this is for main items' input */}
          {item.type !== 'switch' && (
            <FormInput
              type={item.type}
              count={item.type === 'group' ? item.config.count : 1}
              config={item.config}
              dynamicWidth={item.type !== 'group' ? true : false}
              onInputValueChange={(value, addMoreIndex, fieldIndex) => {
                handleItemAnswered(value, addMoreIndex, item.type === 'group' ? true : false, fieldIndex);
              }}
              value={item?.answer}
              handleRemoveGroupItemAnswer={handleRemoveGroupItemAnswer}
              source_url={item?.options?.source_url}
              handleDirtyFlag={handleDirtyFlag}
              itemId={item?.id}
              required={item?.required}
              hasError={item.type !== 'group' && item?.hasError}
              numOfAddMore={(num) => setAddMoreCount(num)}
              onlyItems={props?.onlyItems}
              sectionIndex={sectionIndex}
              itemIndex={itemIndex}
              subSectionIndex={subSectionIndex}
            // answer={item?.answer}
            />
          )}
          <div className='row'>
            {/* this is for items other than group */}
            {/* this for for config fields inputs */}
            {item.type !== 'group' &&
              fields?.map((fieldItem, fieldIndex) => {
                return (
                  <FormInput
                    key={fieldIndex.toString()}
                    type={fieldItem.type}
                    label={fieldItem.label}
                    dynamicWidth
                    count={fieldItem.count}
                    source_url={fieldItem?.source_url}
                    onInputValueChange={(value, addMoreIndex, addMoreCount) => {
                      handleAdditionalAnswers(
                        value,
                        fieldIndex,
                      );
                    }}
                    weight={fieldItem?.weight}
                    value={fieldItem?.answer}
                    handleRemoveGroupItemAnswer={handleRemoveGroupItemAnswer}
                    itemId={item?.id}
                    handleDirtyFlag={handleDirtyFlag}
                    required={fieldItem?.required}
                    hasError={fieldItem?.hasError}
                    minValue={fieldItem?.min}
                    maxValue={fieldItem?.max}
                    numOfAddMore={() => { }}
                    onlyItems={props?.onlyItems}
                    sectionIndex={sectionIndex}
                    itemIndex={itemIndex}
                    subSectionIndex={subSectionIndex}
                  />
                );
              })}
          </div>
        </div>
        {/* {item?.hasError && <span>Some fields are missing</span>} */}
      </div>
    </>
  );
});

export default React.memo(ItemsComponent);
