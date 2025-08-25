import BackgroundElement from "@/components/BackgroundElement";
import MainHeader from "@/components/MainHeader";
import IndonesiaMap from "@/components/IndonesiaMap";
import StatsEmployee from "@/components/StatsEmployee";
import Charts from "@/components/Charts/Charts";

const Dashboard = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 p-4 relative overflow-hidden">
      <BackgroundElement />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <MainHeader />

        {/* Map + Stats (mobile: stacked, desktop: 8/4 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 animate-fade-in mb-4">
          <div className="col-span-1 md:col-span-8">
            <IndonesiaMap />
          </div>
          <div className="col-span-1 md:col-span-4">
            <StatsEmployee />
          </div>
        </div>

        {/* Charts tetap sama */}
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
