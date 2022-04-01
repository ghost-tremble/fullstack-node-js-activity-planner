import React, { useState } from "react";
import "../styles/modal.css";

const Modal = ({ isModalOpen, setIsModalOpen, modalData }) => {
  return (
    <div className={isModalOpen ? "modal-main" : ""}>
      <div className={`modal-container ${isModalOpen ? "modal-scale" : ""}`}>
        <div
          className="cancel-modal"
          onClick={() => {
            setIsModalOpen(false);
          }}>
          <i class="bi bi-x-diamond">x</i>
        </div>

        <div className="content-modal container">
          <div className="row">
            <div className="col-sm-12">{modalData}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
