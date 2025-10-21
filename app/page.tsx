import Image from "next/image";
import Preheader from "./Components/Preheader";
import Navbar from "./Components/Navbar";
import SliderDemo from "./Components/Swiper"
import BlogFront from "./Components/BlogFront";
import TopNews from "./Components/TopNews";
import Advert from "./Components/Advert";

export default function Home() {
  return (
  <>
    <Preheader/>
    <Navbar />
    <SliderDemo/>
    <BlogFront />
    <TopNews />
    <Advert />
  </>
  );
}
