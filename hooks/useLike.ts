import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";

export default function useLike({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModel = useLoginModel();

  const hasLiked = useMemo(() => {
    //whether user has already liked it or not is found by searchinng if the users id is present in the list of the people who hae liked the post
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } }); //if already liked then remove the id from the liked list hence unlike
      } else {
        request = () => axios.post("/api/like", { postId }); //if not in the list then add the id into the list
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [
    currentUser,
    hasLiked,
    loginModel,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
}
