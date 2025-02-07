"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/card";
import Servers from "@/components/serverpage";

export default function Home() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "section1", label: "home" },
    { id: "section2", label: "About" },
    { id: "section3", label: "Discord" },
    { id: "section4", label: "Servers" },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      let index = Math.round(scrollPosition / sectionHeight);
      index = Math.max(0, Math.min(index, sections.length - 1)); // Clamp index
      setActiveIndex(index);
      console.log("Scroll position:", scrollPosition, "Active index:", index);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      console.log("Event listener added");
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        console.log("Event listener removed");
      };
    }
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index].id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const backgroundImages = [
    "/cavern.png",
    "/reactor.png",
    "/mountain_house.png",
    "village_sunset.png",
  ];

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container snap-mandatory h-screen overflow-y-scroll"
    >
      <i
        className="Icon absolute bg-[#353535] p-2 text-[32px] hover:scale-[1.2] hover:bg-[#4b4b4b] rounded-[50%] bottom-[40px] right-[40] btn"
        onClick={() => scrollToSection(0)}
      >
        arrow_upward
      </i>
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={`/screenshots/${image}`}
          className={`w-screen h-screen z-[-1] absolute transition-opacity blur-md duration-500 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pagination">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          ></div>
        ))}
      </div>
      <section
        id="section1"
        className="w-screen h-16 bg-transparent p-8 text-white mt-8 flex items-center snap-start"
      >
        <section>
          <h1 className="text-3xl">VoyagersGuild</h1>
        </section>
      </section>
      <section className="w-screen h-[500px] mt-[20vh] center gap-[10px] px-24">
        <Card
          className="w-1/3 h-full btn hover:scale-[1.1] hover:translate-y-[20px] text-[54px] font-bold center"
          onClick={() => {
            scrollToSection(3);
          }}
        >
          Servers
        </Card>
        <Card className="w-1/3 h-full btn hover:scale-[1.1] hover:translate-y-[20px] text-[54px] font-bold center">
          Files
        </Card>
        <Card
          className="w-1/3 h-full btn text-[54px] font-bold hover:scale-[1.1] hover:translate-y-[20px]  center"
          onClick={() => router.push("/store")}
        >
          Store
        </Card>
      </section>
      <section
        id="section2"
        className="w-screen h-screen center px-24 mt-[25vh] snap-start"
      >
        <Card className="w-full h-96 text-white p-4 ">
          <h1 className="text-3xl">About</h1>
          <br />
          <p>
            Voyagers Guild is a community of like-minded individuals who enjoy
            playing games together. We have a variety of modded minecraft
            servers for different games and we're always looking to expand.
          </p>
        </Card>
      </section>
      <section
        id="section3"
        className="w-screen h-screen center px-24 gap-[10%] mt-[25vh] snap-start"
      >
        <div className="w-[350px] h-[500px] text-white rounded-lg bg-[#1E1F22]">
          <h1 className="p-5 bg-[#5865F2] rounded-t-lg">
            <img
              className="h-[34px] btn hover:opacity-[0.8]"
              src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6257d23c5fb25be7e0b6e220_Open%20Source%20Projects%20_%20Discord-7.svg"
            />
          </h1>
          <p className="p-4">Join us on discord!</p>
        </div>
        <iframe
          src="https://discordapp.com/widget?id=1324732910854475776&theme=dark"
          width="350"
          height="500"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </section>
      <section
        id="section4"
        className="w-screen h-screen center px-24 mt-[25vh] snap-start"
      >
        <Servers />
      </section>
    </div>
  );
}