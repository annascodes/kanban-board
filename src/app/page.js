import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-svh flex justify-center items-center ">
      <div>
        <h1 className="text-5xl font-extrabold tracking-wider">Kanban.</h1>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline btn-neutral text-xs tracking-widest">
            <Link href={'/tasks'}>My tasks</Link>

          </button>
          <button className="btn btn-outline btn-neutral text-xs tracking-widest ">
            <Link target="_blank" href={'https://github.com/annascodes/kanban-board'} className="flex items-center gap-2">
              <FaGithub className="text-xl" />

              Source code on GitHub
            </Link>

          </button>
        </div>
      </div>

    </div>
  );
}
