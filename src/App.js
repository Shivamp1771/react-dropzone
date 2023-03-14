import React, { useState } from 'react';
import './App.css';

function FileUploader() {       // returns some jsx
  const [files, setFiles] = useState([]);       //represents the file selected for upload
  const [custodian, setCustodian] = useState('');      //represents the name custodian
  const [uploading, setUploading] = useState(false);   //uploading represents whether the file is being uploaded
  const [progress, setProgress] = useState(0);         //tracks progress

  const handleDrop = (event) => {       //handle selection of file
    event.preventDefault();         // prevention of page reload
    const newFiles = [...files];    //setting files
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      newFiles.push(event.dataTransfer.files[i]);
    }
    setFiles(newFiles);
  };

  const handleFileInput = (event) => {
    const newFiles = [...files];
    for (let i = 0; i < event.target.files.length; i++) {
      newFiles.push(event.target.files[i]);    //pushing new file
    }
    setFiles(newFiles);
  };

  const handleCustodianInput = (event) => {
    setCustodian(event.target.value);
  };

  const handleSubmit = () => {    //handle submission of the selected files 
    setUploading(true);       //set user clicks submit uploading is set to true

    // setting up progress bar with setInterval function increments progress by every 10seconds and 
    // resetting files, custodian and uploading states 
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 10;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
        setFiles([]);
        setCustodian('');
        setProgress(0);
        setUploading(false);
      }
    }, 500);
  };

  // some basic jsx code for rendering a file dropzone  
  return (
    <div className="dropzone" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      {files.length > 0 && !uploading ? (
        <>
          <div>
            <label htmlFor="custodian-input">Custodian:</label>
            <input type="text" id="custodian-input" value={custodian} onChange={handleCustodianInput} />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <div>
          <label htmlFor="file-input">Upload files:</label>
          <input type="file" id="file-input" multiple onChange={handleFileInput} />
          <p>Or drag and drop files here</p>
        </div>
      )}
      {uploading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <div className="progress-text">{`${progress}% uploaded`}</div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
