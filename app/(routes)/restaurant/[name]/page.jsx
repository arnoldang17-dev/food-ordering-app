"use client";

import GlobalApi from "@/app/(utils)/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Intro from "./(components)/Intro";
import RestroTabs from "./(components)/RestroTabs";

function RestaurantDetails() {
  const params = usePathname();
  const [restaurant, setRestaurant] = React.useState([]);
  useEffect(() => {
    GetRestaurantDetails(params.split("/")[2]);
  }, []);
  const GetRestaurantDetails = (restroSlug) => {
    GlobalApi.GetBusinessDetail(restroSlug).then((res) => {
      console.log(res);
      setRestaurant(res.restaurant);
    });
  };
  return (
    <div>
      <Intro restaurant={restaurant} />
      <RestroTabs restaurant={restaurant} />
    </div>
  );
}

export default RestaurantDetails;
