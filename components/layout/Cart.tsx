import Api from "@/service/Api";
import { eventEmitter } from "@/service/eventEmmiter";
import { formatRupiah } from "@/service/helper";
import { CartType } from "@/types/common";
import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartDetail from "./CartDetail";
import Link from "next/link";

function Cart() {
  const { data: session }: any = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [loadCart, setLoadCart] = useState(0);
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const getCart = async () => {
      if (session) {
        const api = new Api();
        api.auth = true;
        api.token = session?.access_token;
        api.url = "cart/get";
        const resp = await api.call();
        if (resp?.meta?.code === 200) {
          setCart(resp?.data);
        }
      }
    };
    getCart();
  }, [loadCart, session]);

  useEffect(() => {
    const handleEvent = () => {
      setLoadCart((prev: number) => prev + 1);
    };

    eventEmitter.on("cart", handleEvent);

    return () => {
      eventEmitter.off("cart", handleEvent);
    };
  }, []);

  const totalPrice = () => {
    let total = 0;
    cart.map((v: CartType) => {
      total += v.quantity * v.stock.price;
    });

    return total;
  };

  return (
    <Badge content={String(cart?.length ?? 0)}>
      <Menu open={openMenu} handler={setOpenMenu} placement="bottom-end">
        <MenuHandler>
          <Button
            color="white"
            variant="gradient"
            size="sm"
            className="px-2 py-2 bg-opacity-0 shadow-none hover:shadow-none"
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </Button>
        </MenuHandler>
        <MenuList className="p-0">
          {cart.length > 0 ? (
            <>
              <div className="max-h-[300px] overflow-auto flex flex-col bg-gray-100 px-2 py-4 gap-2">
                {cart.map((v: CartType, i: number) => (
                  <CartDetail key={i} v={v} />
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sm border-t">
                <div className="font-bold">Total Price:</div>
                <div className="font-black">{formatRupiah(totalPrice())}</div>
              </div>
              <Link href="/checkout">
                <Button className="flex items-center justify-center w-full gap-2 rounded-none">
                  <CheckIcon className="w-4 h-4" />
                  Check Out
                </Button>
              </Link>
            </>
          ) : (
            <Typography
              color="gray"
              className="px-4 py-2 font-normal"
              variant="small"
            >
              Your cart is empty.
            </Typography>
          )}
        </MenuList>
      </Menu>
    </Badge>
  );
}

export default Cart;
