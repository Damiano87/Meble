import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/users/useGetUser";
import { User } from "@/utils/types";
import { Link } from "react-router";

const ShippingAddress = () => {
  const user = useGetUser();
  console.log(user);

  if (!user) {
    return null;
  }

  const {
    username,
    lastName,
    city,
    country,
    postalCode,
    street,
    phoneNumbers,
    apartmentNr,
  } = user as User;
  return (
    <div className="flex-1">
      <h2 className="text-[1.3rem] font-semibold mb-2">Dane dostawy</h2>
      <div className="flex flex-col">
        <span>
          <span className="capitalize">{username} </span>
          <span className="capitalize">{lastName}</span>
        </span>
        <span className="capitalize">{country}</span>

        <span className="capitalize">{city} </span>

        <span>{postalCode}</span>
        <span>
          <span className="capitalize">{street} </span>
          <span>{apartmentNr}</span>
        </span>
        <div className="flex gap-2">
          <span>tel:</span>
          <div className="flex flex-col">
            {phoneNumbers.map((number, index) => {
              return <span key={index}>+{number}</span>;
            })}
          </div>
        </div>
      </div>
      <Button
        variant={"secondary"}
        className="bg-red-900 text-white hover:text-red-900 border border-red-900 mt-4"
        asChild
      >
        <Link to={"/shipping-address-form"}>Edytuj</Link>
      </Button>
    </div>
  );
};
export default ShippingAddress;
