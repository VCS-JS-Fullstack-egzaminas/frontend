import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUp } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp(email, username, password);
  };

  return (
    <Card>
      <div className="grid gap-4 min-w-80">
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
