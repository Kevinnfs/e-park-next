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

import ProfileMenu from "./ProfileMenu";
import { VerifyUrl } from "@/config/Config";
import { toast } from "react-toastify";
import { eventEmitter } from "@/service/eventEmmiter";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Api from "@/service/Api";
import { CategoryType, ProductTypeSingle } from "@/types/common";
import { VerificatonCard } from "../modal/VerificationCard";

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
  const [profile, setProfile] = useState<any>();
  const [openVerif, setOpenVerif] = useState(false);

  const toggleOpenVerif = () => {
    setOpenVerif((prev: boolean) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new Api();
        api.url = "/auth/profile";
        api.auth = true;
        api.token = session?.accessToken;
        const resp = await api.call();
        setProfile(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session?.accessToken]);

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
                {profile?.nocard && profile.nocard.length === 0 ? (
                  <Button onClick={toggleOpenVerif} size="sm" color="green">
                    Verifikasi Kartu
                  </Button>
                ) : null}

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
      <div className="w-full py-8">
        {children}
        <Footer />
      </div>
      <VerificatonCard
        open={openVerif}
        toggleOpenVerif={toggleOpenVerif}
        profile={profile}
      />
    </div>
  );
}
