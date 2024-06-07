import Image from "next/image";
import Link from "next/link";
import React from "react";

function BusinessItem({ business }) {
  return (
    <Link
      href={"/restaurant/" + business?.slug}
      className="p-3 hover:border rounded-xl hover:border-primary cursor-pointer hover:bg-gray-100 "
    >
      <Image
        src={business.banner?.url}
        alt={business.name}
        width={500}
        height={130}
        className="h-[130px] rounded-xl object-cover"
      />
      <div className="mt-2">
        <h2 className="font-bold text-lg mt-2">{business.name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src="/star.png" width={20} height={20} />
            <label className="text-primary text-sm">4.5</label>
            <h2 className="text-primary text-sm">{business?.restroType[0]}</h2>
          </div>
          <h2 className="text-sm text-red-700">
            {business.categories[0].name}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default BusinessItem;
