import {useContext, useRef, useEffect} from "react";

import ModalContext from "./ModalContext.jsx";

const ModalViewer = () => {
  const {modal, setModal} = useContext(ModalContext);
  const modalRef = useRef(null);

  //Close the modal if it's been clicked outside of
  const handleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(null);
    }
  };
  //Manage event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [modalRef]);

  return (
    <div className={"modalViewer"}>
      <div className={"modalContent"} ref={modalRef}>
        {modal}
      </div>
    </div>
  );
};

export default ModalViewer;