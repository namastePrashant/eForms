import React from "react";
import {
  Input,
  Form,
  Checkbox,
  TimePicker,
  Button,
  Badge,
  Row,
  Radio,
  InputNumber,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ImagesUpload from "../images-upload/images-upload.js";
import FormCard from "../form-card/form-card";

const componentMapping = {
  text: Input,
  number: InputNumber,
  dropdown: Select,
  password: Input.Password,
  checkbox: Checkbox,
  time: TimePicker,
  radio: Radio.Group,
  image: ImagesUpload,
  card: FormCard,
};
export default function FormElement({
  component,
  label,
  index,
  required,
  labelColSize,
  itemColSize,
  name,
  hasMultiple,
  ...props
}) {
  const Component = componentMapping[component];
  const { id, config, options } = props;

  const field = config?.fields?.map((field) => {
    const Component = componentMapping[field.type];
    return (
      <>
        <Form.Item
          name={`${field.label.toLowerCase()}${id}`}
          rules={[{ required, message: "Field is required!" }]}
        >
          <Component
            size="large"
            placeholder={field.label}
            count={field.count}
          />
        </Form.Item>
      </>
    );
  });

  const singleField = () => {
    return (
      <div className="col-md-12">
        <Form.Item
          name={`${label.toLowerCase().replace(/ /g, "_")}${id}`}
          rules={[{ required, message: "Field is required!" }]}
        >
          <Component size="large" options={options} />
        </Form.Item>
        {config?.fields?.length && field}
      </div>
    );
  };

  const dynamicField = () => {
    return (
      <div className={`col-md-${labelColSize ?? 8}`}>
        <Form.List name={label}>
          {(fields, { add, remove }) => {
            return (
              <div className="d-flex flex-wrap">
                <Form.Item
                  className="mr-2"
                  name={[label.toLowerCase().replace(/ /g, "_"), 0]}
                >
                  <Component size="large" style={{ width: 120 }} />
                </Form.Item>
                {fields.map((field, index) => (
                  <Form.Item key={field.key + 1}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      <Component size="large" style={{ width: 120 }} />
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
    );
  };
  return (
    <Row
      className={`d-flex align-items-center  p-3  ${
        index % 2 === 0 ? "stripe-even" : "stripe-odd"
      }`}
    >
      {label && (
        <div className={`col-md-${labelColSize ?? 4}`}>
          <Badge status="success" className="mr-1" />
          {label}
        </div>
      )}
      {hasMultiple ? dynamicField() : singleField()}
    </Row>
  );
}
