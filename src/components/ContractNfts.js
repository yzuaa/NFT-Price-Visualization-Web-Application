import { Button, Modal, Skeleton, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getContractNFTs } from "../utils";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "External Link",
    dataIndex: "external_url",
    key: "external_url",
    render: (value) => {
      if (value) {
        return (
          <a href={value} target="_blank" rel="noreferrer">
            View
          </a>
        );
      }

      return "--";
    },
  },
];

const ModalContent = ({ tokenAddress }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getContractNFTs(tokenAddress)
      .then((resp) => {
        const filteredData = resp.result.filter(
          //filter: 过滤流水线 把resp.result过滤后的数据赋值到filteredData
          (item) => item.metadata !== null //谁能通过过滤
        );
        const parsedData = filteredData.map(
          (
            item //map: 包装流水线 每个过来都convert下 然后塞回原数组
          ) => JSON.parse(item.metadata)
        );
        setData(parsedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton active />; //图片加载时条条效果
  }

  return <Table rowKey="name" columns={columns} dataSource={data} />;
};

const ContractNfts = ({ tokenAddress }) => {
  const [modalOpen, setModalOpen] = useState();

  return (
    <>
      <Tooltip title="NFT(s) in its contract">
        <Button
          style={{ border: "none" }}
          size="large"
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setModalOpen(true)}
        />
      </Tooltip>
      <Modal
        width={1000}
        title="NFT(s) List"
        destroyOnClose
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <ModalContent tokenAddress={tokenAddress} />
      </Modal>
    </>
  );
};

export default ContractNfts;
