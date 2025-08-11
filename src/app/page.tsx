import BackgroundElement from "@/components/BackgroundElement";
import MainHeader from "@/components/MainHeader";
import IndonesiaMap from "@/components/IndonesiaMap";
import MapShell from "@/components/MapShell";
import StatsEmployee from "@/components/StatsEmployee";
import Charts from "@/components/Charts/Charts";

const Dashboard = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <BackgroundElement />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Mobile: logos stacked with login top-right, Desktop: original layout */}
        <MainHeader />
        {/* Indonesia Map Section - Mobile first, then stats */}
        <MapShell className="md:hidden p-4 animate-fade-in mb-4">
          <IndonesiaMap />
        </MapShell>
        {/* Main Content - Desktop 12-col grid preserved, mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 animate-fade-in mb-4">
          {/* Indonesia Map Section - Desktop only */}
          <MapShell className="hidden md:block md:col-span-8 p-6">
            <IndonesiaMap />
          </MapShell>

          <StatsEmployee />
        </div>
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
