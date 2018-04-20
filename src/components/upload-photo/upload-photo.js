import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import getBase64 from 'Utils/getBase64';

const { Dragger } = Upload;

const customDraggerStyle = {
  padding: '15px 5px',
  display: 'block',
  backgroundColor: 'rgb(244, 244, 244)',
  border: 'none',
  borderRadius: '5px',
  textAlign: 'center',
  cursor: 'pointer',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16)'
}

class UploadPhoto extends Component {
  static defaultProps = {
    onUpload: () => {}
  }

  get uploadProps() {
    return {
      action: '',
      name: 'photo',
      multiple: false,
      showUploadList: false,
      style: customDraggerStyle,
      beforeUpload: this.beforeUpload
    }
  }

  beforeUpload = file => 
    new Promise(async (res, rej) => {

      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        message.error("You can only upload JPG file!");
        return rej("You can only upload JPG file!");
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return rej("Image must smaller than 2MB!");
      }

      try {
        const imageUrl = await URL.createObjectURL(file);

        this.props.onUpload(imageUrl);
      } catch(e) {
        rej(e);
      }
    })

  render() {
    return (
      <Upload {...this.uploadProps}>
        <Icon type="camera-o" style={{ fontSize: 30, color: 'black' }}/>
        <p>Добавить фото</p>
      </Upload>
    )
  }
}

export default UploadPhoto;
