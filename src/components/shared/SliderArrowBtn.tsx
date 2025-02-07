import { SliderArrowBtnProps } from "@/types/index.type";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const SliderArrowBtn = ({ direction, className }: SliderArrowBtnProps) => {
  return (
    <div
      className={`${className} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-cyan-500 text-2xl !text-black text-primary shadow-lg transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-12`}
    >
      {direction === "left" ? (
        <GoArrowLeft className="w-5 sm:w-6" />
      ) : (
        <GoArrowRight className="w-5 sm:w-6" />
      )}
    </div>
  );
};

export default SliderArrowBtn;
