import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";
import { useUpdatePassword } from "@/hooks/users/useUpdatePassword";
import { MoonLoader } from "react-spinners";

// Regex dla walidacji hasła
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordChangeForm = () => {
  // update password hook
  const { updatePassword, isPending, isSuccess, isError } = useUpdatePassword();

  // Stan formularza
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Stan walidacji
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});

  // Stan walidacji hasła
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Sprawdzenie poprawności hasła przy każdej zmianie
  useEffect(() => {
    const result = PWD_REGEX.test(formData.password);
    setIsValidPassword(result);

    // Aktualizacja błędów tylko jeśli pole było już edytowane
    if (isPasswordFocused && !result && formData.password) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Hasło musi zawierać 8-24 znaków, w tym małą i wielką literę, cyfrę oraz znak specjalny (!@#$%)",
      }));
    } else if (isPasswordFocused && result) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
      }));
    }
  }, [formData.password, isPasswordFocused]);

  // Aktualizacja stanu formularza
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    validateForm();
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Czyścimy błędy dla zgodności haseł przy zmianie
    if (id === "password" || id === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        form: undefined,
      }));
    }
  };

  // Ustawienie focusu na pole hasła
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  // Walidacja formularza
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Walidacja pustych pól
    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
      isValid = false;
    } else if (!isValidPassword) {
      newErrors.password =
        "Hasło musi zawierać 8-24 znaków, w tym małą i wielką literę, cyfrę oraz znak specjalny (!@#$%)";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Potwierdzenie hasła jest wymagane";
      isValid = false;
    }

    // Sprawdzenie czy hasła są identyczne
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.form = "Hasła nie są identyczne";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Obsługa wysłania formularza
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Logika zmiany hasła - tutaj można dodać wywołanie API
      updatePassword(formData.password);
      // Resetowanie formularza po sukcesie
      setFormData({ password: "", confirmPassword: "" });
      setIsPasswordFocused(false);
    } else {
      // Wyświetlenie ogólnego błędu formularza, jeśli istnieje
      if (errors.form) {
        toast.error(errors.form);
      }
    }
  };

  if (isError) {
    return (
      <div className="mt-10">
        <p>Nie udało się zmienić hasła. Spróbuj ponownie.</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="mt-10">
        <p>Hasło zostało zmienione.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toaster />
      <div className="space-y-2 mt-10">
        <Label htmlFor="password">Hasło</Label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handlePasswordFocus}
          className={`border-black ${
            errors.password
              ? "border-red-500"
              : isValidPassword && formData.password
              ? "border-green-500"
              : ""
          }`}
          aria-invalid={isValidPassword ? "false" : "true"}
          aria-describedby="passwordnote"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1" id="passwordnote">
            {errors.password}
          </p>
        )}
        {isPasswordFocused && formData.password && !errors.password && (
          <p className="text-green-600 text-sm mt-1">
            {isValidPassword ? "Poprawny format hasła" : ""}
          </p>
        )}
      </div>

      <div className="space-y-2 mt-10">
        <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
        <Input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`border-black ${
            errors.confirmPassword
              ? "border-red-500"
              : formData.confirmPassword &&
                formData.confirmPassword === formData.password
              ? "border-green-500"
              : ""
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
        {formData.confirmPassword &&
          formData.confirmPassword === formData.password &&
          !errors.confirmPassword && (
            <p className="text-green-600 text-sm mt-1">Hasła są zgodne</p>
          )}
      </div>
      {}
      <div className="bg-gray-100 p-3 rounded-md text-sm mb-4">
        <p className="font-medium">Hasło musi zawierać:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li
            className={
              formData.password.length >= 8 && formData.password.length <= 24
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            8-24 znaków
          </li>
          <li
            className={
              /(?=.*[a-z])/.test(formData.password)
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            Przynajmniej jedną małą literę
          </li>
          <li
            className={
              /(?=.*[A-Z])/.test(formData.password)
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            Przynajmniej jedną wielką literę
          </li>
          <li
            className={
              /(?=.*[0-9])/.test(formData.password)
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            Przynajmniej jedną cyfrę
          </li>
          <li
            className={
              /(?=.*[!@#$%])/.test(formData.password)
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            Przynajmniej jeden znak specjalny (!@#$%)
          </li>
        </ul>
      </div>

      <Button
        type="submit"
        variant="secondary"
        disabled={isPending}
        className="w-full bg-red-900 border border-red-900 text-white hover:text-red-900 duration-500"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <MoonLoader size={18} color="#fff" speedMultiplier={0.75} />
            <span>Zmieniam hasło...</span>
          </div>
        ) : (
          "Zmień hasło"
        )}
      </Button>
    </form>
  );
};

export default PasswordChangeForm;
