import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

export default function useFollow(userId: string) {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModel = useLoginModel();

  const isFollowing = useMemo(() => {
    //check if already following
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { params: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModel,
  ]);

  return { isFollowing, toggleFollow };
}
