import "./header.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export const Header = ({ title, information, back }) => {
  return (
    <div className="Header">
      {back != null ? (
        <div className="back">
          <Link href={back}>
            <IoMdArrowRoundBack />
          </Link>
        </div>
      ) : null}
      <div className="text">
        <h1>{title}</h1>
        <h4>{information}</h4>
      </div>
    </div>
  );
};
