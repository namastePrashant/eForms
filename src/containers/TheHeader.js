import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CHeaderNav } from '@coreui/react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import config from '../config';
import notification from '../reusable/notification';
import { set, selectSidebarShow } from '../store/reducer/sidebar';
import { logout, selectAuthStatus, data } from '../store/reducer/auth';
import AuthModal from '../reusable/authModal';
import { Popconfirm, Tooltip } from 'antd';

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(selectSidebarShow);
  const isAuthenticated = useSelector(selectAuthStatus);
  const userData = useSelector(data);
  const [showAuthModal, setAuthModal] = useState(false);



  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow)
      ? false
      : 'responsive';
    dispatch(set(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow)
      ? true
      : 'responsive';
    dispatch(set(val));
  };

  const handleLock = () => {
    dispatch(logout());
    localStorage.removeItem('pin');
    localStorage.removeItem('password');
    localStorage.removeItem('userId');
    notification.warn({
      message: 'This account has been locked.',
    });
  };

  // console.log('props check', props);

  // const handleSubmit = () => {
  //   props.handleSubmissionFromHeader();
  //   dispatch(removeHasError());
  // }

  let sectionName = props?.section?.name;
  if (props?.activeSection == 9999) {
    sectionName = 'Overview'
  } else if (props?.activeSection == 999) {
    sectionName = 'Final Inspection'
  }

  return (
    <CHeader className='d-flex justify-content-between'>
      <div className='header-left-content'>
        <div className='d-flex'>
          <CToggler
            inHeader
            className='ml-md-3 d-lg-none'
            onClick={toggleSidebarMobile}
          />
          <CToggler
            inHeader
            className='d-md-down-none'
            onClick={toggleSidebar}
          />

          <CHeaderNav>
            <h5 className='text-brand'> {sectionName}</h5>
          </CHeaderNav>
        </div>
      </div>

      <CHeaderNav className='px-3'>
        <div className="footer-bottom-content">
          <div className="active-forms active-forms--right">
            <a onClick={() => props.history.push('/responses')}>Active Forms</a>
          </div>
          <div className="active-forms active-forms--right">
            <a href={config.backendUrl} target="_blank" >Admin Panel</a>
          </div>
        </div>
        {/* <Button
          size='small'
          htmlType='submit'
          type='primary'
          shape='round'
          onClick={() => handleSubmit()}
        >

          Save All
        </Button> */}
        {/* <UserOutlined
          className='mx-3'
          style={{
            fontSize: '18px',
            color: `${isAuthenticated ? 'green' : ''}`,
          }}
        /> */}
        <div className="userstatus">
          {!isAuthenticated && (
            <Tooltip title="test title">
              <LockOutlined
                className=''
                style={{ fontSize: '18px' }}
                onClick={() => setAuthModal(!showAuthModal)}
              />
            </Tooltip>
          )}
          {isAuthenticated && (
            <Popconfirm
              title='Are you sure you want to lock?'
              onConfirm={() => handleLock()}
              //onCancel={cancel}
              okText='Yes'
              cancelText='No'
              className="pop-confirm"
              placement="bottomRight"
            >
              <UnlockOutlined className="mr-1" style={{ fontSize: '18px' }} />
            </Popconfirm>
          )}
          {userData?.name}
        </div>

      </CHeaderNav>
      <AuthModal
        visible={showAuthModal}
        onCancel={() => setAuthModal(false)}
        onSuccess={() => setAuthModal(false)}
        storeInRedux
      />
    </CHeader>
  );
};

export default TheHeader;
