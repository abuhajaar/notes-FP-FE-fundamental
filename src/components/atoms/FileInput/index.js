import React, { useState } from 'react';
import axios from 'axios';
import './fileInput.scss';
import { BASE_URL } from '../../../config/index';

function FileInput({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    onFileSelect(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('data', selectedFile);

    axios.post(
      `${BASE_URL}/upload/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ).then((response) => {
      localStorage.setItem('ImageTest', response.data.data.fileLocation);
      console.log(response.data.data.fileLocation);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="fileInput">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInput} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileInput;
