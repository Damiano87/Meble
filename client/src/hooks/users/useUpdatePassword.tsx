import { createUsersApi } from "@/api/users/usersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const { updateUserPasswordApi } = createUsersApi(axiosPrivate);

  const {
    mutate: updatePassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      toast.success("Hasło zostało zaktualizowane");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Nie udało się zaktualizować hasła");
    },
  });

  return { updatePassword, isPending, isSuccess, isError };
};
