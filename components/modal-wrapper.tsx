import { FC } from "react";

//component modal wrapper
interface IModalWrapper {
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper: FC<IModalWrapper> = ({ closeModal, children }) => {
  return (
    <>
      <div className="fixed top-0 left-0 grid h-full w-full place-items-center backdrop-blur">
        <div className="relative rounded-[10px] border-2 border-dashed border-[color:var(--color-orange)] bg-[color:var(--color-card)] p-[45px] text-white">
          <div
            onClick={closeModal}
            className="absolute top-3.5 right-5 cursor-pointer text-[16px] text-white hover:text-[color:var(--color-orange)]"
          >
            close
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
