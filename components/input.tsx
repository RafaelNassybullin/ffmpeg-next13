import { ChangeEvent, FC } from "react";

//component
interface IInput {
  name: string;
  value: string;
  className?: string;
  onChange: (event: ChangeEvent) => void;
  type: string;
  placeholder: string;
}

const Input: FC<IInput> = ({
  className,
  name,
  value,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`${className} h-16 focus:bg-[color:var(--color-dark-hard)] rounded-[7px] mt-4 border-2 border-dashed border-[color:var(--color-orange)] bg-[color:var(--color-dark-middle)] px-[15px] text-[color:var(--color-orange)] outline-none`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
