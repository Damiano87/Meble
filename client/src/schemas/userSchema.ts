import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Imię musi się składać minimum z 2 znaków.",
    })
    .transform((val) => val.toLowerCase()),
  lastName: z
    .string()
    .min(2, { message: "Nazwisko musi się składać minimum z 2 znaków." })
    .transform((val) => val.toLowerCase()),
  email: z
    .string()
    .email("Adres email jest niepoprawny.")
    .transform((val) => val.toLowerCase()),
  street: z
    .string()
    .min(2, { message: "Ulica musi się składać minimum z 2 znaków." })
    .transform((val) => val.toLowerCase()),
  apartmentNr: z.string().min(1, {
    message: "Numer mieszkania musi się składać minimum z 1 znaku.",
  }),
  company: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase()),
  NIP: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase()),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, {
    message: "Kod pocztowy musi być w formacie XX-XXX.",
  }),
  country: z.string().transform((val) => val.toLowerCase()),
  city: z
    .string()
    .min(2, { message: "Miasto musi się składać minimum z 2 znaków." })
    .transform((val) => val.toLowerCase()),
  phone: z
    .string()
    .regex(/^\d{9}$/, { message: "Numer telefonu musi się składać z 9 cyfr." }),
  phone2: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return /^\d{9}$/.test(val);
      },
      { message: "Numer telefonu musi się składać z 9 cyfr." }
    ),
});

export type UserSchemaType = z.infer<typeof userSchema>;
