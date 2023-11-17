"use client";
import "./lineTable.css";
import { BsTrash } from "react-icons/bs";

export default function LineTable({ id_event, name, saldo, id_user }) {
  return (
    <div className="LineTable">
      <p>{name}</p>
      <p>{"$ " + saldo}</p>
      <BsTrash />
    </div>
  );
}
