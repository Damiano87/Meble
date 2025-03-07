import { createUsersApi } from "@/api/users/usersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateUserDelivery = () => {
  const axiosPrivate = useAxiosPrivate();
  const { updateUserInfoForDeliveryApi } = createUsersApi(axiosPrivate);
  const { mutate: updateUserInfoForDelivery, isPending } = useMutation({
    mutationFn: updateUserInfoForDeliveryApi,
    onSuccess: () => {
      toast.success("Twoje dane zostały zmienione");
    },
    onError: () => {
      toast.error("Coś poszło nie tak");
    },
  });

  return { updateUserInfoForDelivery, isPending };
};
