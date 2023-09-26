"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryAddInputs from "@/components/dashboard-category-inputs";
import Categories from "@/components/dashboard-category";
import Wrapper from "@/components/dashboard-wrapper";
import { APIKEY } from "@/lib";
import { Category } from "@prisma/client";

//page
export default function CategoryDashboardPage() {
  const [category, setCategory] = useState({} as Category);
  const [categoryData, setCategoryData] = useState([] as Category[]);

  function getCategories() {
    axios
      .get("/api/name-category", {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then((item) => setCategoryData(item.data.category));
  }

  function deleteCategory() {
    axios
      .get(`/api/delete-category?id=${category.id}`, {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        setCategoryData(
          categoryData.filter((item: Category) => item.id !== category.id)
        );
        setCategory({} as Category);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Wrapper
      deleteModalID={category.id}
      confirmDeleteHandler={deleteCategory}
      closeDeleteModal={() => setCategory({} as Category)}
      checked={"category"}
      deleteName={category.name}
      inputs={<CategoryAddInputs refetch={getCategories} />}
    >
      <Categories
        categories={categoryData}
        getOneCategory={(category: Category) => setCategory(category)}
      />
    </Wrapper>
  );
}
