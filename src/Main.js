import React, { useEffect, useState } from "react";
import "./index.css";
import {
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
  HeartFilled,
  MailOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import HeartIcon from "./HeartIcon";

const { Meta } = Card;

function Main() {
  const [userdata, setdata] = useState([]);

  useEffect(() => {
    axios.get("https://backend-4.onrender.com/getusers").then((res) => {
      setdata(res.data);
      console.log(userdata);
      form.setFieldsValue({
        username: "something",
      });
    });
  }, []);
  const [form] = useForm();

  const [data_1, setdata_1] = useState(false);
  const [temp, settemp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (innerdata) => {
    settemp(innerdata);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log(temp);
    setIsModalOpen(false);
    console.log("Success:", values);
    const data = {
      name: values.username,
      email: values.email,
      phoneNumber: values.pn,
      website: values.website,
    };
    axios
      .post("https://backend-4.onrender.com/update/" + temp._id, data)
      .then((res) => {
        console.log(res.data);

        axios.get("https://backend-4.onrender.com/getusers").then((res) => {
          setdata(res.data);
        });
      });
  };

  const deleteitem = (innerdata) => {
    axios
      .post("https://backend-4.onrender.com/delete/" + innerdata._id)
      .then((res) => {
        axios.get("https://backend-4.onrender.com/getusers").then((res) => {
          setdata(res.data);
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const fillvalues = (innerdata) => {
    form.setFieldsValue({
      username: innerdata.name,
      email: innerdata.email,
      pn: innerdata.phoneNumber,

      website: innerdata.website,
    });
    console.log(innerdata.phoneNumber);
  };

  const handleSubmit = () => {};
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="term">
        {userdata
          ? userdata.map((innerdata, index) => {
              return (
                <div className="cards_1">
                  <Card
                    key={index}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        style={{ padding: "20px" }}
                      />
                    }
                    actions={[
                      <HeartIcon />,
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          fillvalues(innerdata);
                          showModal(innerdata);
                        }}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => deleteitem(innerdata)}
                      />,
                    ]}
                  >
                    <h6>{innerdata.name}</h6>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      <MailOutlined style={{ marginTop: "2%" }} />{" "}
                      <p style={{ marginLeft: "5%" }}>{innerdata.email}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {" "}
                      <PhoneOutlined style={{ marginTop: "2%" }} />{" "}
                      <p tyle={{ marginLeft: "15px" }} className="phoneoutline">
                        {innerdata.phoneNumber}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {" "}
                      <GlobalOutlined style={{ marginTop: "2%" }} />{" "}
                      <p tyle={{ marginLeft: "15px" }} className="phoneoutline">
                        {innerdata.website}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })
          : null}
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={onFinishFailed}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="phoneNumber"
            name="pn"
            rules={[
              { required: true, message: "Please input your phoneNumber!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="website"
            name="website"
            rules={[{ required: true, message: "Please input your website!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Main;
