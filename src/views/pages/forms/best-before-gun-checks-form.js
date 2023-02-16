import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "antd";

import FormElement from "../../dynamic-form/dynamic-form";
import { updateForm, selectForm } from "../../../store/reducer/form";

export default function BestBeforeGunChecksForm() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const formValues = useSelector(selectForm);

  useEffect(() => {
    Object.keys(formValues).forEach((key) =>
      form.setFieldsValue({
        [key]: formValues[key],
      })
    );
  }, [form, formValues]);

  const components = [
    {
      component: "input",
      label: "First Name",
      required: true,
    },
    {
      component: "input",
      label: "Last Name",
      required: true,
    },
    {
      component: "input",
      label: "email",
      required: true,
    },
    {
      component: "time",
      label: "Time",
      hasMultiple: true,
    },
    {
      component: "image",
      label: "Stamps",
      required: false,
    },
    {
      component: "card",
      label: "Test Card",
      required: false,
    },
  ];
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <div className="px-3">
      <Form
        form={form}
        onFinish={onFinish}
        layout={"horizontal"}
        onFieldsChange={(changedFields, allFields) => {
          //
        }}
        onValuesChange={(changedValues, allValues) => {
          dispatch(updateForm(allValues));
        }}
      >
        {components.map((component, index) => (
          <FormElement {...component} key={index} index={index} />
        ))}
        <div className="d-flex justify-content-center mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
