"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { CartUpdateContext } from "../(context)/CartUpdateContext";
import GlobalApi from "../(utils)/GlobalApi";
function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("Executed");
    user && GetUserCart();
  }, [updateCart && user]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
        setCart(resp?.userCarts);
      }
    );
  };

  return (
    <div className="flex justify-between items-center shadow-sm p-4 md:px-10">
      <Image
        src="/Logo.png"
        alt="logo"
        width={150}
        height={150}
        style={{ marginBottom: "5px" }}
      />
      {/* <div className="flex border p-2 rounded-lg bg-gray-200 w-96">
        <input type="text" className="" />
        <Search />
      </div> */}

      <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-96 bg-transparent outline-none sm:text-sm"
        />

        <span class="inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" class="text-gray-600 hover:text-gray-700">
            <span class="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 items-center">
            <ShoppingCart />
            <label className="p-1 px-3 rounded-full bg-slate-200 ">
              {cart?.length}
            </label>
          </div>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-5">
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
