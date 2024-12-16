import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

type ImagesProps = {
  name: string;
  images: string[];
};

const Images = ({ name, images }: ImagesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
  });

  const handlePrevious = () => {
    setImgIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setImgIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleMiniatureClick = (index: number) => {
    setImgIndex(index);
    api?.scrollTo(index);
  };

  return (
    <div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          duration: 15,
        }}
        className="relative flex h-[15rem] w-[15rem] mx-auto mb-10"
      >
        <CarouselContent className="w-full h-full ml-0">
          {images?.map((image, index) => {
            return (
              <CarouselItem key={index} className="w-full h-full p-0">
                <img
                  src={image}
                  className="object-contain w-full h-full"
                  alt={name}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          onClickCapture={handlePrevious}
          className={`${
            imgIndex === 0 && "hidden"
          } left-3 md:-left-14 bg-black text-white h-6 w-6 md:h-9 md:w-9 bg-opacity-35`}
        />
        <CarouselNext
          onClickCapture={handleNext}
          className={`${
            imgIndex === images.length - 1 && "hidden"
          } right-3 md:-right-14 bg-black text-white h-6 w-6 md:h-9 md:w-9 bg-opacity-35`}
        />
      </Carousel>
      <div className="bg-gray-200 px-2 w-fit mb-3 mx-auto">
        <span>{imgIndex + 1}</span> / <span>{images.length}</span>
      </div>
      <div className="flex justify-evenly items-center max-w-[25rem] mx-auto">
        {images?.map((image, index) => {
          return (
            <div
              key={index}
              className={`${
                imgIndex === index
                  ? "border-2 border-yellow-600 shadow-md"
                  : null
              } relative h-[5rem] w-[5rem] p-1 max-w-52 cursor-pointer`}
              onClick={() => handleMiniatureClick(index)}
            >
              <img
                src={image}
                className="object-contain w-full h-full"
                alt={name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Images;
