import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, logIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    logIn(email, password);
  };

  return (
    <Card>
      <Helmet>
        <title>Login</title>
      </Helmet>
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
              to="/auth/signup"
              className="text-ecstasy-500 font-semibold underline hover:text-ecstasy-600 transition duration-150"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Login;
