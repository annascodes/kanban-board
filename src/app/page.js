import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-svh flex justify-center items-center ">
      <div>
        <h1 className="text-5xl font-extrabold tracking-wider">Kanban.</h1>
        <button className="btn btn-outline btn-neutral text-xs tracking-widest">
          <Link href={'/tasks'}>My tasks</Link>
        </button>
      </div>

    </div>
  );
}
