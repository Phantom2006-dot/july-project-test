"use client";
import Columns from "@/components/Columns";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Rows from "@/components/Rows";
import ServicesAndCategories from "@/components/ServicesAndCategories";
import { image1, image2 } from "@/constants/images";
import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function Home() {
  const { device } = useGlobalContext();
  const products = [
    {
      title: "Iphone 16 Pro Max",
      image: image1,
      price: 850000,
      currency: "naira",
      location: "Abuja, Nigeria",
      description: "",
    },
    {
      title: "Sansung s21 ultra",
      image: image2,
      price: 300000,
      currency: "naira",
      location: "Lagos, Nigeria",
      description: "",
    },
    {
      title: "Iphone 16 Pro Max",
      image: image1,
      price: 850000,
      currency: "naira",
      location: "Abuja, Nigeria",
      description: "",
    },
    {
      title: "Sansung s21 ultra",
      image: image2,
      price: 300000,
      currency: "naira",
      location: "Lagos, Nigeria",
      description: "",
    },
    {
      title: "Iphone 16 Pro Max",
      image: image1,
      price: 850000,
      currency: "naira",
      location: "Abuja, Nigeria",
      description: "",
    },
    {
      title: "Sansung s21 ultra",
      image: image2,
      price: 300000,
      currency: "naira",
      location: "Lagos, Nigeria",
      description: "",
    },
    {
      title: "Iphone 16 Pro Max",
      image: image1,
      price: 850000,
      currency: "naira",
      location: "Abuja, Nigeria",
      description: "",
    },
    {
      title: "Sansung s21 ultra",
      image: image2,
      price: 300000,
      currency: "naira",
      location: "Lagos, Nigeria",
      description: "",
    },
    {
      title: "Iphone 16 Pro Max",
      image: image1,
      price: 850000,
      currency: "naira",
      location: "Abuja, Nigeria",
      description: "",
    },
    {
      title: "Sansung s21 ultra",
      image: image2,
      price: 300000,
      currency: "naira",
      location: "Lagos, Nigeria",
      description: "",
    },
  ];
  return (
    <div className="relative h-full overflow-auto">
      <Nav />

      <div
        className={`w-full overflow-auto flex flex-col gap-5 px-5 bg-gray-100 py-7 pb-[10.5dvh] ${
          device === "desktop" && "px-20 py-10"
        }`}
      >
        <Hero device={device} />
        <ServicesAndCategories device={device} />
        <Rows title={"Hot Picks"} items={products} />
        <Columns
          title={"Hot Picks"}
          items={[...products, ...products, ...products]}
        />
      </div>
    </div>
  );
}
