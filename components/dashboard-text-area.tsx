import { ChangeEvent, FC } from "react";

//component dashboard text area
interface IDashboardTextArea {
  value: string;
  onChange: (event: ChangeEvent) => void;
}

const DashboardTextArea: FC<IDashboardTextArea> = ({ value, onChange }) => {
  return (
    <div className="h-[290px] mt-[15px] w-[45%] rounded-[5px] bg-[#373332]">
      <textarea
        onChange={onChange}
        value={value}
        placeholder="Type description..."
        className="h-full w-full resize-none rounded-lg border-[color:var(--color-orange)] border-2 border-dashed bg-transparent p-2 text-[color:var(--color-orange)] outline-none placeholder:text-[color:var(--color-gray)]  focus:bg-[color:var(--color-dark-hard)]"
        name="description"
        id="textarea"
      ></textarea>
    </div>
  );
};

export default DashboardTextArea;
