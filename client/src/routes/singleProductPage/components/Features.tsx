const Features = ({ features }: { features: string[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Cechy produktu</h3>
      <ul className="list-disc">
        {features.map((feature, index) => {
          return <li key={index}>{feature}</li>;
        })}
      </ul>
    </div>
  );
};
export default Features;
