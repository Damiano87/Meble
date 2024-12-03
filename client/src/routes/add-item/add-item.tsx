import Details from "./components/details";
import Dimensions from "./components/dimensions";
import Features from "./components/features";
import MainInputs from "./components/mainInputs";
import MaterialDetails from "./components/materialDetails";
import Offer from "./components/offer";
import Resistance from "./components/resistance";
import AdditionalInfo from "./components/additionalInfo";
import CareTips from "./components/pielegnation";

const AddItemPage = () => {
  return (
    <main className="pt-44">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold mb-8">Add Item</h1>

        {/* main inputs */}
        <MainInputs />
        {/* details */}
        <Details />
        {/* features */}
        <Features />
        {/* demensions */}
        <Dimensions />
        {/* offer */}
        <Offer />
        {/* resistance */}
        <Resistance />
        {/* material details */}
        <MaterialDetails />
        {/* additional info */}
        <AdditionalInfo />
        {/* care tips */}
        <CareTips />
      </div>
    </main>
  );
};
export default AddItemPage;
