import Image from "next/image";
import Preheader from "./Components/Preheader";
import Navbar from "./Components/Navbar";
import SliderDemo from "./Components/Swiper"
import BlogFront from "./Components/BlogFront";
import TopNews from "./Components/TopNews";
import Advert from "./Components/Advert";
import AllCategories from "./Components/AllCategories";
import Footer from "./Components/Footer";
import BackToTop from "./Components/BackToTop";
import Prefooter from "./Components/Prefooter";

export default function Home() {
  return (
  <>
    <Preheader/>
    <Navbar />
    <SliderDemo/>
    <BlogFront />
    <TopNews />
    <Advert />
    <AllCategories />
    <Prefooter />
    <Footer />
    <BackToTop/>
  </>
  );
}
