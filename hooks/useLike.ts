import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";

export default function useLike({
  postId,
  userId
}: {
  postId: string,
  userId?: string
}) {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId); //userId: the userId of the profile page we are in 

  const loginModel = useLoginModel();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    console.log('list:', list);
    console.log('currentUser:', currentUser?.id); //currentUser.Id: our userId
    console.log('includes:', list.includes(currentUser?.id))

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    try {
      let request;
      if (hasLiked) {
        console.log('Unliked')
        request = () => axios.delete("/api/like", { params: { postId } });
      } else {
        console.log('liked')
        request = () => axios.post('/api/like', { postId }); //if not in the list then add the id into the list
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success(hasLiked ? "Unliked" : "Liked");
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

// For those who had issues with the unfollow functionality, you need to change how the DELETE method is sent in the hook. It should be passed as a parameter like this:

// request = () => axios.delete('/api/follow', { params: { userId } });

// In the API, it should be noted that when it's not a POST (follow) request, use req.query instead of req.body because Axios treats DELETE and POST differently. This results in:

// const userId = req.method === 'POST' ? req.body.userId : req.query.userId;