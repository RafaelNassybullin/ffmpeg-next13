import { FC } from "react";

//component for delete components
interface IModalDeleteConfirm {
  itemName?: string;
  cancel: () => void;
  confirm: () => void;
}

const ModalDeleteConfirm: FC<IModalDeleteConfirm> = ({
  itemName,
  cancel,
  confirm,
}) => {
  return (
    <>
      <div className="text-center text-4xl">
        Delete <span className="text-orange-300">{itemName}</span>?
      </div>

      <div className="mt-[30px] flex w-full justify-between">
        <div
          onClick={confirm}
          className="flex h-[49px] w-[48%] cursor-pointer items-center justify-center rounded-[10px] bg-red-400 text-center text-xl"
        >
          Yes
        </div>
        <div
          onClick={cancel}
          className="flex h-[49px] w-[48%] cursor-pointer items-center justify-center rounded-[10px] bg-green-400 text-center text-xl"
        >
          No
        </div>
      </div>
    </>
  );
};

export default ModalDeleteConfirm;
