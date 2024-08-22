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
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const { user, logIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    try {
      const response = await logIn(email, password);

      if (response.status === 200) {
        navigate("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.error.toLowerCase().includes("password")) {
          setPasswordError(error.response.data.error);
        }

        if (error.response.data.error.toLowerCase().includes("email")) {
          setEmailError(error.response.data.error);
        }
      }
    }
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
                required
              />
              {emailError && (
                <p className="ml-2 mt-1 text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="grid">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="ml-2 mt-1 text-red-500 text-sm">
                  {passwordError}
                </p>
              )}
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
