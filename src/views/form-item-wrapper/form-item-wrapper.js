import React from "react";
import { Form } from "antd";

export default function FormItemWrapper(props) {
  const { id, children, form, labelColSize, itemColSize, ...params } = props;
  return (
    <div className="d-flex align-items-center row">
      {id && <div className={`col-md-${labelColSize ?? 4}`}>{id}</div>}
      <div className={`col-md-${itemColSize ?? 8}`}>
        {(children && <Form.Item {...params}>{children}</Form.Item>) ?? "Item"}
      </div>
    </div>
  );
}
