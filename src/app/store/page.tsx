"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/card";
const StorePage = () => {
  const router = useRouter();
  const backgroundImages = [
    "vault_lab.png",
    "tentacle.png",
    "spawn.png",
    "underground_base.png",
  ];

  const GenerateRandomIndex = (): number => {
    return Math.floor(Math.random() * backgroundImages.length);
  };

  const [activeIndex, setActiveIndex] = useState(GenerateRandomIndex());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(GenerateRandomIndex());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={`/screenshots/${image}`}
          className={`w-screen h-screen z-[-1] absolute transition-opacity blur-md duration-500 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <h1
        className="p-4 text-3xl btn btn_home w-80"
        onClick={() => {
          router.push("/");
        }}
      >
        Store Page
      </h1>
      <div className="store-items grid grid-cols-1 p-16 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold">Stowaway</h2>
          <ul>
            <li>Claimchunks: +100</li>
            <li>Chunkload chunks: +1</li>
            <li>[Stowaway] prefix</li>
            <li>Perks from Legend and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold">Mate</h2>
          <ul>
            <li>Claimchunks: +100</li>
            <li>Chunkload chunks: +1</li>
            <li>[Mate] prefix</li>
            <li>Perks from Stowaway and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold">Quartermaster</h2>
          <ul>
            <li>Claimchunks: +100</li>
            <li>Chunkload chunks: +1</li>
            <li>[Quartermaster] prefix</li>
            <li>Perks from Mate and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold">Powder Monkey</h2>
          <ul>
            <li>Claimchunks: +100</li>
            <li>Chunkload chunks: +1</li>
            <li>[Powder Monkey] prefix</li>
            <li>Perks from Quartermaster and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold">Sea Captain</h2>
          <ul>
            <li>Claimchunks: +100</li>
            <li>Chunkload chunks: +1</li>
            <li>[Sea Captain] prefix</li>
            <li>Perks from Powder Monkey and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;
