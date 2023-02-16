import React, { useState } from "react";
import { Card, Popover, Form, Input, TimePicker, Select, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function FormCard() {
  const [formValues, setFormValues] = useState([]);

  const renderForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log("Received values of form:", values);
    };

    return (
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          layout={"horizontal"}
          onValuesChange={(changedValues, allValues) => {
            setFormValues(allValues);
          }}
        >
          <Form.Item name="time">
            <TimePicker />
          </Form.Item>
          <Form.Item name="weight">
            <Input placeholder="weight" style={{ width: 150 }} />
          </Form.Item>
          <Form.Item name="checked_by">
            <Select placeholder="checked by" style={{ width: 150 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  const dynamicField = () => {
    return (
      <Form.List name={["test_card", "name"]}>
        {(fields, { add, remove }) => {
          return (
            <div className="d-flex flex-wrap">
              {fields.map((field, index) => (
                <Form.Item {...field}>
                  <Popover
                    key={field.key}
                    content={renderForm}
                    placement="bottom"
                    trigger="click"
                  >
                    <Card
                      className="mr-2"
                      hoverable
                      headStyle={{ border: "none" }}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <div className="mt-n5">
                        <div>Time:{Date.now(formValues.time) ?? "n/a"}</div>
                        <div>Weight: {formValues.weight ?? "n/a"}</div>
                        <div>Checked By:{formValues.checked_by ?? "n/a"}</div>
                      </div>
                    </Card>
                  </Popover>
                </Form.Item>
              ))}
              <Card
                style={{ width: 120, height: 120 }}
                className="d-flex align-items-center justify-content-center"
              >
                <div>
                  <PlusOutlined
                    style={{ fontSize: 25 }}
                    onClick={() => {
                      add();
                    }}
                  />
                </div>
              </Card>
            </div>
          );
        }}
      </Form.List>
    );
  };
  return dynamicField();
}
