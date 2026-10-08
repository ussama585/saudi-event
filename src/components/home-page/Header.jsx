import { ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
import simcoe from "../../assets/media/simcoe-logo.svg";

export default function Header({ openRegister, transparent = false }) {
  return (
    <header className={`site-header${transparent ? " site-header--transparent" : ""}`}>
      <div className="container header-inner">
        <Brand />
        <img className="header-partner-logo" src={simcoe} alt="Simcoe" width={150} />
      </div>
    </header>
  );
}
