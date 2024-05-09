import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Item({ item }: { item: ItemType }) {
  return (
    <div className="item border-2 flex flex-col justify-around">
      <h1>{item.title}</h1>
      <img src={item.image} className="w-[200px]" />
      <span>{item.price}</span>
      {/* <p>{item.description}</p> */}
    </div>
  );
}
export default function Catalogue() {
  const [products, setProducts] = useState<ItemType[]>([]);

  async function getProducts(): Promise<void> {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      const items = await response.json();
      setProducts(items);
    } catch (e) {
      console.trace(e);
    }
  }
  useEffect(() => getProducts, [products]);
  return (
    <div className="items  grid grid-cols-5">
      {products.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
}
