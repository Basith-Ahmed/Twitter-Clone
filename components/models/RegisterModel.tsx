import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";

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

      //ADD LOGIN

      registerModel.onClose()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); //eventually put it to false
    }
  }, [registerModel]);

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
  )

  return (
    <Model 
    disabled={isLoading}
    isOpen={registerModel.isOpen}
    title="Create an account"
    actionLabel="Register"
    onClose={registerModel.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  );
}