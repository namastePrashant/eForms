import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { imageUploadApi } from '../../services/response';
// import { useDispatch } from 'react-redux';
import notification from '../../reusable/notification';

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

export default function ImagesUpload(props) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  // const [fileList, setFileList] = useState([]);
  // const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false)


  const handleChange = (file) => {
    // console.log('handle change', file)
    if (file.file) {
      return
    }

    let obj = {
      response_id: localStorage.getItem('responseId'),
      item_id: props?.itemId,
      image: file
    }

    // console.log('upload object', obj)
    setUploading(true);
    imageUploadApi(obj, (data) => handleImageUploadSuccess(data), () => setUploading(false));

  };

  const handleImageUploadSuccess = (imageUrl) => {
    // console.log('image url after image upload', [...props.value ?? [], imageUrl])
    props.onChange([...props.value ?? [], imageUrl])
  }

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined style={{ fontSize: 25 }} />}

    </div>
  );

  const viewImage = (image) => {
    setPreviewImage(image);
    setPreviewVisible(true);
  }

  const removeImage = (image) => {
    let filteredImages = props.value.filter(item => item !== image)
    props.onChange(filteredImages);
  }

  return (
    <>
      <Upload
        listType='picture-card'
        beforeUpload={(file) => {
          console.log('file size', file)
          if (file.size > 3145728) {
            notification.error({ message: 'Image size must be less than 3mb.' })
            return;
          }
          handleChange(file);
          return false
        }}
        //fileList={fileList}
        //onPreview={handlePreview}
        onChange={handleChange}

        //disabled={props.disabled}
        showUploadList={false}
      >
        {props?.value?.length >= props?.count ? null : uploadButton}
      </Upload>
      <div className="uploaded-image-container">
        {props.value && props?.value?.map((item, index) => {
          return (
            <div className="wrapper" key={item}>
              <img src={item} className="uploaded-image" alt={`image${index + 1}`} />
              <div className="buttons">
                <EyeOutlined onClick={() => viewImage(item)} />
                <DeleteOutlined onClick={() => removeImage(item)} />
              </div>
            </div>
          )
        })}
      </div>
      <Modal
        visible={previewVisible}
        //title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='preview image' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
