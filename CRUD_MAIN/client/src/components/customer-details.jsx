import React, { useEffect, useState } from "react";
import { Typography, Table, Input, Button, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import * as api from "../services/api";
import data from "./data";

import "./customer-details.styles.css";

const { Title } = Typography;

const CustomerDetails = () => {
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [details, setDetails] = useState(data);
  const [editingId, setEditingId] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    api.fetchCustomerDetails().then((result) => setDetails(result.data.data));
  }, []);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleNewCityChange = (e) => {
    setNewCity(e.target.value);
  };

  const handleNewPincodeChange = (e) => {
    setNewPincode(e.target.value);
  };

  const handleNewCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleAddTask = () => {
    const newTaskObj = {
      key: Date.now(),
      name: newName,
      address: newAddress,
      city: newCity,
      pincode: newPincode,
      country: newCountry,
      editable: true,
    };

    console.log(newTaskObj);
    api.postNewCustomerDetail(newTaskObj);

    setDetails([...details, newTaskObj]);
    setNewName("");
    setNewAddress("");
    setNewCity("");
    setNewPincode("");
    setNewCountry("");
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDelete = (id) => {
    const filteredDetails = details.filter((task) => task._id !== id);
    api.deleteCustomerDetail(id);
    setDetails(filteredDetails);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
  };

  const handleSave = (id) => {
    const updatedDetails = details.map((detail) => {
      if (detail._id === id) {
        api.updateCustomerDetail(detail._id, detail);
        return { ...detail, editing: false };
      }
      return detail;
    });
    setDetails(updatedDetails);
    setEditingId("");
  };

  const handleCancel = () => {
    setEditingId("");
  };

  const handleDetailsChange = (title, key, value) => {
    const updatedDetails = details.map((detail) => {
      if (detail._id === key && title === "name") {
        return { ...detail, name: value };
      } else if (detail._id === key && title === "address") {
        return { ...detail, address: value };
      } else if (detail._id === key && title === "city") {
        return { ...detail, city: value };
      } else if (detail._id === key && title === "pincode") {
        return { ...detail, pincode: value };
      } else if (detail._id === key && title === "country") {
        return { ...detail, country: value };
      }
      return detail;
    });
    setDetails(updatedDetails);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredDetails = details.filter((detail) =>
    detail.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "#",
      dataIndex: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (text, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleDetailsChange("name", record._id, e.target.value)
            }
            onPressEnter={() => handleSave(record._id)}
          />
        ) : (
          text
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      editable: true,
      render: (text, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleDetailsChange("address", record._id, e.target.value)
            }
            onPressEnter={() => handleSave(record._id)}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      editable: true,
      render: (text, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleDetailsChange("city", record._id, e.target.value)
            }
            onPressEnter={() => handleSave(record._id)}
          />
        ) : (
          text
        );
      },
      sorter: (a, b) => a.city.localeCompare(b.name),
    },
    {
      title: "Pin Code",
      dataIndex: "pincode",
      key: "pincode",
      editable: true,
      render: (text, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleDetailsChange("pincode", record._id, e.target.value)
            }
            onPressEnter={() => handleSave(record._id)}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      editable: true,
      render: (text, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleDetailsChange("country", record._id, e.target.value)
            }
            onPressEnter={() => handleSave(record._id)}
          />
        ) : (
          text
        );
      },
      sorter: (a, b) => a.country.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isEditing = record._id === editingId;
        return isEditing ? (
          <Space size="middle">
            <CheckOutlined onClick={() => handleSave(record._id)} />
            <CloseOutlined onClick={() => handleCancel()} />
          </Space>
        ) : (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)} type="primary">
              Edit
            </Button>
            <Button onClick={() => handleDelete(record._id)} type="default">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Title level={2} className="heading">
        Customer Details
      </Title>
      <Input
        prefix={<SearchOutlined style={{ marginRight: 5 }} />}
        placeholder="Search Customer Details"
        value={searchText}
        onChange={handleSearch}
        style={{ width: 200, marginRight: 150 }}
        className="searchBar"
      />
      <div className="adding-new-detail-container">
        <Input
          value={newName}
          onChange={handleNewNameChange}
          placeholder="Add name"
          maxLength={100}
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <Input
          value={newAddress}
          onChange={handleNewAddressChange}
          placeholder="Add Address"
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <Input
          value={newCity}
          onChange={handleNewCityChange}
          placeholder="Add City"
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <Input
          value={newPincode}
          onChange={handleNewPincodeChange}
          placeholder="Add Pincode"
          style={{ width: 200, marginRight: 16 }}
          required
        /><br/>
        <Input
          value={newCountry}
          onChange={handleNewCountryChange}
          placeholder="Add Country"
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <Button onClick={handleAddTask} type="primary">
          Add
        </Button>
      </div>
      <div className="details-container">
        <Table
          columns={columns}
          dataSource={filteredDetails}
          rowClassName={(record) =>
            record._id === editingId ? "editing-row" : ""
          }
          bordered
          onChange={handleChange}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
};

export default CustomerDetails;
