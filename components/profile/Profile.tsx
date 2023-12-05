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
          className="m-0 w-2/5 rounded-l-none flex justify-center items-center"
        >
          <picture>
            <img
              src="https://i.pinimg.com/originals/b2/14/85/b21485f63a7b465eab401af4865591aa.png"
              alt="card-image"
              width={50}
              height={50}
              className=" w-96 h-96 object-cover rounded-full"
            />
          </picture>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 w-3/5">
          <div className="flex gap-4 items-center font-medium">
            <span className="text-black font-bold">Nama :</span>
            <span className="text-gray">Bumi</span>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <span className="text-black font-bold">NIM :</span>
            <span className="text-gray">12345678</span>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <span className="text-black font-bold">Email :</span>
            <span className="text-gray">bumi@example.com</span>
          </div>

          {/* Tambahkan tabel di bawah tulisan Email */}
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-black">No</th>
                <th className="py-2 px-4 text-black">Nomor Kendaraan</th>
                <th className="py-2 px-4 text-black">Warna Kendaraan</th>
                <th className="py-2 px-4 text-black">Tanggal</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {[...Array(5).keys()].map((index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">Nomor Kendaraan {index + 1}</td>
                  <td className="py-2 px-4 text-center">Warna Kendaraan {index + 1}</td>
                  <td className="py-2 px-4 text-center">Tanggal {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
