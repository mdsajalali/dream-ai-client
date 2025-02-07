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
    <section>
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{ delay: 0, reverseDirection: true }}
          speed={3500}
          navigation={{ prevEl: ".aiNext", nextEl: ".aiPrev" }}
        >
          {showcase?.map((item) => (
            <SwiperSlide key={item.id} className="sliderImageWrapper">
              <div
                className={`rounded-md p-2 shadow-sm transition-shadow hover:shadow-md ${
                  item.id % 2 == 0 ? "translate-y-10" : ""
                }`}
              >
                <div className="relative">
                  <div className="relative mx-auto aspect-[3/4] rounded-md">
                    <Image
                      src={item.img}
                      alt="Image"
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ShowCase;
