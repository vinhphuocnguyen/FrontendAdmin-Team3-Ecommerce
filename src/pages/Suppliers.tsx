import { Table, Button, message, Form, Input, Popconfirm, Space, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = React.useState([]);
  const [reFresh, setReFresh] = React.useState(0);
  const [selectedRecord, setSelectedRecord] = React.useState<any>({});
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const onFinish = (values: any) => {
    fetch("http://localhost:9000/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((json) => {
        message.success("thêm mới thành công");
        setReFresh((f) => f + 1);
        createForm.resetFields();
      })
      .catch((error) => {
        message.success("thêm mới lỗi");
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onUpdateFinish = (values: any) => {
    fetch("http://localhost:9000/suppliers/" + selectedRecord._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((json) => {
        message.success("sửa thành công");
        setReFresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((error) => {
        message.success("lỗi");
        console.error(error);
      });
  };

  const onUpdateFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  React.useEffect(() => {
    fetch("http://localhost:9000/suppliers", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setSuppliers(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reFresh]);

  const columns = [
    {
      title: "Nhà cung cấp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text: any) => {
        return <em>{text}</em>;
      },
    },
    {
      key: "action",
      render: (text: any, record: any) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditFormVisible(true);
                setSelectedRecord(record);
                updateForm.setFieldsValue(record);
              }}
            ></Button>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                handleDelete(record._id);
              }}
              onCancel={() => {}}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleDelete = (id: string) => {
    const url = "http://localhost:9000/suppliers/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        message.success("xoá thành công");
        setReFresh((f) => f + 1);
      })
      .catch((error) => {
        // Nếu có lỗi
        console.error(error);
        message.error("thất bại");
      });
  };
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  return (
    <div className="py-4 px-8">
      <Form
        form={createForm}
        name="create-form"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Nhà cung cấp" name="name" rules={[{ required: true, message: "Nhà cung cấp" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Nhập email", type: "email" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="Số Điện Thoại" name="phoneNumber" rules={[{ required: true, message: "Số Điện Thoại" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Địa chỉ" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={suppliers} columns={columns} rowKey={"id"} />

      <Modal
        centered
        open={editFormVisible}
        title="Update"
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Nhà cung cấp" name="name" rules={[{ required: true, message: "Nhà cung cấp" }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Nhập email", type: "email" }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item label="Số Điện Thoại" name="phoneNumber" rules={[{ required: true, message: "Số Điện Thoại" }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Địa chỉ" }]} hasFeedback>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Suppliers;
