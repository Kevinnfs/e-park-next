import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { DefaultTable } from "./Table";

export function Profile() {
  const { data: session, status }: any = useSession();

  const profile = session?.checkUser

  console.log("ini profile",session)
  return (
    <div className="md:mx-5 my-5 flex-row space-y-6">
      <Card className="w-full flex-row justify-center items-center ">
        <CardHeader
          shadow={false}
          floated={false}
        >
          <picture>
          <img
              src="https://i.pinimg.com/originals/b2/14/85/b21485f63a7b465eab401af4865591aa.png"
              alt="card-image"
              className="object-cover rounded-full"
              style={{ width: "360px", height: "360px" }}
            />
          </picture>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 w-3/5">
          <div className="flex gap-4 items-center font-medium">
            <Typography className="text-black font-bold">Nama :</Typography>
            <Typography className="text-gray">{profile?.name}</Typography>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <Typography className="text-black font-bold">NIM :</Typography>
            <Typography className="text-gray">{profile?.nim}</Typography>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <Typography className="text-black font-bold">Email :</Typography>
            <Typography className="text-gray">{profile?.email}</Typography>
          </div>

          <DefaultTable />
        </CardBody>
      </Card>
    </div>
  );
}
