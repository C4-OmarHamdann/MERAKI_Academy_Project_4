import React from "react";

const UploadFile = ({ file, setFile }) => {
  return (
    <div className="tweet-apload">
      <input
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        type="file"
      ></input>
      <br />
      {file && (
        <img className="upload" src={URL.createObjectURL(file)} alt="" />
      )}
    </div>
  );
};

export default UploadFile;
