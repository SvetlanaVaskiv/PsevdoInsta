//import React, {useRef} from "react";
import { actionUploadFile } from "../../redux/actions";
import { Button } from "react-bootstrap";

import { connect, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";
import { ProfileImage } from "../Profile/StyledProfile";
import { useState } from "react";
import { useEffect } from "react";
import im from "../../images/pictureinput.jpg";
import { useCallback } from "react";
function MyDropzone({ onSend, image }) {
  const loading = useRef();
  const [interfaceImage, setInterfaceImage] = useState(im);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  console.log(acceptedFiles);
  if (acceptedFiles.length > 0 && !loading.current) {
    onSend(acceptedFiles[0], setInterfaceImage(image));
    loading.current = true;
  }

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <h6>Drag 'n' drop some files here, or click to select files</h6>
        <img src={interfaceImage} width="400" />
      </div>
    </>
  );
}

const CPostsDropZone = connect(
  (state) => ({
    image: state.promise?.avatar?.payload?.url,
  }),
  { onSend: actionUploadFile }
)(MyDropzone);
export default CPostsDropZone;
