import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import Api from "@/service/Api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function AddVehicle({ open, toggleOpen, profile }: any) {
  const { data: session, status }: any = useSession();
  const [creating, setCreating] = useState(false);
  const [platNomor, setPlatNomor] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [tipe, setTipe] = useState("");

  const router = useRouter();
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  }: any = useForm({});

  const submitVehicle = async () => {
    setCreating(true);
    const id = toast.loading("Menambahkan Kendaraan Kamu", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const api = new Api();
      api.url = "/vehicle/create-vehicle";
      api.auth = true;
      api.token = session.accessToken;
      api.body = {
        validationCardId: profile?.nocard?.[0]?.id,
        plat_Nomor: platNomor,
        jenis_Kendaraan: jenisKendaraan,
        tipe: tipe,
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
          toggleOpen(); // Menutup modal setelah API berhasil
        }, 3000);
      } else {
        setCreating(false);
        toast.update(id, {
          render: "Kendaraan Kamu Gagal Didaftarkan",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (error) {
      setCreating(false);
      toast.update(id, {
        render: "Kendaraan Kamu Gagal Didaftarkan",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  console.log(profile);
  return (
    <>
      <Dialog open={open} handler={toggleOpen}>
        <DialogHeader>
          <Typography variant="h6" color="black">
            Tambah Kendaraan
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="flex w-72 flex-col items-end gap-6">
            <Input
              size="md"
              label="Plat Nomor"
              crossOrigin={undefined}
              value={platNomor} // Hubungkan dengan nilai state platNomor
              onChange={(e) => setPlatNomor(e.target.value)} // Update state platNomor saat nilai berubah
            />
            <Input
              size="lg"
              label="Jenis Kendaraan"
              crossOrigin={undefined}
              value={jenisKendaraan} // Hubungkan dengan nilai state jenisKendaraan
              onChange={(e) => setJenisKendaraan(e.target.value)} // Update state jenisKendaraan saat nilai berubah
            />
            <Input
              size="lg"
              label="Tipe"
              crossOrigin={undefined}
              value={tipe} // Hubungkan dengan nilai state tipe
              onChange={(e) => setTipe(e.target.value)} // Update state tipe saat nilai berubah
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={submitVehicle}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
