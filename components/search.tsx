"use client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { MagnifyingGlassIcon, BackspaceIcon } from "@heroicons/react/24/solid";

//component
interface ISearch {}

const Search: FC<ISearch> = () => {
  const [text, setText] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const search = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (text.trim()) {
        router.push(`/search/${text}`);
      }
    }
  };

  return (
    <div
      className={`row flex relative h-[42px] w-[468px] items-center overflow-hidden rounded-[10px] border-[1px] bg-[color:var(--color-dark-middle)] ${
        focus
          ? "border-[color:var(--color-orange)]"
          : "border-[color:var(--color-dark-middle)]"
      }`}
    >
      <MagnifyingGlassIcon
        className={`mx-3 h-8 w-8 text-[color:var(--color-gray)] ${
          text !== ""
            ? "text-[var(--color-orange)]"
            : "text-[color:var(--color-gray)]"
        }`}
      />

      <input
        className="w-full bg-inherit text-[22px] text-[color:var(--color-orange)] placeholder-[color:var(--color-gray)] outline-none"
        type="text"
        value={text}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={search}
        onChange={onChange}
        placeholder="Search. . ."
      />

      {text && (
        <BackspaceIcon
          onClick={() => setText("")}
          className="mx-3 absolute right-0 hover:text-[color:var(--color-orange)] cursor-pointer h-7 w-7 text-[color:var(--color-gray)]"
        />
      )}
    </div>
  );
};

export default Search;
