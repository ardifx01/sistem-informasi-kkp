import { PegawaiDetail } from "@/types";
import { ContactSection } from "./ContactSection";
import { StatusSection } from "./StatusSection";

interface SideBarProps {
  data: PegawaiDetail;
}

export function Sidebar(props: SideBarProps) {
  const { data } = props;

  return (
    <div className="lg:col-span-1 space-y-6">
      <StatusSection data={data} />
      <ContactSection dataPegawai={data} />
    </div>
  );
}
