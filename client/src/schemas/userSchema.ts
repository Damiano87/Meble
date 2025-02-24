import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, {
    message: "Imię musi się składać minimum z 2 znaków.",
  }),
  lastName: z
    .string()
    .min(2, { message: "Nazwisko musi się składać minimum z 2 znaków." }),
  email: z.string().email("Adres email jest niepoprawny."),
  email2: z.string().email("Adres email jest niepoprawny."),
  street: z
    .string()
    .min(2, { message: "Ulica musi się składać minimum z 2 znaków." }),
  apartmentNr: z.string().min(1, {
    message: "Numer mieszkania musi się składać minimum z 1 znaku.",
  }),
  company: z.string().optional(),
  NIP: z.string().optional(),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, {
    message: "Kod pocztowy musi być w formacie XX-XXX.",
  }),
  country: z.string(),
  city: z
    .string()
    .min(2, { message: "Miasto musi się składać minimum z 2 znaków." }),
  phone: z
    .string()
    .regex(/^\d{9}$/, { message: "Numer telefonu musi się składać z 9 cyfr." }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
