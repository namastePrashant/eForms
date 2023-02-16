import React, { useState, useEffect } from 'react';
import {
  Select,
  Spin
} from 'antd';
import config from '../config';
import _ from 'lodash';
import { storeDynamicDropDowns } from '../store/reducer/form';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const DynamicDropdown = (props) => {
  const [] = useState();
  const [fetching, setFetching] = useState(false)
  const formReducer = useSelector(state => state.form);
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const dispatch = useDispatch();



  const handleDataChange = (val) => {
    setValue(val)
    props.onChange(val)
  }

  useEffect(() => {
  }, [props.defaultValue])

  const fetchUser = () => {
    let responseId = localStorage.getItem('responseId');
    setFetching(true);
    let url = `${props?.url}${_.includes(props.url, '?') ? '&' : '?'}response_id=${responseId}`
    let previouslyStored = formReducer.dynamicDropdowns[url]
    if (previouslyStored) {
      const data = previouslyStored.map(user => ({
        text: `${user.name}`,
        value: user.id,
      }));
      setData(data);
      setFetching(false);
      return;
    }

    fetch(`${config.baseURI}/${url}`)
      .then(response => response.json())
      .then(body => {
        // localStorage.setItem(`${props?.url}`, JSON.stringify(body.data))
        dispatch(storeDynamicDropDowns({ url: url, data: body?.data }))
        const data = body.data.map(user => ({
          text: `${user.name}`,
          value: user.id,
        }));
        setData(data);
        setFetching(false);
      })
      .catch(error => console.log('error', error.message));
  }
  // const fetchU = useMemo(() => fetchUser(), [props.url])

  let elseValue = props?.count > 1 ? [] : {}
  return (
    <Select
      mode={props.count > 1 ? "multiple" : undefined}
      value={props.defaultValue ?? elseValue}
      allowClear={true}
      placeholder={props.placeholder}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={props.count > 1 ? true : false}
      onFocus={fetchUser}
      onChange={handleDataChange}
      defaultActiveFirstOption={false}
      style={{ width: '100%' }}
      labelInValue
      optionFilterProp="children"
      defaultValue={props.defaultValue ?? ''}
    >
      {data.map(d => {
        return (
          <Option key={d.value} disabled={value?.length >= props.count
            ? _.findIndex(value, ['value', d.value.toString()]) !== -1
              ? false
              : true
            : false}>{d.text}</Option>
        )
      })}
    </Select>
  )
}

export default React.memo(DynamicDropdown);