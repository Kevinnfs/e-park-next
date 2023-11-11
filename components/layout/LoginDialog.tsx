import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface LoginProps {
  open: boolean;
  toggleOpen: () => void;
}

export default function LoginDialog({ open, toggleOpen }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const id = toast.loading("Logging in...", {
      position: toast.POSITION.TOP_CENTER,
    });

    const resp: any = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: false,
    });
    setLoading(false);
    if (resp.ok) {
      toast.update(id, {
        render: "Logged in!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      toggleOpen();
      return;
    }
    toast.update(id, {
      render: "Your credential info is not match.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={toggleOpen}
        className="bg-transparent shadow-none"
      >
        <div>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="grid mb-4 h-28 place-items-center"
            >
              <div>
                <Typography variant="h3" color="white">
                  Login
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                crossOrigin={""}
                label="Email"
                size="lg"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                crossOrigin={""}
                label="Password"
                size="lg"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <div className="ml-auto">
                <Link href="/forgotPassword">
                  <div>
                    <Typography variant="small" color="blue" className="ml-1 ">
                      Forgot Password ?
                    </Typography>
                  </div>
                </Link>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={login} fullWidth>
                Login
              </Button>
              <Link href="/register">
                <Typography
                  variant="small"
                  className="flex justify-center mt-6"
                >
                  Don&apos;t have an account?
                  <div>
                    <Typography
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Sign up
                    </Typography>
                  </div>
                </Typography>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
}
