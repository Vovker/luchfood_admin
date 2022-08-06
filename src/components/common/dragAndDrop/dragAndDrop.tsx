import {Form, Upload} from "antd"
import {InboxOutlined} from "@ant-design/icons";
import React from "react";
import {DragAndDropTypes} from "./dragAndDrop.types";


export const DragAndDrop: React.FC<DragAndDropTypes> = ({name}) => {

  const props = {
    multiple: false,

    beforeUpload: () => {
      return false;
    },

    onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {

      if(info.fileList.length > 1){
        info.fileList.shift();
      }
    },

    onDrop(e: { dataTransfer: { files: any; }; }) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: 'Обязательное поле!',
        },
      ]}
    >
      <Upload.Dragger
        {...props}
        listType={'picture'}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Кликните или перетащите файл....</p>
        <p className="ant-upload-hint">
          Поддерживает только файлы в формате .jpeg | .jpg
        </p>
      </Upload.Dragger>
    </Form.Item>
  )
}
