import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center gap-2 m-5">
      <button  style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
    </div>
  );
}
