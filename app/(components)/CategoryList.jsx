"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import GlobalApi from "../(utils)/GlobalApi";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CategoryList() {
  const listRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    setSelectedCategory(params.get("category"));
  }, [params.get("category")]);
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = () => {
    GlobalApi.GetCategory().then((res) => {
      console.log(res.categories);
      setCategoryList(res.categories);
    });
  };

  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-10 relative">
      <div className="flex gap-4 overflow-auto scrollbar-hide" ref={listRef}>
        {categoryList &&
          categoryList.map((category, index) => (
            <Link
              href={"?category=" + category.slug}
              key={index}
              className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-gray-100 cursor-pointer group ${
                selectedCategory == category.slug
                  ? "border-primary bg-gray-100"
                  : ""
              }`}
            >
              <img
                src={category.icon?.url}
                alt={category.name}
                width={50}
                height={50}
                className="group-hover:scale-125 transition-all duration-200"
              />
              <h2 className="text-ms font-medium group-hover:text-primary">
                {category.name}
              </h2>
            </Link>
          ))}
      </div>
      <ArrowRightCircle
        className="absolute -right-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer"
        onClick={() => scrollRightHandler()}
      />
    </div>
  );
}

export default CategoryList;
