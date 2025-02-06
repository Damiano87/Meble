const Summary = () => {
  return (
    <div className="pr-5 py-8 border-b-2">
      <div className="flex justify-between">
        <h4>Koszt transportu</h4>
        <span className="text-red-900">Gratis</span>
      </div>
      <div className="flex justify-between">
        <h4>Kwota częściowa</h4>
        <span>639,-</span>
      </div>
      <div className="flex justify-between">
        <h4 className="font-semibold">Kwota całkowita</h4>
        <span className="font-semibold">639,-</span>
      </div>
    </div>
  );
};
export default Summary;
