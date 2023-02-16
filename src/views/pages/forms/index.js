import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Alert, Empty, Modal } from "antd";
import { useHistory } from "react-router-dom";

import { updateForm, selectForm } from "../../../store/reducer/form";
import FormElement from "../../dynamic-form/form-elements";
import AuthForm from "./auth-form";
import notification from "../../../reusable/notification";

export default function FormContainer({ data }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const formValues = useSelector(selectForm);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authPayload = JSON.parse(localStorage.getItem("auth"));

  const onModalCancel = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    Object.keys(formValues).forEach((key) =>
      form.setFieldsValue({
        [key]: formValues[key],
      })
    );
  }, [form, formValues]);

  const handleAuth = (values) => {
    if (
      authPayload?.email === values.email &&
      authPayload?.pin === values.pin
    ) {
      form.validateFields().then((values) => {
        console.log(values);
      });
      setIsModalOpen(false);
      return;
    }
    if (authPayload === null) {
      history.push("/unlock");
      notification.info({ message: "Please unlock your account." });
      return;
    }
    notification.error({ message: "Pin mismatch!!!Please enter valid pin." });
  };

  const sectionItems = () => {
    const components = data.items.map((item) => {
      return {
        id: item.id,
        label: item.question,
        component: item.type,
        config: item.config,
        options: item.options,
      };
    });
    return components.map((component, index) => (
      <FormElement {...component} key={component.id} index={index} />
    ));
  };
  const subSectionItems = () => {
    return data.sub_sections.map((section) => {
      const components = section.items.map((item) => {
        return {
          id: item.id,
          label: item.question,
          component: item.type,
          name: section.name,
          config: item.config,
          options: item.options,
        };
      });

      return (
        <div key={`${section.id}${Date.now()}`}>
          <div className="form-section-title">
            <h3 className="mt-3 mb-n3"> {section.name}</h3>
          </div>
          {components.map((component, index) => (
            <FormElement {...component} index={index} />
          ))}
        </div>
      );
    });
  };

  return (
    <div className="px-3">
      <Alert
        message={data.remarks}
        banner
        closable
        type="info"
        showIcon
        className="mb-4 bg-white"
      />
      <Form
        form={form}
        layout={"vertical"}
        className="form--checklist"
        onFieldsChange={(changedFields, allFields) => {
          //
        }}
        onValuesChange={(changedValues, allValues) => {
          dispatch(updateForm(allValues));
        }}
      >
        {data.items.length > 0 && sectionItems()}
        {data.sub_sections.length > 0 && subSectionItems()}
        {!data.items.length && !data.sub_sections.length && <Empty />}
        {(data.items.length > 0 || data.sub_sections.length > 0) && (
          <Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" size="large" onClick={onModalOpen}>
                Update
              </Button>
              <Modal
                visible={isModalOpen}
                destroyOnClose
                keyboard
                footer={null}
                onCancel={onModalCancel}
              >
                <div className="mt-5">
                  <AuthForm
                    title="Update As"
                    handleSubmit={handleAuth}
                    buttonText="OK"
                  />
                </div>
              </Modal>
            </div>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}
