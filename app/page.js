import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Header from "./(components)/Header";
import CategoryList from "./(components)/CategoryList";
import BusinessList from "./(components)/BusinessList";

export default function Home() {
  return (
    <div>
      <CategoryList />

      <BusinessList />
    </div>
  );
}
