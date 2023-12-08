import React, { useEffect, useState } from "react";
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

export function EditVehicle({
  open,
  toggleEditOpen,
  selectedItem,
  profile,
}: any) {
  const { data: session, status }: any = useSession();
  const [platNomor, setPlatNomor] = useState(selectedItem?.plat_Nomor || "");
  const [jenisKendaraan, setJenisKendaraan] = useState(
    selectedItem?.jenis_Kendaraan || ""
  );
  const [tipe, setTipe] = useState(selectedItem?.tipe || "");

  const router = useRouter();
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  }: any = useForm({});

  useEffect(() => {
    selectedItem;
  }, [selectedItem]);
  const confirmEdit = async () => {
    const id = toast.loading("Menambahkan Kendaraan Kamu", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const api = new Api();
      api.url = `/vehicle/${selectedItem?.id}`;
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
          toggleEditOpen();
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
    <>
      <Dialog open={open} handler={toggleEditOpen}>
        <DialogHeader>
          <Typography variant="h6" color="black">
            Edit Kendaraan
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
            onClick={toggleEditOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={confirmEdit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
