import React from "react";
import { Input, Modal, Select } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Phone, HandshakeIcon } from "lucide-react";

import "./dialog-box.css";
import { businessSelectors } from "@/application/reducers/business-reducer";
import { useSelector } from "react-redux";

const CommonModal = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  value,
  component,
}) => {
  const { data: getBusinessData } = useSelector(
    businessSelectors.getBusinesses
  );

  const renderComponent = () => {
    //   {Array.isArray(businesses) && businesses.map(business => (
    //     <option key={business._id.$oid} value={business._id.$oid}>{business.name}</option>
    // ))}
    const businessOptions =
      getBusinessData?.length &&
      getBusinessData?.map((item) => ({
        label: item.name,
        value: item._id.$oid,
      }));

    console.log(businessOptions, "businesses");
    switch (component) {
      case "member":
        return (
          <>
            <Input
              name="name"
              id="name"
              size="large"
              value={value.name}
              placeholder="Enter Name"
              prefix={<UserOutlined />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Input
              name="email"
              id="email"
              type="email"
              size="large"
              value={value.email}
              placeholder="Enter Email"
              prefix={<MailOutlined />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />

            <Input
              name="business"
              id="business"
              size="large"
              value={value.business}
              placeholder="Enter Business"
              prefix={<HandshakeIcon size={18} />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Select a Role"
              onChange={(e) => onChange(e, "role")}
              value={value.role}
              allowClear
              options={[
                {
                  value: "user",
                  label: "User",
                },
                {
                  value: "admin",
                  label: "Admin",
                },
              ]}
            />
            <br />
            <br />
          </>
        );
      case "customer":
        return (
          <>
            <Input
              name="name"
              id="name"
              size="large"
              value={value.name}
              placeholder="Enter Name"
              prefix={<UserOutlined />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Input
              name="email"
              id="email"
              type="email"
              size="large"
              value={value.email}
              placeholder="Enter Email"
              prefix={<MailOutlined />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Input
              name="phone"
              id="phone"
              size="large"
              value={value.phone}
              placeholder="Enter Phone"
              prefix={<Phone size={18} />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Select a business"
              onChange={(e) => onChange(e, "business")}
              value={value.business_ids}
              allowClear
              options={businessOptions}
            />
            <br />
            <br />
          </>
        );
      case "business":
        return (
          <>
            <Input
              name="name"
              id="name"
              size="large"
              value={value.name}
              placeholder="Enter Name"
              prefix={<UserOutlined />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Input
              name="business_type"
              id="business_type"
              type="text"
              size="large"
              value={value.business_type}
              placeholder="Enter Business Type"
              prefix={<HandshakeIcon size={18} />}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <Input
              name="domain_url"
              id="domain_url"
              type="text"
              size="large"
              value={value.domain_url}
              onChange={(e) => onChange(e)}
              placeholder="domain URL"
              addonBefore="growday.com/"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onSubmit}
      okText="Submit"
      onCancel={onClose}
      width={300}
    >
      {renderComponent()}
    </Modal>
  );
};

export default CommonModal;
