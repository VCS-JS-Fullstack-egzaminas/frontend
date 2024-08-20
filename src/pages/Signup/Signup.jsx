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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const { user, signUp } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsFormValid(false);
    } else if (!regex.test(password)) {
      setError(
        "Password must be at least 5 characters long, contain at least one uppercase letter and one number"
      );
      setIsFormValid(false);
    } else {
      setError("");
      setIsFormValid(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      signUp(email, username, password);
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
              />
            </div>
            <div className="grid">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <ul className="list-disc list-inside mt-2 text-xs text-river-bed-800">
                <li>Has to be at least 5 characters long</li>
                <li>Has to have at least one numerical character</li>
                <li>Has to have at least one uppercase letter</li>
              </ul>
            </div>
            <div className="grid">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={!isFormValid}>
              Sign up
            </Button>
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
