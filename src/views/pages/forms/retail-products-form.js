import React from "react";
import { Form, Input, Button, InputNumber, TimePicker } from "antd";

import FormItemWrapper from "../../form-item-wrapper/form-item-wrapper";
import DynamicFormItemWrapper from "../../form-item-wrapper/dynamic-form-item-wrapper";

const { TextArea } = Input;

export default function RetailProductsOnlyForm() {
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
        <FormItemWrapper
          id="Description on Packet"
          name={["packaging", "description_on_packet"]}
        >
          <TextArea />
        </FormItemWrapper>
        <FormItemWrapper
          id="Quantity on Packet"
          name={["packaging", "quantity_on_packet"]}
        >
          <InputNumber size="large" style={{ width: 150 }} />
        </FormItemWrapper>
        <FormItemWrapper
          id="Net Weight on Packet"
          name={["packaging", "net_weight"]}
        >
          <InputNumber size="large" style={{ width: 150 }} />
        </FormItemWrapper>

        <DynamicFormItemWrapper
          id="Time Of Weight Check"
          name={["data", "time"]}
        >
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
