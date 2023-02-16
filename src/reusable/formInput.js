import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Switch,
  Radio,
  Tooltip,
  message
} from 'antd';
import ImagesUpload from '../views/images-upload/images-upload';
import GroupItems from '../views/groupItems';
import DynamicDropdown from './dynamicDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { removeGroupItemAnswer, addNewGroupItem } from '../store/reducer/checklist';
import {
  DeleteOutlined, PlusOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import CustomSwitch from '../reusable/switch';

const { TextArea } = Input;
const { Option } = Select;



const FormInput = (props) => {
  const dispatch = useDispatch();
  const { type, options, label, count, dynamicWidth, weight, itemId, additionalId, required, hasError, minValue, maxValue, isGroupItem, onlyItems, sectionIndex, itemIndex, subSectionIndex } = props;
  //additionalId is for group items only...so as to have a unique name for switch toggle class
  // console.log('props check', props)
  const [addMore, setAddMore] = useState(0);
  const [inputArray, setInputArray] = useState([{ index: addMore }]);
  const [value, setValue] = useState(props.value);
  const [groupInitialVal, setGroupInitialVal] = useState(props.value ? props.value : [props?.config?.fields]);
  const [localError, setLocalError] = useState(props?.localError ?? false)


  useEffect(() => {
    setValue(props.value);
    setGroupInitialVal(props.value ? props.value : [props?.config?.fields]);
  }, [props.value])

  useEffect(() => {
    props.numOfAddMore(groupInitialVal?.length);
  }, [groupInitialVal])



  const handleValueChange = async (value, index, fieldIndex) => {
    setValue(value);
    let inputType = type.toLowerCase()
    if (inputType === 'text') {

    } else {
      props.onInputValueChange(value, index, fieldIndex);
    }
    handleDirtyFlag();
  };

  const handleDirtyFlag = () => {
    props.handleDirtyFlag()
  }

  const handleAddMoreInput = () => {
    let addMoreItemVal = addMore + 1;
    setAddMore(addMoreItemVal);
    setInputArray([...inputArray, { index: addMoreItemVal }]);
  };

  const handleRemoveInput = (index) => {
    let filteredInputArray = inputArray.filter((item) => item.index !== index);
    setInputArray(filteredInputArray);
  };

  const handleRemoveGroupAnswer = (addMoreIndex) => {

    let filtered = groupInitialVal.filter((item, index) =>
      addMoreIndex !== index
    );

    setGroupInitialVal(filtered);

    props.handleRemoveGroupItemAnswer(addMoreIndex)
    handleDirtyFlag()
  }

  const handleSwitchValueChange = (e) => {
    handleValueChange(e);
  }


  const checkRequired = (item) => {
    let isInvalid = false;
    if (item.some(it => it.answer)) {
      item && item.forEach((eachItem) => {

        if (eachItem.required) {
          if (eachItem.answer) {
            isInvalid = false
          } else {
            isInvalid = true
          }
        }
      })
    } else {
      isInvalid = true
    }
    setLocalError(isInvalid)

    if (!isInvalid) {
      setGroupInitialVal([...groupInitialVal, props.config.fields]);
      dispatch(addNewGroupItem({ sectionIndex: sectionIndex, itemIndex: itemIndex, subSectionIndex: subSectionIndex, item: props?.config?.fields }));
      setLocalError(false);
      return;
    }
    message.info('You must fill the preceding entry.');
  }

  // console.log('has error here', hasError);

  let inputLabel = '';
  let additionalLabel = type === 'dynamic dropdown' ?
    props?.source_url.split('=')[1] ? ' (' + props?.source_url.split('=')[1] + ')' : ''
    : ''
  if (label) {
    inputLabel = `${label}${additionalLabel} ${count > 1 ? `(Multiple-${count}max)` : ''}`;
  }
  const inputField = () => {
    let input;
    switch (type.toLowerCase()) {
      case 'text':
        input = (
          <Input
            size='large'
            onChange={(e) => handleValueChange(e.target.value)}
            onBlur={(e) => props.onInputValueChange(e.target.value)}
            // defaultValue={value}
            value={value ?? ''}

          />
        );

        break;

      case 'number':
        input = (
          <InputNumber
            size='large'
            className='w-100'
            onChange={(value) => handleValueChange(value)}
            type="number"
            value={value ?? ''}
            min={minValue}
            max={maxValue}
            placeholder={`${minValue ? minValue + ' - ' + maxValue : ''}`
            }
          />
        );

        break;

      case 'switch':
        input = (
          <>
            <CustomSwitch
              value={value}
              itemId={itemId}
              additionalId={additionalId}
              handleSwitchValueChange={handleSwitchValueChange}
              groupIndex={props.groupIndex}
              showError={props?.localError}

            />

          </>
        )
        break;

      case 'dropdown':
        input = (
          <>
            {options && (
              <Select
                defaultValue={value ?? {}}
                onChange={(value) => handleValueChange(value)}

              >
                {options?.map((item, index) => {
                  return (
                    <Option value={item} key={index.toString()}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            )}
          </>
        );
        break;

      case 'dynamic dropdown':
        input = (
          <DynamicDropdown
            url={props?.source_url}
            onChange={(value) => { handleValueChange(value) }}
            count={count}
            defaultValue={value}
            placeholder="Select" />
        );
        break;

      case 'time':
        // console.log('erros at time', localError, hasError)
        input = (
          <div className="input-time">
            <input
              type="time"
              onChange={(e) => handleValueChange(e.target.value)}
              value={value ?? ''}
              className={props.localError ? 'border-red' : ''}
            />
          </div>
        );
        break;

      case 'image':
        input = (
          <ImagesUpload
            onChange={(files) => {
              handleValueChange(files)
            }}
            count={count}
            value={value ?? ''}
            itemId={itemId}
          />
        );
        break;

      case 'group':
        input = (
          <>
            {Array.isArray(groupInitialVal) && groupInitialVal?.map((item, index) => {
              return (
                <div key={index.toString()} className="group-item">
                  <GroupItems
                    config={item}
                    onInputValueChange={(val, fieldIndex) => handleValueChange(val, index, fieldIndex)}
                    noOfItems={addMore + 1}
                    answer={item}
                    handleDirtyFlag={props.handleDirtyFlag}
                    itemId={itemId}
                    groupIndex={index}
                    localError={localError}
                  />
                  {groupInitialVal?.length > 1 && (
                    <Tooltip title="Remove item."><Button type="danger" shape="circle" icon={<DeleteOutlined style={{ fontSize: 16 }} />} onClick={() => handleRemoveGroupAnswer(index)} className="remove-button" /></Tooltip>
                  )}

                </div>
              )
            })
            }
            {groupInitialVal?.length < count &&
              <div className="add-btn-grp">
                <Button
                  size='small'
                  htmlType='submit'
                  type='primary'
                  shape='round'
                  onClick={() => {
                    checkRequired(groupInitialVal[groupInitialVal?.length - 1])
                  }}
                >
                  <PlusOutlined />
                ADD
          </Button>
              </div>
            }
          </>
        )

        break;

      default:
        input = <p>Type mismatch</p>;
        break;
    }

    return input;

  }

  return (

    <div
      className={`form-input-container ${dynamicWidth ? (weight ? `col-${weight}` : '') : ''
        }`}
    >
      <Form.Item
        label={!onlyItems && label && <span>{inputLabel}{required ? <span className="required icon-required">*</span> : <></>}</span>}
        validateStatus={(hasError || localError) ? 'error' : ''}
        help={(hasError || localError && required) && "Input fields with * are required"}
      // hasFeedback
      >
        {inputField()}
      </Form.Item>
    </div>

  );
};

export default memo(FormInput);
