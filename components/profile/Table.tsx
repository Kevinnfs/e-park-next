import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AddVehicle } from "../modal/AddVehicle";
import Api from "@/service/Api";
import { useSession } from "next-auth/react";
import { EditVehicle } from "../modal/EditVehicle";
import { DeleteVehicle } from "../modal/DeleteVehicle";

const TABLE_HEAD = ["No", "Plat Nomor", "Jenis Kendaraan", "Tipe", "Aksi"];

export function DefaultTable({ profile }: any) {
  const { data: session, status }: any = useSession();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [list, setList] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const toggleOpen = () => {
    setOpenAdd((prev: boolean) => !prev);
  };

  const toggleEditOpen = () => {
    setOpenEdit((prev: boolean) => !prev);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    toggleEditOpen();
  };

  const toggleDeleteOpen = () => {
    setOpenDelete((prev: boolean) => !prev);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    toggleDeleteOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new Api();
        api.url = `/no-kartu/${profile?.nocard?.[0]?.cardNumber}`;
        api.auth = true;
        api.token = session?.accessToken;
        const resp = await api.call();
        setList(resp?.data?.vehicle);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [session?.accessToken, profile, selectedItem]);

  return (
    <>
      <div className="md:mx-5 my-2 flex-row space-y-6">
        <Typography variant="h3">Daftar Kendaraan</Typography>
        <Card className="mx-auto w-full">
          <CardBody className="h-full w-full overflow-scroll">
            <div className="flex justify-end">
              <Button onClick={toggleOpen} size="sm" color="indigo">
                Tambah
              </Button>
            </div>
            <table className="w-full  table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="leading-none font-semibold"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list?.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.plat_Nomor}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.jenis_Kendaraan}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.tipe}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="font-medium text-green-500 text-center"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="font-medium text-red-500 text-center"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      {/* ======= Modal Tambah Kendaraan ===== */}
      <AddVehicle open={openAdd} toggleOpen={toggleOpen} profile={profile} />

      {/* ======= Modal Edit Kendaraan ===== */}
      <EditVehicle
        open={openEdit}
        toggleEditOpen={toggleEditOpen}
        selectedItem={selectedItem}
        profile={profile}
      />
      {/* ======= Modal Hapus Kendaraan ===== */}
      <DeleteVehicle
        open={openDelete}
        toggleDeleteOpen={toggleDeleteOpen}
        selectedItem={selectedItem}
        profile={profile}
      />
    </>
  );
}
