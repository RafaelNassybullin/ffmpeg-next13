import { FC, useState } from "react";
import Navbar from "@/components/dashboard-navbar";
import Button from "./button";
import ModalWrapper from "./modal-wrapper";
import ModalDeleteConfirm from "./modal-delete-confirm";
import React from "react";

//component
interface IDashboardWrapper {
  children: React.ReactNode;
  inputs: React.ReactNode;
  checked: string;
  closeDeleteModal: () => void;
  deleteModalID: number | undefined;
  confirmDeleteHandler: () => void;
  deleteName: string | undefined;
}

const DashboardWrapper: FC<IDashboardWrapper> = ({
  children,
  inputs,
  checked,
  deleteModalID,
  closeDeleteModal,
  confirmDeleteHandler,
  deleteName,
}) => {
  const [modalState, setModalState] = useState(false);

  function modalHandler() {
    setModalState(true);
  }

  return (
    <div className="relative flex pl-[230px]">
      <Navbar checked={checked} />

      <div className="relative flex h-[100vh] w-full flex-col items-center">
        <Button onClick={modalHandler}>Add {checked}</Button>

        <div className="flex w-full mt-[35px] flex-wrap px-20">{children}</div>

        {modalState && (
          <ModalWrapper closeModal={() => setModalState(false)}>
            {inputs}
          </ModalWrapper>
        )}

        {deleteModalID && (
          <ModalWrapper closeModal={closeDeleteModal}>
            <ModalDeleteConfirm
              itemName={deleteName}
              cancel={closeDeleteModal}
              confirm={confirmDeleteHandler}
            />
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};
export default DashboardWrapper;
