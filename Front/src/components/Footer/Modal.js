import { Button } from "react-bootstrap";
import { actionAddPost, actiongetPosts } from "../../redux/actions";
import { Backdrop, Content } from "./ModalStyle";
import { connect } from "react-redux";

const Modal = ({ children, onSend, closeModal, text, title, id }) => {
  const addPostCallback = () => {
    onSend(text, title, id);
  };

  const modalJSX = (
    <Backdrop>
      <Content>
        {children}

        <Button
          onClick={(e) => {
            addPostCallback(e);
            closeModal(e);
          }}
          label="Close"
        >
          SEND
        </Button>
      </Content>
    </Backdrop>
  );
  return <>{modalJSX}</>;
};
const CModalPost = connect(
  (state) => ({
    id: state.promise?.avatar?.payload?.url,
  }),
  { onSend: actionAddPost }
)(Modal);
export default CModalPost;
