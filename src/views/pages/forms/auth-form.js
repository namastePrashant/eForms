import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { fetchUsers, selectUsers } from '../../../store/reducer/users';
import { authAPI } from '../../../services/auth';

const { Option } = Select;

export default function AuthForm({
  title,
  buttonText,
  onSuccess,
  storeInRedux,
  loginWithEmail,
  disableToast
}) {
  const users = useSelector(selectUsers);

  const userStatus = useSelector((state) => state.users.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  const handleSubmit = (values) => {
    dispatch(
      authAPI(values, (response) => handleSuccess(response, values), storeInRedux, disableToast ?? false)
    );
  };

  const handleSuccess = (response, authValue) => {
    onSuccess(response, authValue);
  };

  return (
    <div className='auth-form-wrapper'>
      <div className='auth-form-wrapper__header'>
        <h2 className=''>{title}</h2>
        <h6 className=''>{loginWithEmail ? 'Enter Email' : 'Select User'} and Pin to {loginWithEmail ? 'login' : 'unlock'}</h6>
      </div>
      <Form
        name='auth-form'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please select Username!' }]}
        >
          {loginWithEmail ?
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              type='email'
              placeholder='Email'
              size='large'
            />
            :
            <Select
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Select User'
              size='large'
            >
              {users?.map((user) => (
                <Option key={user.email} value={user.email}>
                  {user.name}
                </Option>
              ))}
            </Select>
          }
        </Form.Item>

        <Form.Item
          name='pin'
          rules={[
            { required: true, message: 'Please input your Pin!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Pin'
            size='large'
            type="number"
          />
        </Form.Item>
        <div className='mt-3 d-flex justify-content-center'>
          <Button htmlType='submit' type='primary' size='large'>
            {buttonText ?? 'Unlock'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
