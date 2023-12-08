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

export function DeleteVehicle({
  open,
  toggleDeleteOpen,
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

  const confirmDelete = async () => {
    const id = toast.loading("Menambahkan Kendaraan Kamu", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const api = new Api();
      api.url = `/vehicle/delete/${selectedItem?.id}`;
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
          render: "Kendaraan Kamu Berhasil Terhapus",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
        setTimeout(() => {
          toggleDeleteOpen();
        }, 3000);
      } else {
        toast.update(id, {
          render: "Kendaraan Kamu Gagal Dihapus",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Kendaraan Kamu Gagal Dihapus",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };
  return (
    <>
      <Dialog open={open} handler={toggleDeleteOpen}>
        <DialogHeader>
          <Typography variant="h6" color="black">
            Hapus Kendaraan
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography variant="paragraph">
            Apakah Anda yakin ingin menghapus data kendaraan ini?
          </Typography>
          <div className="flex gap-4 items-center">
            <Typography variant="paragraph" className="font-semibold">
              Plat Nomor :
            </Typography>
            <Typography variant="paragraph">
              {selectedItem?.plat_Nomor}
            </Typography>
          </div>
          <div className="flex gap-4 items-center">
            <Typography variant="paragraph" className="font-semibold">
              Jenis Kendaraan :
            </Typography>
            <Typography variant="paragraph">
              {selectedItem?.jenis_Kendaraan}
            </Typography>
          </div>
          <div className="flex gap-4 items-center">
            <Typography variant="paragraph" className="font-semibold">
              Tipe Kendaraan :
            </Typography>
            <Typography variant="paragraph">{selectedItem?.tipe}</Typography>
          </div>
          <Typography variant="paragraph">
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
            {""}
            informasi terkait dengan kendaraan ini dari sistem.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDeleteOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={confirmDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
