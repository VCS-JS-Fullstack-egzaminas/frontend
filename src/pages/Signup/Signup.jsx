import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  const { user, signUp } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);

    try {
      const response = await signUp(email, username, password);
      console.log(response.data);

      if (response.status === 200) {
        navigate("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data) {
        if (error.response.data.error.toLowerCase().includes("password")) {
          setPasswordError(error.response.data.error);
        }

        if (error.response.data.error.toLowerCase().includes("email")) {
          setEmailError(error.response.data.error);
        }

        if (error.response.data.error.toLowerCase().includes("username")) {
          setUsernameError(error.response.data.error);
        }
      }
    }
  };

  return (
    <Card>
      <div className="grid gap-4 min-w-80">
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <h1 className="font-bold text-3xl">Sign up</h1>
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
                autocomplete="email"
              />
              {emailError && (
                <p className="ml-2 mt-1 text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="grid">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {usernameError && (
                <p className="ml-2 mt-1 text-red-500 text-sm">
                  {usernameError}
                </p>
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
              <ul className="list-disc list-inside mt-2 text-xs text-river-bed-800">
                <li>Has to be at least 5 characters long</li>
                <li>Has to have at least one numerical character</li>
                <li>Has to have at least one uppercase letter</li>
              </ul>
            </div>
            <Button type="submit">Sign up</Button>
          </div>
        </form>
        <div>
          <p className="text-sm text-center text-river-bed-800">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-ecstasy-500 font-semibold underline hover:text-ecstasy-600 transition duration-150"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Signup;
