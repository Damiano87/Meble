import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { useWishlist } from "@/hooks/wishlist/useWishList";
import { MoonLoader } from "react-spinners";

const SendEmailForm = () => {
  const { sendWishlistToEmail, sendingToEmail, sendWishlistToEmailSuccess } =
    useWishlist();
  const { email } = useAuth();
  const [destinationEmail, setDestinationEmail] = useState("");
  const [missing, setMissing] = useState(false);

  // submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!destinationEmail) {
      setMissing(true);
      return;
    }
    sendWishlistToEmail({ email, destinationEmail });
  };

  // change input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationEmail(e.target.value);
    setMissing(false);
  };

  if (sendWishlistToEmailSuccess) {
    return (
      <div className="mt-7">
        <Toaster />
        <p>Wysłano listę życzeń na adres {destinationEmail}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toaster />
      <div className="space-y-2 mt-10">
        <Label htmlFor="email">Podaj adres email:</Label>
        <Input
          type="email"
          id="email"
          value={destinationEmail}
          onChange={handleChange}
          className="border-black"
        />
        {missing && <p className="text-red-500">Wypełnij pole</p>}
      </div>
      <Button
        variant={"secondary"}
        disabled={sendingToEmail}
        className="w-full bg-red-900 border border-red-900 text-white hover:text-red-900 duration-500"
      >
        {sendingToEmail ? (
          <span className="flex items-center gap-3">
            <MoonLoader color="#f2ecec" size={15} />
            Wysyłanie...
          </span>
        ) : (
          "Wyślij na email"
        )}
      </Button>
    </form>
  );
};
export default SendEmailForm;
