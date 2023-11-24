'use client'
import "./application.css"
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Application() {
  const router = useRouter();

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    }
  }, [])

  return (
    <div className="Application">
      <Topbar />
			<Header 
				title={"Dashboard"}
				information={"Informacion general"}
			/>
    </div>
  );
}

