import type { NavItem } from "@/lib";
import { FiHome, FiSettings, FiUsers, FiBook } from "react-icons/fi";

export const navItems: NavItem[] = [
  {
    href: "/app",
    icon: FiHome,
    label: "自分史",
  },
  {
    href: "/app/family",
    icon: FiUsers,
    label: "家族",
  },
  {
    href: "/app/settings",
    icon: FiSettings,
    label: "設定",
  },
  {
    href: "/app/stories",
    icon: FiBook,
    label: "自分史",
  },
];
