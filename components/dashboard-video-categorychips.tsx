import axios from "axios";
import { useEffect, useState } from "react";
import DashBoardVideoChipsSelect from "./dashboard-video-chips-select-input";
import { APIKEY } from "@/lib";
import DashboardVideoChipsSelectedTab from "./dashboard-video-chips-selected-tab";
import { Category } from "@prisma/client";

export function CategoryChips({
  readyToCategoryMutate,
}: {
  readyToCategoryMutate: (categoryData: Category[]) => void;
}) {
  const [toggleSelect, setToggleSelect] = useState(false); //open toggle select
  const [selectedChips, setSelectedChips] = useState<Category[]>([]); //selected and rendered chips
  const [fetchedCategory, setFetchedCategory] = useState<Category[]>([]); //fetched data from api

  function getCategory() {
    axios
      .get("/api/name-category", {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then((item) => setFetchedCategory(item.data.category));
  }

  useEffect(() => {
    getCategory();
  }, []);

  const notSelectedCategories = fetchedCategory
    ? fetchedCategory.filter(
        (category: Category) =>
          !selectedChips.some((selected) => selected.id === category.id)
      )
    : [];

  const pushChips = (item: Category) => {
    setSelectedChips([...selectedChips, item]);
    readyToCategoryMutate([...selectedChips, { id: item.id, name: item.name }]);
  };

  const deleteChips = (id: number) => {
    const chips = selectedChips.filter((item) => item.id !== id);
    setSelectedChips(chips);
    readyToCategoryMutate(chips);
  };

  return (
    <>
      <div className="relative flex h-full w-[746px] rounded-[5px] ">
        <DashboardVideoChipsSelectedTab
          selectedChips={selectedChips}
          deleteChips={(id: number) => deleteChips(id)}
        />

        <DashBoardVideoChipsSelect
          toggleSelect={toggleSelect}
          setToggleSelect={() => setToggleSelect(!toggleSelect)}
          pushChips={(i) => pushChips(i)}
          notSelectedCategories={notSelectedCategories}
        />
      </div>
    </>
  );
}
