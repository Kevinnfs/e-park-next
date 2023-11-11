import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  HeartIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

function ProfileMenu() {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          color="white"
          className="px-2 py-2 bg-opacity-0 shadow-none hover:shadow-none"
        >
          <UserCircleIcon className="w-8 h-8" />
        </Button>
      </MenuHandler>
      <MenuList>
        <Link href="/orders">
          <MenuItem className="flex items-center gap-2">
            <NewspaperIcon className="w-4 h-4" />
            Orders
          </MenuItem>
        </Link>
        <Link href="/settings">
          <MenuItem className="flex items-center gap-2">
            <Cog6ToothIcon className="w-4 h-4" />
            Settings
          </MenuItem>
        </Link>
        <Link href="/wishlist">
          <MenuItem className="flex items-center gap-2">
            <HeartIcon className="w-4 h-4" />
            Wishlist
          </MenuItem>
        </Link>
        <hr className="my-3" />
        <MenuItem className="flex items-center gap-2" onClick={() => signOut()}>
          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
