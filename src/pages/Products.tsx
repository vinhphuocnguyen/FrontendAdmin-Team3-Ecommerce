import { Table, Button, message, Form, Input, Popconfirm, Space, Modal, InputNumber, Select, Upload, Image } from "antd";
import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";

const Products = () => {
  const [listProduct, setListProduct] = React.useState([]);
  const [listCategories, setListCategories] = React.useState<any>([]);
  const [listSuppliers, setListSuppliers] = React.useState<any>([]);
  const [reFresh, setReFresh] = React.useState(0);
  const [selectedRecord, setSelectedRecord] = React.useState<any>({});
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const onFinish = (values: any) => {
    fetch("http://localhost:9000/products", {
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
    fetch("http://localhost:9000/products/" + selectedRecord._id, {
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
        message.success("thêm mới lỗi");
        console.error(error);
      });
  };

  const onUpdateFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  React.useEffect(() => {
    fetch("http://localhost:9000/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setListCategories(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:9000/suppliers", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setListSuppliers(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:9000/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setListProduct(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reFresh]);

  const columns = [
    {
      title: "Hình ảnh",
      key: "imageUrl",
      dataIndex: "imageUrl",
      width: "10%",
      render: (text: any) => {
        return <Image width={200} src={`http://localhost:9000${text}`} />;
      },
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "category",
      key: "category",
      render: (text: any, record: any) => {
        return <span>{record.category?.name}</span>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: any) => {
        return <strong>{text}</strong>;
      },
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
      render: (text: any, record: any) => {
        return <span>{record.supplier?.name}</span>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: any) => {
        return <strong>{text} $</strong>;
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (text: any) => {
        return <em>{text}%</em>;
      },
    },
    {
      title: "Hàng trong kho",
      dataIndex: "stock",
      key: "stock",
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
            <Upload
              showUploadList={false}
              name="file"
              action={"http://localhost:9000/upload/products/" + record._id}
              headers={{ authorization: "authorization-text" }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }

                if (info.file.status === "done") {
                  message.success(`${info.file.name} file uploaded successfully`);

                  setReFresh((f) => f + 1);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />} />
            </Upload>
          </Space>
        );
      },
    },
  ];

  const handleDelete = (id: string) => {
    const url = "http://localhost:9000/products/" + id;
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
        <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: "Chọn nhà cung cấp" }]} hasFeedback>
          <Select
            options={
              listCategories &&
              listCategories.map((item: any) => {
                return { value: item._id, label: item.name };
              })
            }
          />
        </Form.Item>
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "nhập tên sp" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item label="Nhà cung cấp" name="supplierId" rules={[{ required: true, message: "Chọn nhà cung cấp" }]} hasFeedback>
          <Select
            options={
              listSuppliers &&
              listSuppliers.map((item: any) => {
                return { value: item._id, label: item.name };
              })
            }
          />
        </Form.Item>
        <Form.Item label="Giá bán" name="price" rules={[{ required: true, message: "nhập giá" }]} hasFeedback>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Giảm giá" name="discount" rules={[{ required: false, message: "nhập giảm giá" }]} hasFeedback>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Tồn kho" name="stock" rules={[{ required: true, message: "nhập tồn kho" }]} hasFeedback>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Mô tả" name="description" rules={[{ required: false, message: "nhập mô tả" }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-red-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={listProduct} columns={columns} rowKey={"id"} />

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
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: "Chọn nhà cung cấp" }]} hasFeedback>
            <Select
              options={
                listCategories &&
                listCategories.map((item: any) => {
                  return { value: item._id, label: item.name };
                })
              }
            />
          </Form.Item>
          <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "nhập tên sp" }]} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item label="Nhà cung cấp" name="supplierId" rules={[{ required: true, message: "Chọn nhà cung cấp" }]} hasFeedback>
            <Select
              options={
                listSuppliers &&
                listSuppliers.map((item: any) => {
                  return { value: item._id, label: item.name };
                })
              }
            />
          </Form.Item>
          <Form.Item label="Giá bán" name="price" rules={[{ required: true, message: "nhập giá" }]} hasFeedback>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Giảm giá" name="discount" rules={[{ required: false, message: "nhập giảm giá" }]} hasFeedback>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Tồn kho" name="stock" rules={[{ required: true, message: "nhập tồn kho" }]} hasFeedback>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Mô tả" name="description" rules={[{ required: false, message: "nhập mô tả" }]} hasFeedback>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
