import React from "react";
import { Form, Input, Button, InputNumber, DatePicker, Select, Badge, Radio, Switch, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormItemWrapper from "../../form-item-wrapper/form-item-wrapper";

const { TextArea } = Input;
const { Option } = Select;
export default function PackagingChecks() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <div className="form-title">
        <h2>  Product Daily Check List</h2>
      </div>

      <Form
        onFinish={onFinish}
        layout={"vertical"}
        className="form--checklist"
        form={form}
      >
        <div className="row">
          <div className="col-md-4">
            <Form.Item label="Product Manufactured" className="dot-status">
              <DatePicker className="w-100" />
            </Form.Item>
          </div>
          <div className="col-md-8">
            <Form.Item label="Machine Name">
              <Badge status="success" className="mr-1" />

              <Select defaultValue="lucy" className="w-100">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            <Form.Item label="Machine Operator">
              <Select defaultValue="lucy" className="w-100" >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row row--input-inline">
          <div className="col-md-12">
            <Form.Item label="Packing Staff (PS)">
              <Select defaultValue="lucy" style={{ width: 130 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select defaultValue="lucy" style={{ width: 130 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
            <Button type="link" className="ant-btn-link--add-item">
              <PlusOutlined /> Add More
            </Button>
          </div>
        </div>
        <div className="row row--input-inline">
          <div className="col-md-12">
            <Form.Item label="Relieving Staff(Morning)">
              <Select defaultValue="lucy" style={{ width: 130 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select defaultValue="lucy" style={{ width: 130 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                  </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
            <Button type="link" className="ant-btn-link--add-item">
              <PlusOutlined /> Add More
            </Button>
          </div>
        </div>
      </Form>

      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}

      <div className="form-section-title"><h3>Cleanliness/Condition/Verification Checks</h3></div>

      <Form
        onFinish={onFinish}
        layout={"vertical"}
        className="form--checklist"
        form={form}
      >
        <div className="row row--horizontal">
          <div className="col-md-6">
            <Form.Item label="Shift Start Time">
              <TimePicker className="w-100" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Shift End Time">
              <TimePicker className="w-100" />
            </Form.Item>
          </div>
        </div>


        <div className="row row--input-horizontal">
          <div className="col-12">
            <h4 className="form-subheader">Better Sieve(CCP & OCP)</h4>
          </div>
          <div className="col-md-12">
            <Form.Item label="Pass/Fail" className="switch-vetical">
              <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
            </Form.Item>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Checked By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Cleaned By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

          </div>
        </div>

        <div className="row row--input-horizontal">
          <div className="col-12">
            <h4 className="form-subheader">Batter Tank / Pipes / Pump</h4>
          </div>
          <div className="col-md-12">
            <Form.Item label="Pass/Fail" className="switch-vetical">
              <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
            </Form.Item>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Checked By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Cleaned By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

          </div>
        </div>

        <div className="row row--input-horizontal">
          <div className="col-12">
            <h4 className="form-subheader">Batter Hoses/Dosing Arms</h4>
          </div>
          <div className="col-md-12">
            <Form.Item label="Pass/Fail" className="switch-vetical">
              <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
            </Form.Item>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Checked By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Cleaned By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

          </div>
        </div>

        <div className="row row--input-horizontal">
          <div className="col-12">
            <h4 className="form-subheader">Portable Batter Trolley</h4>
          </div>
          <div className="col-md-12">
            <Form.Item label="Pass/Fail" className="switch-vetical">
              <Switch checkedChildren="Pass" unCheckedChildren="Failed" />
            </Form.Item>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Checked By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

            <div className="row row--input-inline">
              <div className="col-md-12">
                <Form.Item label="Cleaned By (Initials)">
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select defaultValue="lucy" style={{ width: 130 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                  </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Button type="link" className="ant-btn-link--add-item">
                  <PlusOutlined /> Add More
            </Button>
              </div>
            </div>

          </div>
        </div>

      </Form>
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}

      <div className="form-section-title"><h3>Packaging Checks</h3></div>

      <Form
        onFinish={onFinish}
        layout={"horizontal"}
        className="form--checklist"
        form={form}
      >


        <div className="row">
          <div className="col-md-12">
            <Form.Item label="Inner Product Description">
              <TextArea />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Form.Item label="Outer Product Description">
              <TextArea />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Tray (Order Number)">
              <InputNumber className="w-100" size="large" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Rewind (Batch No)">
              <InputNumber className="w-100" size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Form.Item label="Inner (Order Number)">
              <InputNumber className="w-100" size="large" />
            </Form.Item>
          </div>
        </div>

      </Form>
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}
      {/* ------------------------ */}

      <div className="form-section-title"><h3>Cleanliness/Condition/Verification Checks</h3></div>

      <Form
        onFinish={onFinish}
        layout={"horizontal"}
        className="form--checklist"
        form={form}
      >


        <div className="row">
          <div className="col-md-12">
            <Form.Item label="Radio 1">
              <Radio.Group>
                <Radio value={1}>Value 1</Radio>
                <Radio value={2}>Value 2</Radio>
                <Radio value={3}>Value 3</Radio>
                <Radio value={4}>Value 4</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="TimePicker 1" >
              <TimePicker className="w-100" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="TimePicker 2" >
              <TimePicker className="w-100" />
            </Form.Item>
          </div>

        </div>

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
