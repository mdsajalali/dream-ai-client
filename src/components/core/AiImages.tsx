"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Container from "../shared/Container";
import SliderArrowBtn from "../shared/SliderArrowBtn";

const aiImages = [
  {
    id: 1,
    img: "/images/ai1.webp",
    ai_name: "One",
  },
  {
    id: 2,
    img: "/images/ai2.webp",
    ai_name: "Two",
  },
  {
    id: 3,
    img: "/images/ai3.webp",
    ai_name: "Three",
  },
  {
    id: 4,
    img: "/images/ai4.webp",
    ai_name: "Four",
  },
  {
    id: 5,
    img: "/images/ai2.webp",
    ai_name: "Five",
  },
];

const AiImages = () => {
  return (
    <section className="my-10">
      <Container>
        <div className=" flex items-center justify-between gap-2 ">
          <div>
            <p className="mb-3 font-semibold uppercase text-primary">
              Create your dream with Ai
            </p>
            <h3 className="mb-3 text-2xl font-bold leading-snug text-black lg:text-3xl xl:text-[40px]">
              AI images
            </h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-5">
            <SliderArrowBtn direction="left" className="aiNext" />
            <SliderArrowBtn direction="right" className="aiPrev" />
          </div>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{ prevEl: ".aiNext", nextEl: ".aiPrev" }}
            breakpoints={{
              350: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1170: {
                slidesPerView: 4,
              },
            }}
          >
            {aiImages?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className=" shadow-sm transition-shadow  ">
                  <div className="relative w-[290px] h-[350px]  ">
                    <Image
                      src={item.img}
                      alt={item.ai_name}
                      fill
                      className="rounded-lg w-full h-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default AiImages;
