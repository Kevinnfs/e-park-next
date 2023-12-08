import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Chip,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { DefaultTable } from "./Table";
import React, { useEffect, useState } from "react";
import { AddVehicle } from "../modal/AddVehicle";
import { FaPen } from "react-icons/fa";
import { ModalAvatar } from "./ModalAvatar";
import Api from "@/service/Api";

export function Profile({ profile }: any) {
  const { data: session, status }: any = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [condition, setCondition] = useState<any>();

  const url = "http://localhost:3001";

  const latestStatus =
    condition?.status?.[condition?.status?.length - 1]?.status;

  const getChipColor = (status: any) => {
    switch (status) {
      case "ENTERED":
        return "green";
      case "EXITED":
        return "red";
      default:
        return "red"; // Default color for unknown status
    }
  };

  const toggleOpen = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const api = new Api();
        api.url = `/no-kartu/${profile?.nocard?.[0]?.cardNumber}`;
        api.auth = true;
        api.token = session?.accessToken;
        const resp = await api.call();
        setCondition(resp?.data);
        // set(resp?.data?.vehicle);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStatus();
  }, [profile, condition]);

  // console.log(profile);

  return (
    <>
      <div className="md:mx-5 my-2 flex-row space-y-6">
        <Typography variant="h3">Profile</Typography>
        <Card className="w-full flex-row justify-center py-8 ">
          <CardHeader shadow={false} floated={false} className="relative">
            <picture>
              <img
                src={
                  profile?.avatar
                    ? url + profile?.avatar
                    : "https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png"
                }
                alt="card-image"
                className="object-cover rounded-full"
                style={{ width: "250px", height: "250px" }}
              />
            </picture>
            <div className="absolute bottom-8 right-2">
              <Button
                onClick={toggleOpen}
                className="bg-black h-10 w-10 flex justify-center items-center p-2 rounded-full border-white border-4"
              >
                <FaPen className="h-8 w-8 text-white" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 w-3/5 justify-center">
            {condition?.status?.condition?.status?.length > 0 ? (
              <div className="w-20 text-center">
                <Chip value={latestStatus} color={getChipColor(latestStatus)} />
              </div>
            ) : null}
            <div className="flex gap-4 items-center font-medium">
              <Typography className=" font-bold">Nama :</Typography>
              <Typography className="text-gray">{profile?.name}</Typography>
            </div>
            <div className="flex gap-4 items-center font-medium">
              <Typography className=" font-bold">NIM :</Typography>
              <Typography className="text-gray">{profile?.nim}</Typography>
            </div>
            <div className="flex gap-4 items-center font-medium">
              <Typography className=" font-bold">Email :</Typography>
              <Typography className="text-gray">{profile?.email}</Typography>
            </div>
            {/* <div className="flex justify-end">
            <Button onClick={handleOpen} size="sm" color="indigo">
              Tambah
            </Button>
          </div> */}
            {/* <DefaultTable /> */}
          </CardBody>
        </Card>
        {/* ======= Modal Tambah Kendaraan ===== */}
      </div>
      <ModalAvatar open={openModal} toggleOpen={toggleOpen} />
    </>
  );
}
