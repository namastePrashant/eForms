import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import AuthForm from '../views/pages/forms/auth-form';

const AuthModal = (props) => {
  const [showAuthModal, setAuthModal] = useState(props.visible);

  useEffect(() => {
    setAuthModal(props.visible);
  }, [props.visible]);

  const closeModal = () => {
    props.onCancel();
    setAuthModal(false);
  };


  return (
    <Modal
      visible={showAuthModal}
      // centered
      destroyOnClose
      keyboard
      footer={null}
      onCancel={closeModal}
    >
      <div className='mt-3'>
        <AuthForm
          title='Update As'
          //handleSubmit={handleAuth}
          buttonText='OK'
          onSuccess={props.onSuccess}
          storeInRedux={props.storeInRedux}
          disableToast={props.disableToast}
        />


      </div>
    </Modal>
  );
};

export default AuthModal;
