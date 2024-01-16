import { Tornado } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const Links = [
    {
      id: 1,
      text: "Data table",
      link: "/tasks",
    },
    {
      id: 2,
      text: "Create task",
      link: "/tasks/add",
    },
  ];
  return (
    <header className="bg-white/60 backdrop-blur border-b border-white">
      <nav className="container py-[4px] flex items-center justify-between gap-[32px]">
        <Link href="/">
          <h2>
            <Tornado className="stroke-secondary"/> Tasker
          </h2>
        </Link>
        <ul className="flex items-center gap-[32px]">
          {Links.map((item: { id: number; text: string; link: string }) => {
            const { id, text, link } = item;
            return (
              <li key={id}>
                <Link href={link}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
