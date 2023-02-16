import React from "react";
import {
  Input,
  Form,
  Checkbox,
  TimePicker,
  Radio,
  InputNumber,
  Select,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import ImagesUpload from "../images-upload/images-upload.js";

const componentMapping = {
  text: Input,
  number: InputNumber,
  dropdown: Select,
  password: Input.Password,
  checkbox: Checkbox,
  time: TimePicker,
  radio: Radio.Group,
  image: ImagesUpload,
  card: Input,
};
export default function FormElement({
  component,
  label,
  index,
  required,
  name,
  key,
  ...props
}) {
  const Component = componentMapping[component];
  const { id, config, options } = props;

  const field = config?.fields?.map((item) => {
    const Component = componentMapping[item.type];
    return (
      <>
        <div className="row row--input-inline">
          <Form.List name={`${item.label.toLowerCase()}${id}`}>
            {(fields, { add, remove }) => {
              return (
                <div className="col-md-12">
                  {fields.map((field, index) => (
                    <Form.Item key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <Component placeholder={item.label} size="large" />
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

                  {fields.length < item.count && (
                    <Button
                      type="link"
                      className="ant-btn-link--add-item"
                      onClick={() => {
                        add();
                      }}
                    >
                      <PlusOutlined /> Add More
                    </Button>
                  )}
                </div>
              );
            }}
          </Form.List>
        </div>
      </>
    );
  });

  return (
    <>
      <div key={`${id}${Date.now()}`} className="row">
        <div className="col-md-12">
          <Form.Item
            label={label}
            name={`${label.toLowerCase().replace(/ /g, "_")}${id}`}
          >
            {component === "radio" && (
              <Component size="large" options={options} />
            )}
            {component === "dropdown" && (
              <Component size="large">
                {options.map((option) => (
                  <Component.Option key={option}>{option}</Component.Option>
                ))}
              </Component>
            )}
            {component !== "radio" && component !== "dropdown" && (
              <Component size="large"></Component>
            )}
          </Form.Item>
        </div>
      </div>
      {config?.fields?.length && field}
    </>
  );
}
