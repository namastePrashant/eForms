import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsers } from '../../../store/reducer/users';
import { Button, Form, Input, Select, Modal, Spin, Divider, Checkbox, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { closeResponseApi, getResponseHtmlApi } from '../../../services/response';
import AuthModal from '../../../reusable/authModal';
import { selectAuthStatus } from '../../../store/reducer/auth';
import { data, authCred } from '../../../store/reducer/auth';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { selectChecklist } from '../../../store/reducer/checklist';
import notification from '../../../reusable/notification';
import { CaretRightOutlined } from '@ant-design/icons';
import { addHasError } from '../../../store/reducer/checklist';

const { Option } = Select;

const productCheck = [
  { id: 0, value: '0', name: 'Ok' },
  { id: 1, value: '1', name: 'Not Ok' },
];
const FinalInspection = (props) => {
  const { confirm } = Modal;
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setAuthModal] = useState(false);
  const [submitObject, setSubmitObject] = useState({});
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userStatus = useSelector((state) => state.users.status);
  const isAuthenticated = useSelector(selectAuthStatus);
  const userData = useSelector(data);
  const authCredential = useSelector(authCred);
  const [submitting, setSubmitting] = useState(false)
  const checklist = useSelector(selectChecklist);
  const [showSummaryModal, setSummaryModal] = useState(false);
  const [htmlFetch, setHtmlFetch] = useState(false);
  const responseReducer = useSelector(state => state.response);
  const [responseHtml, setResponseHtml] = useState()
  const [validating, setValidating] = useState(false);
  const [acceptanceValue, setAcceptanceValue] = useState(false);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    getResponseHtml()
  }, [])

  useEffect(() => {
    setShowModal(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (responseReducer.responseHtml) {
      setResponseHtml(responseReducer.responseHtml)
    }
  }, [responseReducer])

  const handleSubmit = (successResponse, authCred, answerObject) => {
    let authHeader = {
      userid: userData?.id,
      pin: authCredential?.pin,
    };
    if (successResponse) {
      authHeader = {
        userid: successResponse?.data?.id,
        pin: authCred?.pin,
      };
    }
    setAuthModal(false);

    let answer = answerObject;
    if (!answerObject) {
      answer = submitObject
    }
    // dispatch(
    // let closeResponse = closeResponseApi(answer, authHeader, (response) =>
    //   handleSuccess(response)
    // )
    setSubmitting(true);
    closeResponseApi({ ...answer, agreement: answer?.agreement ? 1 : 0 }, authHeader, (response) =>
      handleSuccess(response), () => { console.log('failed to close the form') }, () => setSubmitting(false)
    )
    // console.log('closeRes', closeResponse);
    // dispatch(closeResponse);
    // );
  };

  const getResponseHtml = () => {
    let authHeader = {
      userId: localStorage.getItem('userId'),
      pin: localStorage.getItem('pin')
    }
    let responseId = localStorage.getItem('responseId');
    setHtmlFetch(true);
    dispatch(getResponseHtmlApi(responseId, authHeader, () => setHtmlFetch(false)))
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(() => { setValidating(false); }, ms));
  }

  const onFinish = async (values) => {
    setSubmitObject(values);
    console.log('submission value', values)
    if (!acceptanceValue) {
      notification.error({
        message: "Please accept the terms"
      })
      return;
    }
    console.log('on finish ', values);

    if (validating) { return; }
    setValidating(true);
    if (!await validation()) {
      // console.log('validation failure');
      notification.error({
        message: "Looks like some of the required fields are yet to be answered."
      })
      return;
    }
    if (checkDirty()) {
      notification.error({
        message: "Looks like some of the item data hasn't been submitted. Make sure you have submitted the changes."
      })
      return
    }
    showCloseConfirm(values);
  };

  const validation = async () => {
    const validationRes = await validationProcess();
    setValidating(false);
    return validationRes;
  }

  const validationProcess = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let isValid = true;

        checklist.sections.forEach((section, sectionIndex) => {
          let currentSection = section;
          if (currentSection.items.length > 0) {
            currentSection.items.forEach((item, index) => {
              // console.log('item check', item)
              if (item.required) {
                if (!item.answer) {
                  isValid = false
                  dispatch(addHasError({ sectionIndex: sectionIndex, itemIndex: index }))
                }
                if (item.config) {
                  if (item.type === 'group') {
                    if (item.answer) {
                      item.answer.forEach((fieldItem, fieldItemIndex) => {
                        // console.log('field item here', fieldItem)
                        if (Array.isArray(fieldItem)) {
                          // console.log('array field item here', fieldItem);
                          fieldItem.forEach((fieldItemChild, fieldItemChildIndex) => {
                            // console.log('fieldItemChild', fieldItemChild)
                            if (fieldItemChild.required && !fieldItemChild.answer) {
                              isValid = false;
                              dispatch(addHasError({ sectionIndex: sectionIndex, itemIndex: index, fieldItemIndex: fieldItemChildIndex }))
                            }
                          })
                        }
                        else if (fieldItem.required && !fieldItem?.answer) {
                          isValid = false;
                          dispatch(addHasError({ sectionIndex, itemIndex: index, fieldItemIndex }))
                        }
                      })
                    } else {
                      item.config.fields.forEach((fieldItem, fieldItemIndex) => {
                        // console.log('fieldITem', fieldItem)
                        if (fieldItem.required && !fieldItem.answer) {
                          isValid = false;
                          dispatch(addHasError({ sectionIndex, itemIndex: index, fieldItemIndex: fieldItemIndex }))
                        }
                      })

                    }
                  }
                }

              }
            });
          }


          if (currentSection.sub_sections.length > 0) {

            currentSection.sub_sections.forEach((subSection, subSectionIndex) => {
              subSection.items.forEach((item, index) => {
                if (item.required) {
                  if (!item.answer) {
                    isValid = false;
                    dispatch(addHasError({ sectionIndex, subSectionIndex, itemIndex: index }))
                  }

                  if (item.config) {
                    // if (item.type === 'group') {
                    if (item.answer) {
                      if (Array.isArray(item.answer)) {
                        item.answer.forEach((fieldItem, fieldItemIndex) => {
                          if (fieldItem.required) {
                            if (!fieldItem?.answer) {
                              isValid = false;
                              dispatch(addHasError({ sectionIndex, subSectionIndex, itemIndex: index, fieldItemIndex }))
                            }
                          }
                        })
                        // isValid = checkGroupItemsAnswer(item.answer, sectionIndex, subSectionIndex, index, true)
                      }
                    }
                    // isValid = checkGroupItemsAnswer(item.config.fields, sectionIndex, subSectionIndex, index, true)
                    item.config.fields.forEach((fieldItem, fieldItemIndex) => {
                      if (fieldItem.required) {
                        if (!fieldItem?.answer) {

                          if (!fieldItem.answer) {
                            isValid = false;
                            dispatch(addHasError({ sectionIndex, subSectionIndex, itemIndex: index, fieldItemIndex }))
                            dispatch(addHasError({ sectionIndex, subSectionIndex: subSectionIndex, itemIndex: index, fieldItemIndex: fieldItemIndex }))
                          }
                        }
                      }

                    })


                    if (item.type === 'switch') {
                      //action is required when switch value fails
                      if (item.answer === 'fail') {
                        if (item.answer === 'fail') {
                          item.config.fields.forEach((fieldItem, fieldItemIndex) => {

                            if (!fieldItem?.answer) {
                              isValid = false;
                              dispatch(addHasError({ sectionIndex, subSectionIndex, itemIndex: index, fieldItemIndex }))
                            }

                          })
                        }
                      }


                      // isValid = checkGroupItemsAnswer(item.config.fields, sectionIndex, subSectionIndex, index, false)
                    }
                  }

                }

              })
            })
          }
        })
        // console.log('isValid check ---', isValid)
        resolve(isValid)
      }, 0)

    })

  }

  const checkGroupItemsAnswer = (arr, sectionIndex, subSectionIndex, itemIndex, checkRequired) => {
    console.log('item for validation', arr)
    let isValid = true;
    Array.isArray(arr) && arr.forEach((fieldItem, fieldItemIndex) => {
      if (fieldItem.required || !checkRequired) {
        //!checkRequired is for those items that that donot have required prop(specifically switch false case)
        if (!fieldItem.answer) {
          isValid = false;
          dispatch(addHasError({ sectionIndex, subSectionIndex: subSectionIndex, itemIndex: itemIndex, fieldItemIndex: fieldItemIndex }))
        }
      }

    })
    console.log('isValid check ahead', isValid)
    return isValid
  }


  const checkDirty = () => {
    let isDirty = false
    if (checklist.sections.forEach(section => {
      if (section.isDirty) {
        isDirty = true;
      }
    }))
      return isDirty;
  }


  const handleSuccess = (response) => {
    localStorage.clear();
    props.history.push({
      pathname: '/responses',
    });
    return true;
  };

  const checkAuthentication = (answerObject) => {
    if (isAuthenticated) {
      handleSubmit(null, null, answerObject);
    } else {
      setAuthModal(true);
    }
  };

  const showCloseConfirm = (values) => {
    confirm({
      title: 'Are you sure you want to close this checklist?',
      icon: <ExclamationCircleOutlined />,
      content: 'Checklist that has been closed once cannot be edited again.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        checkAuthentication(values)
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  const validationCheckbox = (rule, value) => {
    if (acceptanceValue) {
      return true;
    }

    notification.error({
      message: "Please accept the terms"
    })

  };

  const toggleSummaryModal = () => {
    setSummaryModal(!showSummaryModal)
  }

  return (

    <>
      <div className="inspection-wrapper">
        <div className="container-fluid">
          <div className='closing-form-container row'>
            <Spin spinning={submitting}>

              <div className='closing-form'>

                <Form
                  name='auth-form'
                  className='login-form'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                // onFinishFailed={() => setValidating(false)}
                >
                  <Form.Item
                    name='supervisior'
                    label='Supervisor'
                    layout={'horizontal'}
                    rules={[{ required: true, message: 'Please select supervisor.' }]}
                  >
                    <Select
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Select User'
                      size='large'
                    >
                      {users?.map((user) => {
                        if (user?.user_role?.toLowerCase() === 'supervisor') {
                          return (
                            <Option key={user.email} value={user.id}>
                              {user.name}
                            </Option>
                          )
                        }
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='final_inspector'
                    label='Final Inspector'
                    layout={'vertical'}
                    rules={[{ required: true, message: 'Please select final inspector.' }]}
                  >
                    <Select
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Select User'
                      size='large'
                    >
                      {users?.map((user) => (
                        <Option key={user.email} value={user.id}>
                          {user.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='product_ok'
                    label='Product Check'
                    layout={'vertical'}
                    rules={[{ required: true, message: 'Please select product check status!' }]}
                  >
                    <Select
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Select One'
                      size='large'
                    >
                      {productCheck?.map((prod) => (
                        <Option key={prod.name} value={prod.value}>
                          {prod.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Row>
                    <Col span={24} className='gutter-row'>
                      <Form.Item
                        name='checked_by'
                        label='Checked by'
                        layout={'vertical'}
                        rules={[{ required: true, message: 'Please select user!' }]}
                      >
                        <Select
                          prefix={<UserOutlined className='site-form-item-icon' />}
                          placeholder='Select User'
                          size='large'
                        >
                          {users?.map((user) => (
                            <Option key={user.email} value={user.id}>
                              {user.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className='gutter-row'>
                      <Form.Item
                        name='comment'
                        label="Additional comments"
                      >
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="check-notice">

                    <Row>
                      <Col span={24} className='gutter-row'>
                        <p>
                          <strong>Important Note: </strong> Any Underweight Retail Products MUST NOT be packed for Retail Sale. Product to be packed into Foodservice cartons or placed in yellow bins and crushed.
                  </p>
                      </Col>
                      <Col span={6} className='gutter-row'>
                        <Form.Item
                          name='agreement'
                          initialValue={false}
                          valuePropName="checked"
                        >
                          <Checkbox
                            checked={acceptanceValue}
                            defaultChecked={acceptanceValue}
                            onChange={(e) => setAcceptanceValue(e.target.checked)}>
                            I accept
                            </Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  <div className='mt-3 d-flex justify-content-center'>
                    <Button className="ant-btn ant-btn-lg btn--gray mr-3" size='large' shape="round" onClick={() => toggleSummaryModal()} loading={htmlFetch}>
                      View Summary
                </Button>
                    <Button
                      htmlType='submit'
                      type='primary'
                      size='large'
                      className=""
                      shape="round"
                      loading={validating}
                      onClick={() => validation()}
                    >
                      {validating ? 'Please wait...' : 'Submit & Close Form'}
                    </Button>
                  </div>
                </Form>

                <AuthModal
                  visible={showAuthModal}
                  onCancel={() => setAuthModal(false)}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  onSuccess={(response, authCred) => {
                    handleSubmit(response, authCred);
                  }}
                  fromHeader={false}
                  disableToast={true}
                />
                <Modal visible={showSummaryModal}
                  onCancel={toggleSummaryModal}
                  width='100%'
                  height='80%'
                  closable={false}
                  zIndex={99999} >
                  {responseHtml &&
                    <iframe frameBorder="0"
                      className="iframe-container"
                      srcDoc={`<link href="https://staging.jaalx.com/altimate/css/app.css" rel="stylesheet">${responseHtml}`}
                      allowFullScreen={true}

                    />}
                </Modal>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(FinalInspection);
