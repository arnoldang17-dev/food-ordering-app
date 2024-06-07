import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { SquarePlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/(utils)/GlobalApi";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/(context)/CartUpdateContext";

function MenuSection({ restaurant }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  useEffect(() => {
    restaurant?.menu && FilterMenu(restaurant?.menu[0].category);
  }, [restaurant]);

  const FilterMenu = (category) => {
    const result = restaurant?.menu?.filter(
      (item) => item.category == category
    );
    setMenuItemList(result[0]);
  };

  const addToCartHandler = (item) => {
    toast("Adding to cart");

    const data = {
      email: user?.primaryEmailAddress.emailAddress,
      name: item?.name,
      description: item?.description,
      productImage: item?.productImage?.url,
      price: item?.price,
    };
    GlobalApi.AddToCart(data).then(
      (res) => {
        console.log(res);
        setUpdateCart(!updateCart);
        toast("Item added to cart");
      },
      (err) => {
        toast("Error while adding into cart");
      }
    );
  };
  return (
    <div className="grid grid-cols-4 mt-2">
      <div className="hidden md:flex flex-col mr-10 gap-2">
        {restaurant?.menu?.map((item, index) => (
          <Button
            variant="ghost"
            className="flex justify-start"
            onClick={() => FilterMenu(item.category)}
          >
            {item.category}
          </Button>
        ))}
      </div>
      <div className="md:col-span-3 col-span-4">
        <h2 className="font-extrabold text-lg">{menuItemList.category}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {menuItemList?.menuItem?.map((item, index) => (
            <div className="p-2 flex gap-3 border rounded-xl hover:border-primary cursor-pointer">
              <Image
                src={item?.productImage?.url}
                alt={item.name}
                width={120}
                height={120}
                className="object-cover w-[120px] rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold">{item.name}</h2>
                <h2>{item.price}</h2>
                <h2 className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </h2>
                <SquarePlus
                  className="cursor-pointer"
                  onClick={() => addToCartHandler(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
