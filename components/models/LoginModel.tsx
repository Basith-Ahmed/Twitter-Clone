import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";

export default function LoginModel() {
  const loginModel = useLoginModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); //change the button style

      //ADD LOGIN

      loginModel.onClose()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); //eventually put it to false
    }
  }, [loginModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
      placeholder="Email"
      onChange={(event) => setEmail(event.target.value)}
      value={email}
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
    isOpen={loginModel.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModel.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />
  );
}
