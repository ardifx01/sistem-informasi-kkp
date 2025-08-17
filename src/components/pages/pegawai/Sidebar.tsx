import { ContactSection } from "./ContactSection";
import { StatusSection } from "./StatusSection";

export const Sidebar: React.FC = () => (
  <div className="lg:col-span-1 space-y-6">
    <StatusSection />
    <ContactSection />
  </div>
);
