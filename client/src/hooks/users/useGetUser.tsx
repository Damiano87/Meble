import { createUsersApi } from "@/api/users/usersApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";

export const useGetUser = () => {
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { getUserApi } = createUsersApi(axiosPrivate);
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: getUserApi,
  });

  return user;
};
