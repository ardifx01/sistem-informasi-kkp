import { HeaderContent } from "./HeaderContent";
import { LogoSection } from "./LogoSection";

export const Header: React.FC = () => (
  <div className="relative max-w-7xl mx-auto px-6 py-20">
    <div className="text-center">
      <LogoSection />
      <HeaderContent />
    </div>
  </div>
);
