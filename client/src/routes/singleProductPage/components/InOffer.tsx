const InOffer = ({ offers }: { offers: string[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">W ofercie</h3>
      <ul className="list-disc">
        {offers.map((feature, index) => {
          return <li key={index}>{feature}</li>;
        })}
      </ul>
    </div>
  );
};
export default InOffer;
