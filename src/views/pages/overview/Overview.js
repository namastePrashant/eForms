import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, DatePicker, Row, Col, Divider, Select } from 'antd';
import { fetchUsers, selectUsers } from '../../../store/reducer/users';
import { selectAllMachines } from '../../../store/reducer/machine';
import { selectAllSkus } from '../../../store/reducer/sku';
import { selectAllCheckLists, selectChecklist } from '../../../store/reducer/checklist';

import { getAllMachinesApi } from '../../../services/machine';
import { getAllSkuApi } from '../../../services/sku';
import { getAllChecklistApi } from '../../../services/checklist';

import { useDispatch, useSelector } from 'react-redux';
import { createResponseApi, updateResponseApi } from '../../../services/response';
import AuthModal from '../../../reusable/authModal';
import moment from 'moment';
import { data, authCred, selectAuthStatus } from '../../../store/reducer/auth';
import InitialHeader from '../../../reusable/initialHeader';
import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';


const { Option } = Select;

const Overview = (props) => {
  const [showAuthModal, setAuthModal] = useState(false);
  const [submitObject, setSubmitObject] = useState({});
  const users = useSelector(selectUsers);
  const machines = useSelector(selectAllMachines);
  const skus = useSelector(selectAllSkus);
  const checklists = useSelector(selectAllCheckLists);
  const singleChecklist = useSelector(selectChecklist);
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);
  const { isUpdate } = props;
  const [forCreate, setForCreate] = useState(props?.location?.state?.purpose === 'create' ? true : false)
  const [initialValue, setInitialValue] = useState({
    checklist_id: forCreate ? '' : singleChecklist?.response?.checklist_id,
    machine_id: forCreate ? '' : singleChecklist?.response?.machine_id,
    machine_operators: forCreate ? [] : singleChecklist?.response?.machine_operators.map(mac => mac.id),
    packaging_staffs: forCreate ? [] : singleChecklist?.response?.packaging_staffs.map(ps => ps.id),
    rs_morning: forCreate ? [] : singleChecklist?.response?.rs_morning.map(mrn => mrn.id),
    rs_lunch: forCreate ? [] : singleChecklist?.response?.rs_lunch.map(lun => lun.id),
    rs_afternoon: forCreate ? [] : singleChecklist?.response?.rs_afternoon.map(aft => aft.id),
    products_manufactured: forCreate ? [] : singleChecklist?.response?.skus.map(pm => pm.item_number),
    date: moment(singleChecklist?.response?.date)
  });


  const authStatus = useSelector(selectAuthStatus);
  const morningRef = useRef(null);
  const lunchRef = useRef(null);
  const afternoonRef = useRef(null);
  const psRef = useRef(null);
  const moRef = useRef(null);

  useEffect(() => {
    // let pin = localStorage.getItem('pin')
    let password = localStorage.getItem('password')
    if (!isUpdate) {

      if (password === null) {
        props.history.push({
          pathname: '/login'
        })
      }

    }
  }, []);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    getAllChecklis();
    getAllMachines();
    getAllSkus();
  }, []);

  const getAllChecklis = () => {
    dispatch(getAllChecklistApi());
  };
  const getAllMachines = () => {
    dispatch(getAllMachinesApi());
  };

  const getAllSkus = () => {
    //skus = stock keeping unit
    dispatch(getAllSkuApi());
  };


  const children = [];
  skus.forEach((item) => {
    children.push(<Option key={item.item_number}>{item.item_number}</Option>);
  });

  const userChildren = [];

  if (users) {
    users.forEach((item) => {
      userChildren.push(<Option key={item.id.toString()} value={item.id}>{item.name}</Option>);
    });
  }

  const onFinish = (values) => {
    let {
      checklist_id,
      machine_id,
      date,
      products_manufactured,
      machine_operators,
      packaging_staffs,
      rs_morning,
      rs_launch,
      rs_afternoon,
    } = values;
    let object = {
      checklist_id,
      machine_id,
      date: date.format('YYYY-MM-DD'),
      products_manufactured,
      machine_operators,
      packaging_staffs,
      status: 'draft',
      rs_morning,
      rs_launch,
      rs_afternoon,
    };
    console.log('onFinish called', object)
    if (authStatus || props?.location?.pathname === '/create') {
      handleSubmit(object);
    } else {
      setSubmitObject(object);
      setAuthModal(true);
    }
  };

  const handleSubmit = (submissionObject, authSuccessResponse, authCred) => {
    let authHeader = {
      userid: localStorage.getItem('userId'),
      pin: localStorage.getItem('pin'),
      password: localStorage.getItem('password')
    };

    if (authSuccessResponse) {
      //incase  user sends via login through auth modal
      authHeader = {
        userid: authSuccessResponse?.data?.id,
        pin: authCred?.pin,
        password: localStorage.getItem('password')

      };
    }
    setAuthModal(false);

    setSubmitting(true);
    let dataForSubmission = submissionObject;

    if (!submissionObject) {
      dataForSubmission = submitObject;
    }

    if (isUpdate) {
      dispatch(
        updateResponseApi(dataForSubmission, authHeader, (response) =>
          handleResponseSuccess(response), () => setSubmitting(false)
        ))
    } else {
      dispatch(
        createResponseApi(dataForSubmission, authHeader, (response) =>
          handleResponseSuccess(response), () => setSubmitting(false)
        )
      )
    };

  };

  const handleResponseSuccess = (response) => {
    if (!isUpdate) {
      localStorage.setItem('responseId', response?.data?.id);
      let baseEnc = btoa(response?.data?.id);
      props.history.push({
        pathname: `/checklist/${baseEnc}`,
        checklistId: response?.data?.checklist_id,
        //responseId: response?.data?.id,
      });
    }
  };


  return (
    <div className='overview-container'>
      <div className="back-container">
        <ArrowLeftOutlined style={{ fontSize: 22 }} onClick={() => props.history.goBack()} />
      </div>
      <div className={`form-wrapper ${!isUpdate ? 'form-wrapper--create' : ''}`} >
        {!isUpdate &&
          <>
            <InitialHeader history={props.history} title="Create Form" />
            <Divider />
          </>
        }
        <Form
          onFinish={onFinish}
          layout={'vertical'}
          //className='form'
          initialValues={{ remember: true }}
        >
          <Row>

            <Col span={24} className='gutter-row'>
              <Form.Item
                name='checklist_id'
                label='Checklists'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.checklist_id}
              >
                <Select placeholder='Please select' disabled={isUpdate ? true : false}>
                  {checklists?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id.toString()}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} className='gutter-row'>
              <Form.Item
                name='date'
                label='Date'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.date}

              >
                <DatePicker className='w-100' mode='date' format='DD/MM/YYYY' />
              </Form.Item>
            </Col>
            <Col span={16} className='gutter-row'>
              <Form.Item
                name='machine_id'
                label='Machine Name'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.machine_id}
              >
                <Select placeholder='Please select'>
                  {machines?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id.toString()}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className='gutter-row'>
              <Form.Item
                name='products_manufactured'
                label='Product Manufactured'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.products_manufactured}
              >
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  maxTagCount={5}
                  disabled={isUpdate ? true : false}
                  showArrow={true}
                  optionFilterProp="children"
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={23} className='gutter-row'>
              <Form.Item
                name='machine_operators'
                label='Machine Operator (MO)'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.machine_operators}
              >
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  ref={moRef}
                  showAction={["focus"]}
                  optionFilterProp="children"
                // searchValue="m"
                >
                  {users.map(item => {
                    if (item.user_role === 'MO') {
                      return (
                        <Option key={item.id.toString()} value={item.id}>{item.name}</Option>
                      )
                    }
                  })
                  }

                </Select>
              </Form.Item>
            </Col>
            <Col span={1} className="col-icon"> <PlusCircleOutlined onClick={() => {
              moRef.current.focus();
            }
            } /></Col>
          </Row>
          <Row>
            <Col span={23} className='gutter-row'>
              <Form.Item
                name='packaging_staffs'
                label='Packaging Staff (PS)'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.packaging_staffs}
              >
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  ref={psRef}
                  showAction={["focus"]}
                  optionFilterProp="children"
                >
                  {users.map(item => {
                    if (item.user_role === 'PS') {
                      return (
                        <Option key={item.id.toString()} value={item.id}>{item.name}</Option>
                      )
                    }
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={1} className="col-icon"> <PlusCircleOutlined onClick={() => {
              psRef.current.focus();
            }
            } /></Col>
          </Row>
          <h5 class="mt-3 mb-2">Relieving Staff:</h5>
          <Row>
            <Col span={23} className='gutter-row'>
              <Form.Item
                name='rs_morning'
                label='Morning'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.rs_morning}
              >
                <Select
                  placeholder='Please select'
                  mode='multiple'
                  allowClear
                  ref={morningRef}
                  showAction={["focus"]}
                  optionFilterProp="children"
                // open={true}
                >
                  {users?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id.toString()}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1} className="col-icon">
              <PlusCircleOutlined onClick={() => {
                morningRef.current.focus();
              }
              } />
            </Col>
          </Row>
          <Row>
            <Col span={23} className='gutter-row'>
              <Form.Item
                name='rs_launch'
                label='Lunch'
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={initialValue.rs_lunch}
              >
                <Select
                  placeholder='Please select'
                  mode='multiple'
                  allowClear
                  ref={lunchRef}
                  showAction={["focus"]}
                  optionFilterProp="children"
                >
                  {users?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id.toString()}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

            </Col>
            <Col span={1} className="col-icon">
              <PlusCircleOutlined onClick={() => {
                lunchRef.current.focus();
              }
              } />
            </Col>
          </Row>
          <Row>
            <Col span={23} className='gutter-row'>
              <Form.Item
                name='rs_afternoon'
                label='Afternoon'
                rules={[{ required: true, message: 'This field is required' },
                ]}
                initialValue={initialValue.rs_afternoon}
              >
                <Select
                  placeholder='Please select'
                  mode='multiple'
                  allowClear
                  ref={afternoonRef}
                  showAction={["focus"]}
                  optionFilterProp="children"
                >
                  {users?.map((item) => {
                    return (
                      <Option value={item.id} key={item.id.toString()} >
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>

              </Form.Item>
            </Col>
            <Col span={1} className="col-icon">
              <PlusCircleOutlined onClick={() => {
                afternoonRef.current.focus();
              }
              } />
            </Col>
          </Row>

          <Button
            type='primary'
            size='large'
            block
            className='mt-4'
            htmlType='submit'
          >
            {isUpdate ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </div >
      <AuthModal
        visible={showAuthModal}
        onCancel={() => setAuthModal(false)}
        onSuccess={(response, authCred) => {
          handleSubmit(null, response, authCred);
          setAuthModal(false);
        }}
        fromHeader={false}
        disableToast={true}
      />
    </div >
  );
};

export default Overview;
