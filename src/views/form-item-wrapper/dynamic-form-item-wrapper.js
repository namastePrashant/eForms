import React from "react";
import { Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function DynamicFormItemWrapper(props) {
  const { id, children, form, ...params } = props;
  return (
    <div className="d-flex flex-wrap align-items-center row">
      <div className="col-md-4">{(id && id) ?? "Label"}</div>
      <div className="col-md-8">
        <Form.List name={id}>
          {(fields, { add, remove }) => {
            return (
              <div className="d-flex flex-wrap">
                <Form.Item className="mr-2" {...params}>
                  {children}
                </Form.Item>
                {fields.map((field, index) => (
                  <Form.Item key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      {children}
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusOutlined /> Add More
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
    </div>
  );
}
