import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : null; //will check if there is a post, if yes then it will link it to it

  console.log("url:", url);

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
