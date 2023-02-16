import React, {
  useState,
  forwardRef,
  useRef,
} from 'react';
import ItemsComponent from '../items';
import { Form, Button, Spin } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { data, authCred } from '../../store/reducer/auth';
// import { updateSectionApi } from '../../services/section';
// import { removeDirtyCheck, addHasError } from '../../store/reducer/checklist';
// import notification from '../../reusable/notification';

const SubSectionComponent = forwardRef((props, ref) => {
  const childRef = useRef();
  const { subSections, sectionIndex } = props;
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const userData = useSelector(data);
  // const authCredential = useSelector(authCred);
  // const [currentSubSectionIndex, setCurrentSubSectionIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false);

  // const checkAuthentication = (subSectionIndex) => {
  //   if (isAuthenticated) {
  //     handleSubmit(null, null, subSectionIndex)
  //     return true
  //   }
  //   setCurrentSubSectionIndex(subSectionIndex)
  //   setAuthModal(!showAuthModal);
  //   return false
  // };

  // const handleSubmit = (authSuccessResponse, authCred, subSectionIndex) => {
  //   if (!validation(subSectionIndex)) {
  //     notification.error({
  //       message: 'Fields with * must be answered',
  //     });
  //     return;

  //   }
  //   let subSectionInd = subSectionIndex;
  //   if (!subSectionIndex) {
  //     subSectionInd = currentSubSectionIndex
  //   }
  //   let answersArr = [];
  //   subSections[subSectionInd].items.forEach(item => {
  //     answersArr.push({ item_id: item?.id, answer: item?.answer, additional_answer: item?.config?.fields })
  //   })
  //   let authHeader = {
  //     userid: userData?.id,
  //     pin: authCredential?.pin,
  //   };
  //   if (authSuccessResponse) {
  //     authHeader = {
  //       userid: authSuccessResponse?.data?.id,
  //       pin: authCred?.pin,
  //     };
  //   }
  //   let dataForSubmission = {
  //     response_id: localStorage.getItem('responseId'),
  //     answers: answersArr,
  //   };
  //   setSubmitting(true);
  //   updateSectionApi(dataForSubmission, authHeader, () => {
  //     dispatch(removeDirtyCheck({ sectionIndex, subSectionIndex }))
  //   }, () => setSubmitting(false));
  // };

  // const validation = (subSectionIndex) => {
  //   let isValid = true;
  //   subSections[subSectionIndex].items.forEach((item, index) => {
  //     if (!item.answer || item.answer == 'undefined') {
  //       isValid = false;
  //       dispatch(addHasError({ sectionIndex, subSectionIndex, itemIndex: index }))

  //     }
  //   })
  //   return isValid;
  // }

  return (
    <>
      <Spin spinning={submitting}>
        {subSections?.map((subSection, index) => {
          return (
            <div key={index.toString()}>
              <div className='form-title'>
                <h4>{subSection.name}{props?.activeSubMenu !== undefined && subSection?.description + ' (' + subSection?.item_number + ')'}</h4>
              </div>
              <Form
                //onFinish={onFinish}
                layout={'vertical'}
                className='form--checklist'
                form={form}
                initialValues={{ remember: true }}
              >
                {subSection?.items.map((item, itemIndex) => {

                  return (
                    <ItemsComponent
                      key={itemIndex.toString()}
                      item={item}
                      itemIndex={itemIndex}
                      subSectionIndex={props?.activeSubMenu !== undefined ? props?.activeSubMenu : index}
                      sectionIndex={sectionIndex}
                      ref={childRef}
                      configFields={item?.config?.fields}
                      isSectionItem={false}
                    />
                  );
                })}
              </Form>
              <div className='d-flex mb-5 justify-content-center mt-4'>
                <Button
                  size='large'
                  htmlType='submit'
                  type='primary'
                  className='save-btn'
                  // shape='round'
                  block
                  onClick={() => props.handleSubmit(index)}
                >

                  save data
            </Button>
              </div>

            </div>
          );
        })}
        {/* <AuthModal
          visible={showAuthModal}
          onCancel={() => setAuthModal(false)}
          onSuccess={(response, authCred) => {
            handleSubmit(response, authCred);
            setAuthModal(false);
          }}
          fromHeader={false}
        /> */}
      </Spin>
    </>
  );
});

export default React.memo(SubSectionComponent);
