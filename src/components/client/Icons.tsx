// components/icons.tsx
import {
  Home,
  File,
  Globe,
  User,
  Menu,
  Search,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon =  typeof LucideIcon;

export const Icons = {
  home: Home,
  file: File,
  globe: Globe,
  user: User,
  menu: Menu,
  search: Search,
};
