import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["No", "Plat Nomor", "Jenis Kendaraan", "Tipe", "Aksi"];
 
const TABLE_ROWS = [
  {
    no: "1",
    plat_nomor: "BK 1234 ASU",
    jenis_kendaraan: "Motor",
    tipe: "supra bapak"
  },
  {
    no: "2",
    plat_nomor: "BK 1234 ASU",
    jenis_kendaraan: "Mobil",
    tipe: "supra bapak"
  },
  {
    no: "3",
    plat_nomor: "BK 1234 ASU",
    jenis_kendaraan: "Motor",
    tipe: "supra bapak"
  },
  {
    no: "4",
    plat_nomor: "BK 1234 ASU",
    jenis_kendaraan: "Mobil",
    tipe: "supra bapak"
  },
  {
    no: "5",
    plat_nomor: "BK 1234 ASU",
    jenis_kendaraan: "Motor",
    tipe: "supra bapak"
  },
];
 
export function DefaultTable() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className=" leading-none font-semibold "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ no, plat_nomor, jenis_kendaraan, tipe }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4 text-center" : "p-4 border-b border-blue-gray-50 text-center";
 
            return (
              <tr key={no}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {no}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {plat_nomor}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {jenis_kendaraan}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {tipe}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-green-500 text-center"
                  >
                    Edit
                  </Typography>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-red-500 text-center"
                  >
                    Delete
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}