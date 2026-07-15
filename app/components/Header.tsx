import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import Link from "next/link";
import HeaderClient from "./HeaderClient";
import { ROUTES } from "../constants/routes";

const menuItems = [
  { key: "dashboard", label: "Dashboard", href: ROUTES.DASHBOARD },
  { key: "movies", label: "Movies", href: ROUTES.MOVIES },
  { key: "person", label: "Person", href: ROUTES.PERSON },
];

function getSelectedKey(pathname: string) {
  if (pathname.startsWith(ROUTES.DASHBOARD)) return "dashboard";
  if (pathname.startsWith(ROUTES.MOVIES)) return "movies";
  if (pathname.startsWith(ROUTES.PERSON)) return "person";
  return "";
}

export default function AppHeaderShell({ pathname }: { pathname: string }) {
  const selectedKey = getSelectedKey(pathname);

  return (
    <Header
      className="flex items-center justify-between px-6"
      style={{ backgroundColor: "#001529" }}
    >
      <div className="flex items-center flex-1">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link href={item.href}>{item.label}</Link>,
          }))}
          className="flex-1"
          style={{ minWidth: 0 }}
        />
      </div>

      <HeaderClient />
    </Header>
  );
}
