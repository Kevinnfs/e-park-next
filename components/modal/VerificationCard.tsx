import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import Api from "@/service/Api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export function VerificatonCard({ open, toggleOpenVerif, profile }: any) {
  const { data: session, status }: any = useSession();

  const [tempCard, setTempCard] = useState<any>("");
  const [cardNumb, setCardNumb] = useState<any>();
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  }: any = useForm({});

  useEffect(() => {
    const scanTemp = async () => {
      const baseUrl = "http://localhost:3001";
      const endpoint = "/no-kartu/get-temp-card-number";
      const url = baseUrl + endpoint;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTempCard(data?.data);
          console.log(tempCard);
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    };

    scanTemp();
  }, [tempCard]);

  const submitVerification = async () => {
    const id = toast.loading("Menambahkan Kendaraan Kamu", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const api = new Api();
      api.url = "/no-kartu/create-validation-card";
      api.auth = true;
      api.token = session.accessToken;
      api.body = {
        nim: profile?.nim,
      };
      const resp = await api.call();
      if (resp?.statusCode === 200) {
        reset();
        toast.update(id, {
          render: "Kendaraan Kamu Berhasil Terdaftar",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
        setTimeout(() => {
          toggleOpenVerif(); // Menutup modal setelah API berhasil
        }, 3000);
      } else {
        toast.update(id, {
          render: "Kendaraan Kamu Gagal Didaftarkan",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Kendaraan Kamu Gagal Didaftarkan",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  return (
    <Dialog open={open} handler={toggleOpenVerif}>
      <DialogHeader>Verifikasi Kartu</DialogHeader>
      <DialogBody className="grid gap-8">
        <Input
          label="Serial Kartu"
          crossOrigin={undefined}
          disabled
          color="black"
          value={tempCard}
        />
        <Input
          label="NIM"
          crossOrigin={undefined}
          disabled
          color="black"
          value={profile?.nim}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={toggleOpenVerif}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button color="green" onClick={submitVerification}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
