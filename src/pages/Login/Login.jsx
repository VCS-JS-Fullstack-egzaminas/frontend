import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useState } from "react";
import { login } from "../../services/userService";
import Logo from "../../components/Logos/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex justify-center min-h-screen">
      <div className="flex flex-col gap-8 items-center justify-center min-h-screen sm:px-12 pb-[84px]">
        <Link to="/">
          <Logo color={"dark"} className="w-48 h-24" />
        </Link>
        <div className="flex justify-center items-center">
          <Card>
            <div className="grid gap-4 min-w-80">
              <h1 className="font-bold text-3xl">Log in</h1>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Log in</Button>
                </div>
              </form>
              <div>
                <p className="text-sm text-center text-river-bed-800">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-ecstasy-500 font-semibold underline hover:text-ecstasy-600 transition duration-150"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="h-full overflow-hidden w-full hidden sm:block">
        <img
          className="max-h-screen min-h-screen w-full object-cover"
          src="/auth-bg.jpg"
          alt="Road"
        />
      </div>
    </div>
  );
};

export default Login;
