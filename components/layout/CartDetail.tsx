import Api from "@/service/Api";
import { eventEmitter } from "@/service/eventEmmiter";
import { formatRupiah } from "@/service/helper";
import { CartType } from "@/types/common";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface CartDetailProps {
  v: CartType;
}

function CartDetail({ v }: CartDetailProps) {
  const { data: session }: any = useSession();
  const [qty, setQty] = useState(v.quantity);

  const removeCart = async (cartId: number, stockId: number) => {
    if (session) {
      const api = new Api();
      api.auth = true;
      api.token = session?.access_token;
      api.url = "cart/remove";
      api.body = {
        cartId,
      };
      await api.call();
      eventEmitter.emit("cart");
      eventEmitter.emit("productUpdate", { stockId, qty: 0 });
      toast.success("Product removed from cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const updateCart = async (id: number) => {
    if (!session) {
      eventEmitter.emit("login");
      return;
    }

    const api = new Api();
    api.url = "cart/update";
    api.auth = true;
    api.token = session?.access_token;
    api.body = {
      stockId: id,
      qty,
    };

    await api.call();
    eventEmitter.emit("cart");
    eventEmitter.emit("productUpdate", api.body);
    toast.success("Cart updated!", { position: toast.POSITION.TOP_CENTER });
  };

  return (
    <Card className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <div>
          <Image
            src={v.stock.thumbnail}
            alt={v.stock.product.name}
            width={400}
            height={300}
            className="aspect-[4/3] object-cover max-w-[150px] rounded-lg"
          />
        </div>
        <div className="text-xs">
          <div className="font-bold">{v.stock.product.name}</div>
          <div>@ {formatRupiah(v.stock.price)}</div>
          <div className="flex gap-2 mt-2 ">
            <div
              className="w-5 h-5 rounded-full ring-1 ring-gray-400"
              style={{ backgroundColor: v.stock.color.colorHex }}
            />
            <div>{v.stock.size.name}</div>
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <Button
              className="px-2 py-1"
              onClick={() => setQty((prev: number) => prev - 1)}
              disabled={qty <= 0}
            >
              -
            </Button>
            <input
              value={qty}
              className="w-12 py-2 text-center border-b border-black focus:outline-none focus:border-blue-700 "
              onChange={(e: any) =>
                setQty(
                  e.target.value > v.stock.quantity
                    ? v.stock.quantity
                    : e.target.value < 0
                    ? 0
                    : Number(e.target.value)
                )
              }
            />
            <Button
              className="px-2 py-1"
              onClick={() => setQty((prev: number) => prev + 1)}
              disabled={qty >= v.stock.quantity}
            >
              +
            </Button>
          </div>
          <div className="flex justify-end gap-1">
            {qty !== v.quantity && (
              <Button
                onClick={() => updateCart(v.stockId)}
                color="green"
                className="px-3 py-2"
              >
                Update
              </Button>
            )}
            <Button
              onClick={() => removeCart(v.key, v.stockId)}
              color="red"
              className="px-3 py-2"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-sm font-bold text-right">
            {formatRupiah(v.stock.price * v.quantity)}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartDetail;
