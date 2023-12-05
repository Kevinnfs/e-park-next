import { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Collapse,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Input,
  Card,
  CardBody,
} from "@material-tailwind/react";
import React from "react";
import Link from "next/link";
import { Footer } from "./Footer";
import { signOut, useSession } from "next-auth/react";
import LoginDialog from "./LoginDialog";

import Cart from "./Cart";
import ProfileMenu from "./ProfileMenu";
import { VerifyUrl } from "@/config/Config";
import { toast } from "react-toastify";
import { eventEmitter } from "@/service/eventEmmiter";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Api from "@/service/Api";
import { CategoryType, ProductTypeSingle } from "@/types/common";

interface NavbarProps {
  noVerificationAlert?: boolean;
  children: React.ReactNode;
  categories: CategoryType[];
  showSearchBar?: boolean;
}

export default function NavbarComponent({
  noVerificationAlert = false,
  children,
  categories = [],
  showSearchBar = false,
}: NavbarProps) {
  const { data: session, status }: any = useSession();
  const loading = status === "loading";
  const [openNav, setOpenNav] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sending, setSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<ProductTypeSingle[]>([]);
  const containerRef = useRef<any>(null);

  const toggleOpen = () => {
    setOpenLogin((prev: boolean) => !prev);
  };

  useEffect(() => {
    const handleEvent = () => {
      setOpenLogin(true);
    };

    eventEmitter.on("login", handleEvent);

    return () => {
      eventEmitter.off("login", handleEvent);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  console.log("wojaojjoaj",session);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown((prev: any) => prev - 1);
      }, 1000);
    }
  }, [countdown]);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false); // close or do whatever you want here
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {showSearchBar && (
        <div ref={containerRef} className="relative flex w-full gap-2 ">
          <Input
            type="search"
            label="Search"
            className="pr-20"
            onChange={(v: any) => setSearch(v.target.value)}
            value={search}
            onFocus={() => setIsFocused(true)}
            crossOrigin={undefined}
          />
          <MagnifyingGlassIcon className="!absolute right-2 top-2 rounded w-6 h-6 text-gray-500" />
          {isFocused && list.length > 0 && (
            <Card className="absolute left-0 top-full">
              <CardBody className="flex flex-col p-0">
                {list.map((v: ProductTypeSingle, i: number) => (
                  <Link href={`/product/${v.slug}`} key={i}>
                    <div
                      onMouseDown={(e) => e.stopPropagation()}
                      className="flex gap-4 px-2 py-4 hover:bg-gray-300"
                    >
                      <div>
                        <Image
                          src={v.stock.thumbnail}
                          height={95}
                          width={71}
                          alt={v.name}
                          className="aspect-[4/3] max-w-[95px] object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <Typography
                          variant="h3"
                          className="text-base font-bold"
                        >
                          {v.name}
                        </Typography>
                        <Typography
                          variant="paragraph"
                          className="max-w-xs text-xs font-normal line-clamp-2"
                        >
                          {v.description}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      )}
      {categories.map((v: CategoryType, i: number) => (
        <Typography
          key={i}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ whiteSpace: "nowrap" }}
        >
          <Link href={`/categories/${v.slug}`} className="flex items-center">
            {v.name}
          </Link>
        </Typography>
      ))}
      {session ? null : (
        <div className="flex flex-col gap-2">
          <Button
            onClick={toggleOpen}
            variant="gradient"
            size="sm"
            className="w-full lg:hidden"
          >
            <span>Login</span>
          </Button>
          <Link href="/register">
            <Button variant="gradient" size="sm" className="w-full lg:hidden">
              <span>Register</span>
            </Button>
          </Link>
        </div>
      )}
    </ul>
  );
  return (
    <div className="w-full">
      {/* <Dialog
        size="xs"
        open={
          !noVerificationAlert &&
          session !== null &&
          session?.user?.emailVerifiedAt === null &&
          !loading
        }
        handler={() => {}}
      >
        <DialogHeader>Verify your account!</DialogHeader>
        <DialogBody className="font-normal">
          <div>
            We have send you an email to your account, please verify your email
            before using this website by clicking link we have send to you. If
            you not receiving any email, please click resend button below.
            {countdown > 0 && (
              <Typography
                className="mt-8 font-normal"
                variant="small"
                color="red"
              >
                You can resend new email verification in {countdown} second
                {countdown > 1 && "s"}.
              </Typography>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            disabled={sending || countdown > 0}
            variant="gradient"
            color="gray"
            onClick={() => resend()}
            className="flex items-center gap-3 mr-1"
          >
            {sending && (
              <span>
                <Spinner className="w-3 h-3" />
              </span>
            )}
            <span>Resend</span>
          </Button>
          <Button variant="gradient" color="red" onClick={() => signOut()}>
            <span>Logout</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
      <Navbar
        shadow={false}
        className="sticky top-0 z-10 w-full px-4 py-2 rounded-none h-max  lg:py-4 max-w-none"
      >
        <div className="flex items-center justify-between pb-2 mx-auto flex-nowrap md:gap-x-8 text-blue-gray-900 max-w-7xl">
          <div className="text-center ">
            <Link href="/">
              <Image
                src={require("../../assets/img/park.png")}
                alt="Arfaaz Collection"
                width={50}
                height={50}
                className="w-[180px] md:w-auto h-240px"
              />
            </Link>
          </div>
          <LoginDialog open={openLogin} toggleOpen={toggleOpen} />
          <div className="flex items-center gap-0 md:gap-4 ">
            <div className="hidden mr-4 lg:block ">{navList}</div>
            {session && !loading ? (
              <>
                <Cart />
                <ProfileMenu />
              </>
            ) : (
              <>
                <Button
                  onClick={toggleOpen}
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Login</span>
                </Button>
                <Link href="/register">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Register</span>
                  </Button>
                </Link>
              </>
            )}
            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="black" // Ubah warna stroke menjadi hitam
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="black" // Ubah warna stroke menjadi hitam
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
      <div className=" w-screen">
        {children}
        <Footer />
      </div>
    </div>
  );
}
