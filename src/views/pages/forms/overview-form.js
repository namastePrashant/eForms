import React from "react";
import { Form, Input, Select, DatePicker, Button, Radio } from "antd";

import FormItemWrapper from "../../form-item-wrapper/form-item-wrapper";
import DynamicFormItemWrapper from "../../form-item-wrapper/dynamic-form-item-wrapper";

const { Option } = Select;

export default function OverviewForm() {
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
        <FormItemWrapper id="Date" name={["overview", "date"]}>
          <DatePicker
            className="w-100"
            size="large"
            placeholder="Select a Date"
          />
        </FormItemWrapper>

        <FormItemWrapper
          id="Product Manufactured"
          name={["overview", "product_manufactured"]}
        >
          <Select size="large" placeholder="Select Product SKU">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </FormItemWrapper>

        <DynamicFormItemWrapper
          id="Machine Operators"
          name={["overview", "operators"]}
        >
          <Select size="large" placeholder="Operator" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </DynamicFormItemWrapper>

        <DynamicFormItemWrapper
          id="Packaging Staff"
          name={["overview", "staff"]}
        >
          <Radio >
            optn 1
           

         </Radio>

        </DynamicFormItemWrapper>

        <DynamicFormItemWrapper
          id="Packaging Staff"
          name={["overview", "staff"]}
        >
          <Select size="large" placeholder="Staff" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </DynamicFormItemWrapper>

        <FormItemWrapper id="Machine Name" name={["overview", "machine_name"]}>
          <Input size="large" placeholder="Select Machine" />
        </FormItemWrapper>

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

