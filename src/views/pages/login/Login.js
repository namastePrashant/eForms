import React from 'react'
import { authAPI } from '../../../services/auth'
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

import config from '../../../config';

const Login = (props) => {
  const dispatch = useDispatch();

  const handleSuccess = (response, authValue) => {
    localStorage.setItem('userId', response?.data?.id);
    localStorage.setItem('password', authValue?.password);
    // localStorage.setItem('pin', authValue?.pin);
    props.history.push({
      pathname: '/responses'
    })
  }


  const onFinish = (values) => {
    console.log('handle finish', values)
    dispatch(
      authAPI(values, (response) => handleSuccess(response, values), null, true)
    );
  }



  return (
    <div className="c-app c-default-layout flex-row align-items-center auth-container">
      {/* <Image
        width={200}
        src="http://staging.jaalx.com/altimate/assets/images/logo.png"
      /> */}
      {/* <AuthForm title="Login" buttonText='OK' onSuccess={handleSuccess} loginWithEmail={true} disableToast={true} /> */}


      <div className="row row--auth-form">
        <div className="col-md-4 pr-md-0">
          <div className="auth-left-wrapper" >
            <img src={require('../../../assets/images/login-image.jpg')} />

          </div>
        </div>
        <div className="col-md-8 pl-md-0">
          <div className="auth-form-wrapper ">
            <h2 className="noble-ui-logo d-block mb-2">Altimate eForms</h2>
            <h5 className="text-muted font-weight-normal mb-4">Welcome back! Log in to your account.</h5>

            <Form
              onFinish={onFinish}
              layout={'vertical'}
              //className='form'
              initialValues={{ remember: true }}
            >

              <Form.Item
                label="Email address"
                name="email"
                rules={[{ required: true, message: 'Please input your email address!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="mt-3"
              >
                <Input.Password />
              </Form.Item>

              <a href={config.forgotPasswordUrl} target="_blank" data-toggle="modal" className="forgot-pass-link">Forget Password
              </a>


              <div className="mt-4 bottom-buttons">
                <Button
                  size='large'
                  htmlType='submit'
                  type='primary'
                  htmlType='submit'
                >
                  Login
            </Button>
                <a href='https://staging.jaalx.com/altimate/' target="_blank">
                  Go to Admin Panel
                  </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
