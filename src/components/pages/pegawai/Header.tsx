import { HeaderContent } from "./HeaderContent";
import { LogoSection } from "./LogoSection";

export const Header: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div className="relative max-w-7xl mx-auto px-6 py-20">
    <div className="text-center">
      <LogoSection isLoaded={isLoaded} />
      <HeaderContent isLoaded={isLoaded} />
    </div>
  </div>
);
