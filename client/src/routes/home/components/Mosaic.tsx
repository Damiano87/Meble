import cozyroom from "/images/other/cozyroom.jpeg";
import kitchen from "/images/other/kitchen.jpg";
import livingroom from "/images/other/livingroom.jpg";
import bedroom from "/images/other/bedroom.jpg";

const Mosaic = () => {
  return (
    <section className=" pt-44">
      <div className="max-w-5xl md:h-[25rem] grid md:grid-cols-[2fr,1fr,1fr] gap-4 mx-5 lg:mx-auto">
        <div className="overflow-hidden h-[300px] md:h-full relative row-span-2">
          <img
            src={cozyroom}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw"
            className="object-cover hover:brightness-75 duration-500 w-full h-full"
            alt="cozyroom"
          />
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Wygoda
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full row-span-2 relative">
          <img
            src={livingroom}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw"
            className="object-cover hover:brightness-75 duration-500 h-full w-full"
            alt="livingroom"
          />
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Salon
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full relative">
          <img
            src={bedroom}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw"
            className="hover:brightness-75 duration-500"
            alt="bedroom"
          />
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Sypialnia
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full relative">
          <img
            src={kitchen}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw"
            className="hover:brightness-75 duration-500 h-full w-full"
            alt="kitchen"
          />
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Kuchnia
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Mosaic;
