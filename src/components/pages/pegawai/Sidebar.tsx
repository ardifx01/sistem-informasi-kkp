import { ContactSection } from "./ContactSection";
import { StatusSection } from "./StatusSection";

export const Sidebar: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => (
  <div className="lg:col-span-1 space-y-6">
    <StatusSection isLoaded={isLoaded} />
    <ContactSection isLoaded={isLoaded} />
  </div>
);
