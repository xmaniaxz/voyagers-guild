"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/card";
import SlidingMenu from "@/components/sidemenu";

const StorePage = () => {
  const router = useRouter();
  const backgroundImages = [
    "vault_lab.png",
    "tentacle.png",
    "spawn.png",
    "underground_base.png",
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cartItems, setCartItems] = useState<{ price: number; item: string }[]>(
    []
  );

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems.length]);

  const handleAddToCart = (price: number, item: string) => {
    setCartItems([...cartItems, { price: price, item: item }]);
  };

  const handleRemoveFromCart = (item: string) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((cartItem) => cartItem.item === item);
    if (index !== -1) {
      newCartItems.splice(index, 1);
    }
    setCartItems(newCartItems);

  };
  //#region Background image generation

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
  //#endregion
  return (
    <div className="text-white relative">
      <div className="btn_shopping" onClick={() => setIsMenuOpen(true)}>
        <div id="counter" className="shopping_counter">
          {cartItems.length || 0}
        </div>
        <i className="Icon">shopping_cart</i>
      </div>

      <SlidingMenu
        isMenuOpen={isMenuOpen}
        className="z-10 bg-black"
        height="100vh"
        position="right"
        width="20vw"
      >
        <div className="flex items-center text-[24px] space-x-2">
          <button
            className="Icon text-[32px] btn hover:text-[red]"
            onClick={() => setIsMenuOpen(false)}
          >
            close
          </button>
          <p>Cart</p>
        </div>
        <hr />

        <div className="flex flex-col items-center justify-center">
          <ul className="mt-5">
            {cartItems
              .reduce((acc, item) => {
                const existingItem = acc.find((i) => i.item === item.item);
                if (existingItem) {
                  existingItem.quantity += 1;
                } else {
                  acc.push({ ...item, quantity: 1 });
                }
                return acc;
              }, [] as { price: number; item: string; quantity: number }[])
              .map((item, index) => (
                <li key={index} className="text-[20px]">
                  {item.quantity}x {item.item} - ${item.price} X {item.quantity}{" "}
                  = ${item.price * item.quantity}
                  <button
                    className="ml-2"
                    onClick={() => handleAddToCart(item.price, item.item)}
                  >
                    +
                  </button>
                  <button
                    className="ml-2"
                    onClick={() => handleRemoveFromCart(item.item)}
                  >
                    -
                  </button>
                </li>
              ))}
              <br />
              <hr />
              <br />
              <p className="text-xl">Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-green-700 transition duration-300">Checkout</button>
          </ul>
        </div>
      </SlidingMenu>
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={`/screenshots/${image}`}
          className={`w-screen h-screen absolute z-[-2] transition-opacity blur-md duration-500 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <h1
        className="p-4 text-3xl btn btn_home w-72"
        onClick={() => {
          router.push("/");
        }}
      >
        Store Page
      </h1>
      <div className="grid relative grid-cols-1 p-16 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 ">
          <h2 className="text-xl  font-bold">Commander</h2>
          <ul>
            <li>Claimchunks: 350</li>
            <li>Chunkload chunks: 10</li>
            <li>
              <span className="text-[#bfffde]">[Commander]</span> prefix
            </li>
            <li>Perks from Officer and below</li>
          </ul>
          <p>Price: $5.00</p>
          <button
            className="mt-2 px-4 btn py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
              handleAddToCart(5.0, "Commander");
            }}
          >
            Add to cart
          </button>
        </Card>
        <Card className="p-4 ">
          <h2 className="text-xl font-bold">Lieutenant</h2>
          <ul>
            <li>Claimchunks: 400</li>
            <li>Chunkload chunks: 15</li>
            <li>
              <span className="text-[#c7fdff]">[Lieutenant]</span> prefix
            </li>
            <li>Perks from Commander and below</li>
          </ul>
          <p>Price: $10.00</p>
          <button
            className="mt-2 px-4 btn py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
              handleAddToCart(10.0, "Lieutenant");
            }}
          >
            Add to cart
          </button>
        </Card>
        <Card className="p-4 ">
          <h2 className="text-xl font-bold">Commodore</h2>
          <ul>
            <li>Claimchunks: 450</li>
            <li>Chunkload chunks: 20</li>
            <li>
              <span className="text-[#abfcfe]">[Commodore]</span> prefix
            </li>
            <li>Perks from Lieutenant and below</li>
          </ul>
          <p>Price: $15.00</p>
          <button
            className="mt-2 px-4 btn py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
              handleAddToCart(15.0, "Commodore");
            }}
          >
            Add to cart
          </button>
        </Card>
        <Card className="p-4 ">
          <h2 className="text-xl font-bold">Sea Captain</h2>
          <ul>
            <li>Claimchunks: 500</li>
            <li>Chunkload chunks: 25</li>
            <li>
              <span className="text-[#c4d1fe]">[Sea Captain]</span> prefix
            </li>
            <li>Perks from Commodore and below</li>
          </ul>
          <p>Price: $20.00</p>
          <button
            className="mt-2 px-4 btn py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
              handleAddToCart(20.0, "Sea Captain");
            }}
          >
            Add to cart
          </button>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;
