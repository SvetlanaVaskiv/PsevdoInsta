//import React, {useRef} from "react";
import { actionUploadFile } from "../../redux/actions";

import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";
import { ProfileImage } from "../Profile/StyledProfile";

function MyDropzone({ onSend, info }) {
  const loading = useRef();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  if (acceptedFiles.length > 0 && !loading.current) {
    onSend(acceptedFiles[0]);
    loading.current = true;
    console.log("value", loading);
  }
  let avaJSX = info?.avatar?.map((item) => (
    <ProfileImage alt="ava" src={`http://localhost:4000/${item.url}`} />
  ));
  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <h6>Drag 'n' drop some files here, or click to select files</h6>
        {avaJSX}{" "}
      </div>
    </>
  );
}

const CDrop = connect(null, { onSend: actionUploadFile })(MyDropzone);
export default CDrop;
