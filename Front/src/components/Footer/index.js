import React, { useEffect, useState } from "react";
import { loadCSS } from "fg-loadcss";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import CModalPost from "./Modal";
import CDrop from "../DropZone/DropZone";
import CPostsDropZone from "./PostsDropZone";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { actionDefault } from "../../redux/actions";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useHistory } from "react-router-dom";
export const Footer = ({ onOpen }) => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
    setText("");
    setTitle("");
  };
  const closeModal = () => setIsModalOpen(false);
  const goToSearch = () => {
    history.push(`/search`);
  };
  return (
    <Box
      sx={{
        "&  > :not(style)": {
          m: 2,
        },
        position: "fixed",
        bottom: "6%",
        left: "42%",
        bgcolor: "#f0a7d1",
        borderRadius: "30%",
      }}
    >
      {" "}
      {isModalOpen && (
        <CModalPost closeModal={closeModal} title={title} text={text}>
          <CPostsDropZone />
          <input
            value={title}
            label="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={text}
            label="Text"
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="text"
          />{" "}
          <Button
            onClick={(e) => {
              closeModal(e);
            }}
            label="Close"
          >
            CLOSE
          </Button>
        </CModalPost>
      )}
      <SearchIcon
        sx={{ fontSize: 30 }}
        onClick={(e) => {
          goToSearch(e);
        }}
      />
      <AddCircleOutlineIcon
        sx={{ fontSize: 30 }}
        onClick={(e) => {
          openModal(e);
        }}
      />
    </Box>
  );
};
/*const CModal = connect(null, { onOpen: actionDefault })(FontAwesomeIcon);
export default CModal;*/
