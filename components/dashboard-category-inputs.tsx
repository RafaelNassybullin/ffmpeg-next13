import { FC, useState } from "react";
import Input from "./input";
import Button from "./button";
import axios from "axios";
import { APIKEY } from "@/lib";

//component
interface ICategoryAddInputs {
  refetch: () => void;
}

const CategoryAddInputs: FC<ICategoryAddInputs> = ({ refetch }) => {
  const [value, setValue] = useState("");

  function addCategoryHandler() {
    axios
      .get(`/api/add-category?category=${value}`, {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        refetch();
      });
  }

  return (
    <div className="flex flex-col">
      <Input
        name={"category-name"}
        value={value}
        className={"w-[600px]"}
        onChange={(event) => setValue((event.target as HTMLInputElement).value)}
        type={"text"}
        placeholder={"Add Category"}
      />

      <Button onClick={addCategoryHandler}>Submit</Button>
    </div>
  );
};

export default CategoryAddInputs;
