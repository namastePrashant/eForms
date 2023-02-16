import React from "react";
import { Form, Input, Select, Button, InputNumber, TimePicker } from "antd";

import FormItemWrapper from "../../form-item-wrapper/form-item-wrapper";
import DynamicFormItemWrapper from "../../form-item-wrapper/dynamic-form-item-wrapper";

const { TextArea } = Input;
const { Option } = Select;

export default function FoodServiceProductsOnlyForm() {
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
          id="Description on Carton"
          name={["packaging", "description_on_carton"]}
        >
          <TextArea />
        </FormItemWrapper>
        <FormItemWrapper
          id="Quantity on Carton"
          name={["packaging", "quantity_on_carton"]}
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

        <FormItemWrapper
          id="Oven Temperature"
          name={["packaging", "temperature"]}
        >
          <InputNumber size="large" style={{ width: 150 }} />
        </FormItemWrapper>
        <FormItemWrapper id="Oven Speed" name={["packaging", "speed"]}>
          <InputNumber size="large" style={{ width: 150 }} />
        </FormItemWrapper>

        <FormItemWrapper id="Sensory" name={["overview", "sensory"]}>
          <Select size="large" style={{ width: 150 }}>
            <Option value="aroma">Aroma</Option>
            <Option value="texture">Texture</Option>
            <Option value="flavour">Flavour</Option>
          </Select>
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
