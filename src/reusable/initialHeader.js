import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const InitialHeaders = (props) => {

  const handleLogout = () => {
    localStorage.clear();
    props.history.push({
      pathname: '/login'
    })
  }
  return (
    <div>
      <div className="initial-header">
        <img
          width={200}
          src={require('../assets/images/logo.png')}
          alt="Altimate logo"
        />
        <Button type="dashed" className="btn-dashed-small" shape="round" size="small" onClick={() => handleLogout()}>LogOut</Button>
      </div>
      <div className="header">
        <h2>{props?.title}</h2>
        {props?.showCreateButton &&
          <Button size="large"
            type="primary"
            shape="round"
            onClick={() => props.history.push({
              pathname: '/create',
              state: { purpose: 'create' }
            })}>
            <PlusOutlined />Create New
    </Button>
        }
      </div>
    </div>
  )
}

export default InitialHeaders;