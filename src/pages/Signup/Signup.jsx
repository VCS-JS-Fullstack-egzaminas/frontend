import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { MdiCar } from "../../components/ui/icons/MdiCar";
import { useState } from "react";
import { signup } from "../../services/userService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup({ email, username, password });

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
          <div className="flex items-center gap-1">
            <MdiCar className="h-20 w-20 text-river-bed-800" />
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold leading-none text-ecstasy-500">
              VSC
              </span>
              <span className="text-4xl text-river-bed-800 leading-none">
                rentals
              </span>
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center">
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
                  </div>
                  <Button type="submit">Sign up</Button>
                </div>
              </form>
              <div>
                <p className="text-sm text-center text-river-bed-800">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-ecstasy-500 font-semibold underline hover:text-ecstasy-600 transition duration-150"
                  >
                    Log in
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

export default Signup;
