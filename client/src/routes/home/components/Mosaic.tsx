const Mosaic = () => {
  return (
    <section className=" pt-44">
      <div className="max-w-5xl md:h-[25rem] grid md:grid-cols-[2fr,1fr,1fr] gap-4 mx-5 lg:mx-auto">
        <div className="overflow-hidden h-[300px] md:h-full relative row-span-2">
          <picture>
            <source srcSet="/images/other/cozyroom.webp" type="image/webp" />
            <img
              src="/images/other/cozyroom.jpeg"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw"
              className="object-cover hover:brightness-75 duration-500 w-full h-full"
              alt="Cozy room interior"
            />
          </picture>
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Wygoda
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full row-span-2 relative">
          <picture>
            <source srcSet="/images/other/livingroom.webp" type="image/webp" />
            <img
              src="/images/other/livingroom.jpg"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw"
              className="object-cover hover:brightness-75 duration-500 w-full h-full"
              alt="Living room"
            />
          </picture>
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Salon
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full relative">
          <picture>
            <source srcSet="/images/other/bedroom.webp" type="image/webp" />
            <img
              src="/images/other/bedroom.jpg"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw"
              className="object-cover hover:brightness-75 duration-500 w-full h-full"
              alt="Bedroom"
            />
          </picture>
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Sypialnia
          </h3>
        </div>
        <div className="overflow-hidden h-[300px] md:h-full relative">
          <picture>
            <source srcSet="/images/other/kitchen.webp" type="image/webp" />
            <img
              src="/images/other/kitchen.jpg"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw"
              className="object-cover hover:brightness-75 duration-500 w-full h-full"
              alt="Kitchen"
            />
          </picture>
          <h3 className="text-white text-[2rem] font-semibold absolute bottom-1 left-3">
            Kuchnia
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Mosaic;
