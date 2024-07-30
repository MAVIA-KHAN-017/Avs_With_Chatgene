import { Card, Flex, Modal, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Chatbot from "../Chat/Chatbot";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Chat = ({ handleBotIconClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleBotIconClick();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    handleBotIconClick();
  };

  const customClassNames = {
    header: "chat-modal-header-class",
    body: "chat-modal-body-class",
    footer: "chat-modal-footer-class",
    mask: "chat-modal-mask-class",
    content: "chat-modal-content-class",
    wrapper: "chat-modal-wrapper-class",
  };

  return (
    <div>
      <Modal
        title="AVS Bot"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
        classNames={customClassNames}
        style={{
          height: "80vh;"
        }}
      >
        {showCard ? (
          <>
            <ArrowLeftOutlined title="Back" onClick={() => setShowCard(false)} className="custom-back-btn"/>
            <Chatbot setShowCard={setShowCard} chatType={"csv"} />
          </>
        ) : (
          <Flex gap="10px 0" wrap vertical>
            <Tag className="chatbot-title" onClick={() => setShowCard(true)}>
              Stock
            </Tag>
            {/* <Tag className="chatbot-title" onClick={() => setShowCard(true)}>
              Warehouse Sale
            </Tag>
            <Tag className="chatbot-title" onClick={() => setShowCard(true)}>
              Stock Aging
            </Tag> */}
          </Flex>
        )}
      </Modal>
    </div>
  );
};

export default Chat;
