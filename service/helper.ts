import { StockType } from "@/types/common";

function formatRupiah(amount: number): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

export { formatRupiah };
