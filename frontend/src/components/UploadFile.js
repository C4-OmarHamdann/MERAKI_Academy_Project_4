import React from "react";

const UploadFile = ({ file, setFile }) => {
  return (
    <div>
      <input
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        type="file"
      ></input>
      <br />
      {file && <img width={500} height={300} src={URL.createObjectURL(file)} />}
    </div>
  );
};

export default UploadFile;
