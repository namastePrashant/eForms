import React from "react";
import { Form, Input, Button, InputNumber, TimePicker } from "antd";

import DynamicFormItemWrapper from "../../form-item-wrapper/dynamic-form-item-wrapper";

export default function ScaleCalibrationChecks() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout={"horizontal"}
        className="no-colon"
        form={form}
      >
        <DynamicFormItemWrapper
          id="Scale Number"
          name={["data", "scale_number"]}
        >
          <InputNumber size="large" style={{ width: 150 }} />
        </DynamicFormItemWrapper>

        <DynamicFormItemWrapper id="Test Mass 1kg" name={["data", "test_mass"]}>
          <InputNumber size="large" style={{ width: 150 }} />
        </DynamicFormItemWrapper>

        <DynamicFormItemWrapper id="Time" name={["data", "time"]}>
          <TimePicker
            format="HH:mm"
            use12Hours
            size="large"
            style={{ width: 150 }}
          />
        </DynamicFormItemWrapper>

        <DynamicFormItemWrapper
          id="Checked By (Name)"
          name={["data", "checked_by"]}
        >
          <Input size="large" style={{ width: 200 }} />
        </DynamicFormItemWrapper>

        <Form.Item>
          <div className="d-flex justify-content-end">
            <Button size="large" htmlType="submit" type="primary">
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
