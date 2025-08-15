import { BuildingIcon } from "@/components/icons/BuildingIcon";
import { MapIcon } from "@/components/icons/MapIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";

export const getContactIcon = (iconType: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    map: <MapIcon />,
    phone: <PhoneIcon />,
    building: <BuildingIcon />,
  };
  return iconMap[iconType] || <MapIcon />;
};
