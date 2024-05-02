import { Button, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Link } from 'react-router-dom';
import { z } from "zod";
import useLogin from "../../hooks/use_login";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const { login, error } = useLogin();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleLogin = (e) => {
    login(e);
  };

  return (
    <div className="w-fit m-auto flex flex-col gap-3 center">
      <Title ta="center">Login</Title>
      {error && <p className="text-red-700 text-center">{error.message}</p>}
      <form
        className="space-y-3 text-center"
        onSubmit={form.onSubmit(handleLogin)}
      >
        <TextInput
          placeholder="Email"
          type="email"
          {...form.getInputProps("email")}
        />
        <br />
        <TextInput
          placeholder="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <br />
        <Button fullWidth type="submit">
          Sign In
        </Button>
      </form>
      <div className="text-center">
        <Link to="/sign_up">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
