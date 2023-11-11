interface CategoryType {
  key: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface CommonProps {
  categories: any;
}

interface StockType {
  key: number;
  productKey: number;
  product: ProductType;
  colorKey: number;
  color: ColorType;
  sizeKey: number;
  size: SizeType;
  quantity: number;
  thumbnail: string;
  price: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  inCart: boolean;
  inCartQty: number;
}

interface ColorType {
  key: number;
  name: string;
  colorHex: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductType {
  key: number;
  name: string;
  slug: string;
  description: string;
  categoryKey: number;
  score: number;
  stock: StockType[];
  createdAt: string;
  updatedAt: string;
  wishlist: WishlistType | null;
}

interface ProductTypeSingle {
  key: number;
  name: string;
  slug: string;
  description: string;
  categoryKey: number;
  score: number;
  stock: StockType;
  createdAt: string;
  updatedAt: string;
  wishlist: WishlistType | null;
}

interface WishlistType {
  key: number;
  userId: number;
  productId: number;
  product: any;
  createdAt: string;
  updatedAt: string;
}

interface SizeType {
  key: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CartType {
  key: number;
  userId: number;
  stockId: number;
  stock: StockType;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface AddressType {
  key: number;
  name: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  province: string;
  provinceId: number;
  city: string;
  cityId: number;
  subdistrict: string;
  subdistrictId: number;
  zipCode: string;
  default: boolean;
  receiverName: string;
  createdAt: string;
  updatedAt: string;
}

interface ProvinceType {
  province_id: string;
  province: string;
}

interface CityType {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

interface SubDistrictType {
  subdistrict_id: string;
  province_id: string;
  province: string;
  type: string;
  city_id: string;
  city_name: string;
  subdistrict_name: string;
  postal_code: string;
}

interface OrderType {
  key: number;
  invoiceNumber: string;
  // user: UserType;
  status: string;
  price: number;
  totalPrice: number;
  address: AddressType;
  shipping: ShippingOrderType;
  token: string;
  // discount: DiscountType;
  totalDiscount: number;
  orderDetail: {
    stock_id: string;
  }[];
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
}

interface CourierType {
  key: number;
  name: string;
  code: string;
  active: boolean;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ShippingOrderType {
  key: number;
  courier: string;
  courierCode: string;
  orderId: number;
  price: number;
  waybill: string;
  shippingPackage: string;
  updateAt: string;
  createdAt: string;
}

interface ShippingType {
  service: string;
  description: string;
  cost: [
    {
      value: number;
      etd: string;
      note: string;
    }
  ];
}

interface DiscountType {
  key: number;
  name: string;
  discountType: string;
  value: number;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersType {
  stockId: number;
  quantity: number;
}

interface SliderType {
  key: number;
  bannerUrl: string;
  alt: string;
}

export type {
  CategoryType,
  StockType,
  ProductType,
  ColorType,
  SizeType,
  CartType,
  CommonProps,
  AddressType,
  CityType,
  ProvinceType,
  SubDistrictType,
  WishlistType,
  OrderType,
  CourierType,
  ShippingType,
  DiscountType,
  OrdersType,
  ProductTypeSingle,
  SliderType,
};
