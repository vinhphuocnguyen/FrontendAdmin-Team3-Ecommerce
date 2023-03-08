import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Space, Table, message } from "antd";
// import { moment } from "moment";
var moment = require("moment");

type Props = {};

const Orders = (props: Props) => {
  const [reFresh, setReFresh] = React.useState(0);
  function handleDelete(id: any) {
    const url = "http://localhost:9000/orders/" + id;
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
  }
  const [orders, setOrders] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    fetch("http://localhost:9000/orders", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setOrders(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reFresh]);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Kiểu thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
      width: "10%",
    },
    {
      title: "Ngày đặt đơn hàng",
      dataIndex: "createdDate",
      key: "createdDate",
      width: "15%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "7%",
      render: (text: any, record: any) => {
        const { orderDetails } = record;
        let total = 0;
        orderDetails.forEach((od: any) => {
          let sum = od.quantity * od.product?.total;

          total = total + sum;
        });

        return <strong>{total}</strong>;
      },
    },
    {
      key: "action",
      width: "10%",
      render: (text: any, record: any) => {
        const { orderDetails } = record;
        let total = 0;
        orderDetails.forEach((od: any) => {
          let sum = od.quantity * od.product?.total;

          total = total + sum;
        });
        return (
          <Space>
            <Button type="primary" onClick={showModal}>
              Chi tiết đơn hàng
            </Button>
            <Modal
              title="Chi tiết đơn hàng"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>
                Mã đơn hàng:{" "}
                <span style={{ float: "right" }}> {record._id}</span>
              </p>
              <p>
                Hình thức thanh toán:{" "}
                <span style={{ float: "right" }}>{record.paymentType}</span>
              </p>
              <p>
                Trạng thái đơn hàng:{" "}
                <span style={{ float: "right" }}>{record.status}</span>
              </p>
              <p>
                Địa chỉ nhận hàng:{" "}
                <span style={{ float: "right" }}>{record.shippingAddress}</span>
              </p>
              <p>Đơn hàng bao gồm:</p>
              {record.orderDetails.map((p: any) => {
                return (
                  <p>
                    {p.product?.name}
                    <span style={{ float: "right" }}>
                      Giảm giá: {p.product?.discount}%
                    </span>
                    <p>
                      Giá: {p.product?.price} ${" "}
                      <span style={{ float: "right" }}>
                        số lượng: {p.quantity}
                      </span>
                    </p>
                  </p>
                );
              })}
              <p>Ngày tạo đơn: {record.createdDate}</p>
              <hr />
              <p>
                <strong>
                  Tổng tiền:{" "}
                  <span style={{ float: "right" }}>
                    <strong>{total} $</strong>
                  </span>
                </strong>
              </p>
            </Modal>
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
  return <Table dataSource={orders} columns={columns} rowKey={"id"} />;
};

export default Orders;
