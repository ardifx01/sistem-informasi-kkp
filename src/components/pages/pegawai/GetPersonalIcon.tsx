import { BriefcaseIcon } from "@/components/icons/BriefcaseIcon";
import { CalendarIcon } from "@/components/icons/CalenderIcon";
import { GraduationIcon } from "@/components/icons/GraduationIcon";
import { UserIcon } from "@/components/icons/UserIcon";

export const getPersonalIcon = (label: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    Nama: <UserIcon />,
    "Tempat/Tanggal Lahir": <CalendarIcon />,
    "Pendidikan Akhir": <GraduationIcon />,
    "Unit Kerja": <BriefcaseIcon />,
  };
  return iconMap[label] || null;
};
