import { StockType } from "@/types/common";

function formatRupiah(amount: number): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

function updateInCartQty(
  variant: StockType[],
  stockId: number,
  newQty: number
): StockType[] {
  return variant.map((item) => {
    if (item.key === stockId) {
      return {
        ...item,
        inCartQty: newQty,
      };
    }
    return item;
  });
}

export { formatRupiah, updateInCartQty };
