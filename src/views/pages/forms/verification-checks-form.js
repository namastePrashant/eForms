import React from "react";
import { Form, Input, TimePicker, Button, Switch } from "antd";

import FormItemWrapper from "../../form-item-wrapper/form-item-wrapper";

export default function verificationCheckForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <Form onFinish={onFinish} layout={"horizontal"} form={form}>
        <FormItemWrapper id="Start Time" name={["verification", "start_time"]}>
          <TimePicker
            size="large"
            placeholder="Select a Time"
            format="HH:mm"
            use12Hours
          />
        </FormItemWrapper>


        <FormItemWrapper
          id="Batter Sieve (CCP & QCP)"
          name={["verification", "che"]}
          valuePropName="checked"
          initialValue={{ che: true }}

        >
          <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
        </FormItemWrapper>

        <FormItemWrapper
          name={["verification", "act"]}
          initialValue={"s"}
        >
          <Input size="large" />
        </FormItemWrapper>



        <FormItemWrapper
          id="Batter Tank / Pipes / Pump"
          name={["verification", "che1"]}
          valuePropName="checked"
          initialValue={{ che1: true }}

        >
          <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
        </FormItemWrapper>

        <FormItemWrapper
          name={["verification", "act1"]}
          initialValue={"ss"}
        >
          <Input size="large" />
        </FormItemWrapper>



        <FormItemWrapper
          id="Batter Hoses/Dosing Arms"
          name={["verification", "che2"]}
          valuePropName="checked"
          initialValue={{ che2: true }}

        >
          <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
        </FormItemWrapper>

        <FormItemWrapper
          name={["verification", "act2"]}
          initialValue={"ssact2"}

        >
          <Input size="large" />
        </FormItemWrapper>



        <FormItemWrapper
          id="Portable Batter Trolley"
          name={["verification", "che3"]}
          valuePropName="checked"
          initialValue={{ che3: true }}

        >
          <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
        </FormItemWrapper>

        <FormItemWrapper
          name={["verification", "act3"]}
          initialValue={"ss"}

        >
          <Input size="large" />
        </FormItemWrapper>


        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button size="large" htmlType="submit" type="primary" class="btn-primary">
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
