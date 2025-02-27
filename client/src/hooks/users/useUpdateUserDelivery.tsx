import { createUsersApi } from "@/api/users/usersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserDelivery = () => {
  const axiosPrivate = useAxiosPrivate();
  const { updateUserInfoForDeliveryApi } = createUsersApi(axiosPrivate);
  const { mutate: updateUserInfoForDelivery, isPending } = useMutation({
    mutationFn: updateUserInfoForDeliveryApi,
  });

  return { updateUserInfoForDelivery, isPending };
};
