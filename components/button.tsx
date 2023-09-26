import { FC } from "react";

//component
interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<IButton> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mt-[20px] capitalize h-16 hover:border-white hover:bg-red-500 hover:text-white rounded-[7px] border-2 border-dashed border-[color:var(--color-orange)] bg-[color:var(--color-dark-middle)] px-[15px] text-[color:var(--color-orange)] outline-none"
    >
      {children}
    </button>
  );
};

export default Button;
