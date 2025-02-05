"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const showcase = [
  {
    id: 1,
    img: "/images/ai1.webp",
  },
  {
    id: 2,
    img: "/images/ai2.webp",
  },
  {
    id: 3,
    img: "/images/ai3.webp",
  },
  {
    id: 4,
    img: "/images/ai4.webp",
  },
  {
    id: 5,
    img: "/images/ai2.webp",
  },
  {
    id: 6,
    img: "/images/ai1.webp",
  },
  {
    id: 7,
    img: "/images/ai2.webp",
  },
  {
    id: 8,
    img: "/images/ai3.webp",
  },
  {
    id: 9,
    img: "/images/ai4.webp",
  },
  {
    id: 10,
    img: "/images/ai2.webp",
  },
];

const ShowCase = () => {
  return (
    <section className="absolute top-[50%] right-0 left-0">
      <>
        <div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={35}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 800 }}
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
                spaceBetween: 25,
              },
            }}
          >
            {showcase?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="  rounded-md p-2 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative">
                    <div className="relative mx-auto aspect-square rounded-md ">
                      <Image
                        src={item.img}
                        alt="Image"
                        fill
                        className="mx-auto h-full w-full rounded-md object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </section>
  );
};

export default ShowCase;
