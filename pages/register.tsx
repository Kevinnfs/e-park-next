/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout/Layout";
import { VerifyUrl } from "@/config/Config";
import { withCommonServerSideProps } from "@/hoc/withCommonServerSideProps";
import Api from "@/service/Api";
import { eventEmitter } from "@/service/eventEmmiter";
import { CommonProps } from "@/types/common";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
} from "@material-tailwind/react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// export const getServerSideProps = withCommonServerSideProps(
//   async (ctx: any) => {
//     const session = await getSession(ctx);
//     if (session) {
//       return {
//         redirect: { destination: "/", permanent: false },
//       };
//     }
//     return {
//       props: {},
//     };
//   }
// );

export default function Register({ categories }: CommonProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  }: any = useForm({});

  const onSubmit = async (data: any) => {
    console.log("data ================", data);
    const newData = {
      name: data.name,
      email: data.email,
      nim: data.nim,
      password: data.password,
      avatar: "",
    };
    setRegistering(true);
    const id = toast.loading("Registering your account", {
      position: toast.POSITION.TOP_CENTER,
    });
    setEmail(data.email);
    setPassword(data.password);
    try {
      const api = new Api();
      api.url = "/auth/register";
      api.body = newData;
      const resp = await api.call();
      console.log("ini adlaah resp", api.url);
      console.log("ini adlaah resp =====", resp);
      console.log("wugduwhdiwuhdiwd", newData);
      if (resp?.meta?.code === 200) {
        reset();
        toast.update(id, {
          render: "Your account registered.",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
        setTimeout(async () => {
          await router.push("/");
          await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/",
            redirect: false,
          });
        }, 3000);
      } else {
        setRegistering(false);
        toast.update(id, {
          render: "Your account failed to register.",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (error) {
      setRegistering(false);
      toast.update(id, {
        render: "Your account failed to register.",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };
  const handleSignIn = () => {
    eventEmitter.emit("login");
  };

  return (
    <Layout title="Register - Arfaaz Collection" categories={categories}>
      <div className="flex justify-center w-full">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6 mb-4">
              {/* ===== NAME ===== */}
              <div className="relative">
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={(event) => (
                    <Input
                      crossOrigin=""
                      size="lg"
                      label="Name"
                      onChange={event.field.onChange}
                      value={event.field.value}
                    />
                  )}
                  rules={{ required: "Name field are required" }}
                />
                {errors.name && (
                  <div className="absolute top-0 flex items-center h-full right-3">
                    <Tooltip
                      className="bg-red-700"
                      content={errors.name.message}
                      placement="left"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    </Tooltip>
                  </div>
                )}
              </div>

              {/* ===== EMAIL ===== */}
              <div className="relative">
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={(event) => (
                    <Input
                      crossOrigin=""
                      size="lg"
                      label="Email"
                      onChange={event.field.onChange}
                      value={event.field.value}
                    />
                  )}
                  rules={{
                    required: "Email field are required",
                    // validate: {
                    //   isEmail: (v: string) =>
                    //     /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v) ||
                    //     "Email address must be a valid address",
                    //   isAvailable: async (v: string) => {
                    //     console.log("ini email===", v);
                    //     const api = new Api();
                    //     api.url = "auth/email/check";
                    //     api.body = { email: v };
                    //     const resp: any = await api.call();
                    //     if (resp?.data?.emailAvailable) {
                    //       return true;
                    //     }
                    //     return "This email is not available.";
                    //   },
                    // },
                  }}
                />
                {errors.email && (
                  <div className="absolute top-0 flex items-center h-full right-3">
                    <Tooltip
                      className="bg-red-700"
                      content={errors.email.message}
                      placement="left"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    </Tooltip>
                  </div>
                )}
              </div>

              {/* ===== NIM ===== */}
              <div className="relative">
                <Controller
                  control={control}
                  name="nim"
                  defaultValue=""
                  render={(event) => (
                    <Input
                      crossOrigin=""
                      size="lg"
                      label="NIM"
                      onChange={event.field.onChange}
                      value={event.field.value}
                    />
                  )}
                  rules={{
                    required: "NIM field are required",
                    // validate: {
                    //   isNim: (v: string) =>
                    //     /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v) ||
                    //     "NIM address must be a valid address",
                    //   isAvailable: async (v: string) => {
                    //     console.log("ini nim===", v);
                    //     const api = new Api();
                    //     api.url = "auth/email/check";
                    //     api.body = { email: v };
                    //     const resp: any = await api.call();
                    //     if (resp?.data?.emailAvailable) {
                    //       return true;
                    //     }
                    //     return "This email is not available.";
                    //   },
                    // },
                  }}
                />
                {errors.nim && (
                  <div className="absolute top-0 flex items-center h-full right-3">
                    <Tooltip
                      className="bg-red-700"
                      content={errors.nim.message}
                      placement="left"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    </Tooltip>
                  </div>
                )}
              </div>

              {/* ===== PW ===== */}
              <div className="relative">
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={(event) => (
                    <Input
                      crossOrigin=""
                      size="lg"
                      label="Password"
                      type="password"
                      onChange={event.field.onChange}
                      value={event.field.value}
                    />
                  )}
                  rules={{
                    required: "Password field are required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  }}
                />
                {errors.password && (
                  <div className="absolute top-0 flex items-center h-full right-3">
                    <Tooltip
                      className="bg-red-700"
                      content={errors.password.message}
                      placement="left"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className="relative">
                <Controller
                  control={control}
                  name="passwordConfirmation"
                  defaultValue=""
                  render={(event) => (
                    <Input
                      crossOrigin=""
                      size="lg"
                      label="Password Confirmation"
                      type="password"
                      onChange={event.field.onChange}
                      value={event.field.value}
                    />
                  )}
                  rules={{
                    required: "Password Confirmation field are required",
                    validate: (value) =>
                      value === watch("password") ||
                      "Password and Password Confirmation must match",
                  }}
                />

                {errors.passwordConfirmation && (
                  <div className="absolute top-0 flex items-center h-full right-3">
                    <Tooltip
                      className="bg-red-700"
                      content={errors.passwordConfirmation.message}
                      placement="left"
                    >
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
            <Checkbox
              crossOrigin=""
              defaultChecked={false}
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              // disabled={registering}
              className="mt-6"
              fullWidth
              type="submit"
            >
              Register
            </Button>
            <Typography color="gray" className="mt-4 font-normal text-center">
              Already have an account?{" "}
              <button
                onClick={() => handleSignIn()}
                className="font-medium text-gray-900"
              >
                Sign In
              </button>
            </Typography>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
