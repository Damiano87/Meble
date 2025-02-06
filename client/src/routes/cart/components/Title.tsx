const Title = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Koszyk</h1>
      <div className="text-lg font-semibold mb-4 flex justify-between">
        <h3 className="">W Twoim koszyku znajdują się następujące artykuły:</h3>
        <h3 className="hidden md:block mr-5">Cena</h3>
      </div>
    </div>
  );
};
export default Title;
