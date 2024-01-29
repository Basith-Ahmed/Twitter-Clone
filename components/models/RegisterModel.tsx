import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function RegisterModel() {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); //change the button style

      await axios.post("/api/register", {
        //we call the pages/api/register file and pass these info into it
        email,
        password,
        username,
        name,
      });

      toast.success("Account created");

      signIn("credentials", {
        email,
        password,
      });

      registerModel.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); //eventually put it to false
    }
  }, [registerModel, email, password, username, name]);

  const onToggle = useCallback(async () => {
    if (isLoading) {
      return;
    }
    registerModel.onClose(); //close the reg tab
    loginModel.onOpen(); //open the login tab
  }, [isLoading, registerModel, loginModel]); //dependancy array, all the things that are in this callback should be declared in this first

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-1.5"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
