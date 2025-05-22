import type { NavItem } from "@/lib";
import {
  FiHome,
  FiBox,
  FiVideo,
  FiShoppingBag,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

export const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: FiHome,
    label: "ホーム",
  },
  {
    href: "/dashboard/products",
    icon: FiBox,
    label: "商品管理",
  },
  {
    href: "/dashboard/livestreams",
    icon: FiVideo,
    label: "ライブ配信",
  },
  {
    href: "/dashboard/orders",
    icon: FiShoppingBag,
    label: "注文管理",
  },
  {
    href: "/dashboard/analytics",
    icon: FiBarChart2,
    label: "分析",
  },
  {
    href: "/dashboard/settings",
    icon: FiSettings,
    label: "設定",
  },
];
