import { useCallback, useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";
import Model from "../Model";

export default function EditModel() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModel = useEditModel();

  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();
      toast.success("Updated");
      editModel.onClose()
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [bio, name, username, profileImage, coverImage, editModel, mutateFetchedUser]);
  return (
    <Model 
    disabled={isLoading}
    isOpen={editModel.isOpen}
    title="Edit your profile"
    actionLabel="Save"
    onClose={editModel.onClose}
    onSubmit={onSubmit}
    />
  );
}
