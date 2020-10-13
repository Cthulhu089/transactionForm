import React from "react";
import { Modal, Button } from "antd";

const CustomModal = ({
  title,
  onOk,
  visible,
  loading,
  onCancel,
  content,
  cancelButtonType,
  cancelButtonLabel,
  submitButtonLabel,
  submitButtonType,
  showFooter
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={
        showFooter === true && [
          <Button key="back" type={cancelButtonType} onClick={onCancel}>
            {cancelButtonLabel}
          </Button>,
          <Button
            key="submit"
            type={submitButtonType}
            loading={loading}
            onClick={onOk}
          >
            {submitButtonLabel}
          </Button>
        ]
      }
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
