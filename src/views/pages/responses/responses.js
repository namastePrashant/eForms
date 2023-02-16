import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { getAllResponsesApi } from '../../../services/response';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllResponses } from '../../../store/reducer/response';
import InitialHeaders from '../../../reusable/initialHeader';
import config from '../../../config';


const Responses = (props) => {
  const dispatch = useDispatch();
  const [fetch, setFetch] = useState(true);
  const responses = useSelector(selectAllResponses);
  const responseRed = useSelector(state => state.response);
  const columns = [
    {
      title: 'Checklist(Responses)',
      dataIndex: 'checklist',
      key: 'checklist',
      fixed: 'left',
      render: (checklist) => (
        <div className="checklist-title">
          <h5>{checklist?.name}</h5>
          <span>{checklist?.production_line?.name}</span>
        </div>
      )
      ,
    },
    {
      title: 'Machine',
      dataIndex: 'machine',
      key: 'machine',
      render: (machine) => (
        <Space size="middle">

          {machine?.name}
        </Space>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Updated at',
      key: 'tags',
      dataIndex: 'updated_at',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',

      render: (status) => (
        <>
          <Tag className={`btn--${status}`}>
            {status}
          </Tag>
        </>
      )
    },
    {
      title: 'Supervisor',
      key: 'supervisor',
      dataIndex: 'supervisior_user',
      render: (supervisior_user) => (
        <>
          <Space size="middle">
            {supervisior_user?.name}
          </Space>
        </>
      )
    },
    {
      title: 'Final Inspector',
      key: 'final_inspector',
      dataIndex: 'final_inspector_user',
      render: (final_inspector_user) => (
        <>
          <Space size="middle">
            {final_inspector_user?.name}
          </Space>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'status',
      fixed: 'right',
      width: '7%',
      render: (text, data) => {
        let baseEnc = btoa(data?.id);
        return (
          <Space size="middle">
            {data.status === 'draft' ?
              <Button size="small"
                type="secondary"
                shape="round"
                className="btn--edit"
                onClick={() => {
                  localStorage.setItem('responseId', data.id);
                  props.history.push({
                    pathname: `/checklist/${baseEnc}`
                  })
                }}>

                Edit
          </Button>
              :
              <Button size="small"
                type="secondary"
                shape="round"
                className="btn--view"
                onClick={() => {
                  window.open('https://staging.jaalx.com/altimate/response/' + data?.id, '_blank');
                }}>

                View
          </Button>
            }
          </Space>
        )
      },
    },
  ];

  useEffect(() => {
    let password = localStorage.getItem('password');
    if (!password) {
      props.history.push({
        pathname: '/login'
      })
    }
  }, [])

  useEffect(() => {
    getAllResponses(1)
  }, []);

  const getAllResponses = (page) => {
    let authHeader = {
      userId: localStorage.getItem('userId'),
      password: localStorage.getItem('password')
    }
    // if (authHeader.pin === null) {
    //   props.history.push({
    //     pathname: '/login'
    //   })
    // }
    dispatch(getAllResponsesApi(page, authHeader, () => setFetch(false)))
  }

  const handleTableChange = (e) => {
    setFetch(true)
    getAllResponses(e.current)
  }



  return (
    <div className="responses-container">
      <InitialHeaders showCreateButton={true} title="Active Forms" history={props.history} />

      <div className="table-wrapper">
        <Table
          columns={columns}
          dataSource={responses}
          onChange={handleTableChange}
          className="table-active-forms"
          pagination={{
            total: responseRed.total,
            pageSize: responseRed.perPage,
            showSizeChanger: false
            // currentPage: responseRed.currentPage
          }}
          loading={fetch}
          scroll={{ x: 1500 }}
          sticky
        />
      </div>
      <div className="footer">
        <a href={`${config.backendUrl}reports/daily`} target="_blank" ><span >Completed Forms</span></a>  |
        <a href={`${config.backendUrl}`} target="_blank" ><span >   Admin Panel</span></a>
      </div>
    </div >
  )
}

export default Responses;