import "./application.css"
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";

export default function Application() {
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

