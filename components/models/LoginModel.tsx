import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import { signIn } from "next-auth/react";

export default function LoginModel() {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); //change the button style

      await signIn('credentials', {
        email,
        password
      })

      loginModel.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); //eventually put it to false
    }
  }, [loginModel, email, password]);

  const onToggle = useCallback(async () => {
    if (isLoading) {
      return;
    }
    loginModel.onClose(); //open the login tab
    registerModel.onOpen(); //close the reg tab
  }, [isLoading, registerModel, loginModel]);

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
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        New to Twitter?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-1.5"
        >
          Register
        </span>
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
