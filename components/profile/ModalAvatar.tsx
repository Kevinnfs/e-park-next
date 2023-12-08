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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export function ModalAvatar({ open, toggleOpen }: any) {
  const { data: session, status }: any = useSession();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // Update the selectedFile state when the file input changes
    setSelectedFile(event.target.files[0]);
  };

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  }: any = useForm({});

  const handleFileUpload = async () => {
    const id = toast.loading("Mengunggah Foto Profil", {
      position: toast.POSITION.TOP_CENTER,
    });

    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      try {
        const api = new Api();
        api.url = "/auth/avatar";
        api.auth = true;
        api.token = session.accessToken;
        api.header = {
          "Content-Type": "multipart/form-data", // Header untuk mendukung tipe konten file
        };
        api.body = formData;

        const resp = await api.call();

        if (resp?.statusCode === 200) {
          toast.update(id, {
            render: "Foto Profil Berhasil Diunggah",
            type: "success",
            autoClose: 3000,
            isLoading: false,
          });
          setTimeout(() => {
            toggleOpen(); // Menutup modal setelah API berhasil
          }, 3000);
        } else {
          toast.update(id, {
            render: "Foto Profil Gagal Diunggah",
            type: "error",
            autoClose: 3000,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Gagal mengunggah foto profil:", error);
        toast.update(id, {
          render: "Terjadi kesalahan saat mengunggah foto profil",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } else {
      toast.error("Pilih file foto terlebih dahulu");
    }
  };

  return (
    <>
      <Dialog open={open} handler={toggleOpen}>
        <DialogHeader>
          <Typography variant="h4" color="black">
            Edit Foto Profil
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Input
            type="file"
            onChange={handleFileChange}
            label="Pilih Foto"
            accept="image/*"
            crossOrigin={undefined}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button color="green" onClick={handleFileUpload}>
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
