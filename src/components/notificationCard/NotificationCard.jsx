import "./notificationCard.css";
import Link from "next/link";

export default function NotificationCard({ title, description }) {
  return (
    <div className="NotifiactionCard">
      <Link href="/application/events/notifications">
        <h1>Te han invitado a un evento!!!</h1>
        <h2>Título: <span>{title}</span></h2>
        <h2>Descripción: <span>{description}</span></h2>
      </Link>
    </div>
  );
}
