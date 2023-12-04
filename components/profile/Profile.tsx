import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Profile() {
  return (
    <div className="md:mx-5 my-5 flex-row space-y-6">
      <Card className="w-full flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 rounded-l-none"
        >
          <picture>
            <img
              src="https://i.pinimg.com/originals/b2/14/85/b21485f63a7b465eab401af4865591aa.png"
              alt="card-image"
              className="object-cover rounded-full" // ubah properti rounded-l-lg menjadi rounded-full
            />
          </picture>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 w-3/5">
          <div className="flex gap-4 items-center font-medium">
            <Typography tag="span" className="text-black font-bold">Nama :</Typography>
            <Typography tag="span" className="text-gray">Bumi</Typography>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <Typography tag="span" className="text-black font-bold">NIM :</Typography>
            <Typography tag="span" className="text-gray">123456</Typography>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <Typography tag="span" className="text-black font-bold">Email :</Typography>
            <Typography tag="span" className="text-gray">bumi@example.com</Typography>
          </div>

          {/* Tambahkan tabel di bawah tulisan Email */}
          <table className="w-full  mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-black ">No</th>
                <th className="py-2 px-4 text-black ">Nomor Kendaraan</th>
                <th className="py-2 px-4 text-black ">Tanggal</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {[...Array(5).keys()].map((index) => (
                <tr key={index}>
                  <td className="py-2 px-4 ">{index + 1}</td>
                  <td className="py-2 px-4 ">Nomor Kendaraan {index + 1}</td>
                  <td className="py-2 px-4 ">Tanggal {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
