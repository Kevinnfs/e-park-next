import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

import Layout from "@/components/layout/Layout";
import { CommonProps } from "@/types/common";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ListPengguna({ categories }: CommonProps) {
  return (
    <Layout title="Register - Arfaaz Collection" categories={categories} >
      <div className="grid items-center justify-center mx-4xl">
        <Card
          color="white"
          shadow={false}
          className="md:mx-5 my-5 flex-row space-y-6 justify-center drop-shadow-lg max-w-7xl "
        >
          <CardHeader
            color="white"
            floated={false}
            shadow={false}
            className="mx-3 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  Supriadi
                </Typography>
              </div>
              <Typography color="blue-gray">supriadi@gmail.com</Typography>
            </div>
          </CardHeader>
          <CardBody className="pt-0 pb-8">
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nama :</span>
              <span className="text-gray">Bumi</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Email :</span>
              <span className="text-gray">bumi@example.com</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Jenis Kendaraan :</span>
              <span className="text-gray">Avanza</span>
            </div>
          </CardBody>
          <CardBody className="pt-0 pb-8">
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nomor Kartu :</span>
              <span className="text-gray">Bumi</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">NIM :</span>
              <span className="text-gray">12345678</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nomor Plat :</span>
              <span className="text-gray">666666666</span>
            </div>
          </CardBody>
        </Card>
        <Card
          color="white"
          shadow={false}
          className="md:mx-5 my-5 flex-row space-y-6 justify-center drop-shadow-lg max-w-4xl "
        >
          <CardHeader
            color="white"
            floated={false}
            shadow={false}
            className="mx-3 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  Supriadi
                </Typography>
              </div>
              <Typography color="blue-gray">supriadi@gmail.com</Typography>
            </div>
          </CardHeader>
          <CardBody className="pt-0 pb-8">
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nama :</span>
              <span className="text-gray">Bumi</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Email :</span>
              <span className="text-gray">bumi@example.com</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Jenis Kendaraan :</span>
              <span className="text-gray">Avanza</span>
            </div>
          </CardBody>
          <CardBody className="pt-0 pb-8">
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nomor Kartu :</span>
              <span className="text-gray">Bumi</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">NIM :</span>
              <span className="text-gray">12345678</span>
            </div>
            <div className="flex gap-4 items-center font-medium p-3">
              <span className="text-black font-bold">Nomor Plat :</span>
              <span className="text-gray">666666666</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}

export default ListPengguna;
