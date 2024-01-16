import { FeatureLinks, TFeatureLink } from "@/lib/data";
import { Tornado } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section className="container">
        <h1>
          Welcome to <Tornado className="stroke-secondary"/> Tasker
        </h1>
        <article className="pt-10 flex flex-col gap-[32px]">
          <aside>
            <h4>Features</h4>
            <ul>
              {FeatureLinks.map((item: TFeatureLink) => {
                const { id, text, link } = item;
                return (
                  <li key={id}>
                    <Link
                      href={link}
                      className="hover:text-blue-600 hover:underline transition ease-in-out"
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
          <aside>
            <h4>Techs</h4>
            <ul>
              <li>NextJS v14</li>
              <li>Prisma ORM</li>
              <li>MongoDB Atlas</li>
              <li>React hook form</li>
              <li>ZOD validator</li>
              <li>Shadcn UI</li>
              <li>Tailwind CSS</li>
              <li>SCSS</li>
            </ul>
          </aside>
        </article>
      </section>
    </>
  );
};

export default Home;
