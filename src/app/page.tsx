import BackgroundElement from "@/components/BackgroundElement";
import MainHeader from "@/components/MainHeader";
import IndonesiaMap from "@/components/IndonesiaMap";
import StatsEmployee from "@/components/StatsEmployee";
import Charts from "@/components/Charts/Charts";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 px-5 py-1 relative overflow-hidden">
      {/* Animated background elements */}
      <BackgroundElement />
      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header */}
        <MainHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-4">
          <div className="grid-cols-1 grid gap-3">
            <Charts displayBar />
          </div>
          <div className="flex gap-3 flex-col order-first md:order-none">
            <div>
              <StatsEmployee />
            </div>
            <IndonesiaMap />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
