import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import { Battery, Wifi, Signal, X, Sun, Moon, Bluetooth, Flashlight, Calculator, Camera, Clock, Search } from "lucide-react";
import gsap from "gsap";

const MobileOS = () => {
  const { openWindow, windows } = useWindowsStore();
  const [now, setNow] = useState(dayjs());
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: true,
    darkMode: false,
    lowPower: false,
    flashlight: false,
    airplane: false,
  });
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(50);
  const controlCenterRef = useRef(null);
  const touchStartRef = useRef(null);

  const anyWindowOpen = Object.values(windows).some((w) => w.isOpen);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!controlCenterRef.current) return;
    if (isControlOpen) {
      gsap.fromTo(
        controlCenterRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.42, ease: "power3.out" }
      );
    } else {
      gsap.to(controlCenterRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isControlOpen]);

  useEffect(() => {
    if (!isControlOpen) return;
    const handleOutside = (e) => {
      if (
        controlCenterRef.current &&
        !controlCenterRef.current.contains(e.target)
      ) {
        setIsControlOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isControlOpen]);

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const lockScreenApps = dockApps.filter((a) => a.canOpen);
  const pageCount = 1;

  const formatTime = (t) => {
    const h = t.format("h");
    const m = t.format("mm");
    return { h, m };
  };

  return (
    <div className="mobile-os-container text-white font-sans select-none fixed top-0 left-0 w-dvw h-dvh overflow-hidden z-[1]">
      {/* ===== STATUS BAR ===== */}
      <header
        className="absolute top-0 left-0 w-full z-[70] flex justify-between items-end h-[54px] pl-[28px] pr-[24px] pb-1 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_70%,transparent_100%)]"
        onClick={() => !anyWindowOpen && setIsControlOpen((p) => !p)}
      >
        <time className="text-base font-semibold tracking-tight">
          {now.format("h:mm")}
        </time>
        <div className="flex items-center gap-[5px]">
          <Signal size={14} strokeWidth={2.2} />
          <Wifi size={14} strokeWidth={2.2} />
          <div className="flex items-center gap-[3px]">
            <div className="w-[25px] h-[12px] rounded-[3px] border-[1.5px] border-white p-[1.5px] relative">
              <div
                className="h-full rounded-[1.5px]"
                style={{
                  width: `${settings.lowPower ? 40 : 100}%`,
                  background: settings.lowPower ? "#f59e0b" : "#34c759",
                }}
              />
              <div className="absolute right-[-3.5px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] rounded-[1px] bg-white" />
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTROL CENTER (iOS 18 Style) ===== */}
      <aside
        ref={controlCenterRef}
        className="absolute top-0 left-0 w-full z-[75] overflow-hidden -translate-y-full opacity-0"
      >
        <div className="bg-[rgba(28,28,30,0.94)] backdrop-blur-[50px] backdrop-saturate-[2] min-h-dvh pt-[60px] pb-10 px-4">
          {/* Close button */}
          <button
            onClick={() => setIsControlOpen(false)}
            className="absolute top-[14px] right-4 z-10 flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/12"
          >
            <X size={15} strokeWidth={2.5} />
          </button>

          {/* Top row: Connectivity cluster */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Left cluster: Airplane + Cellular + WiFi */}
            <div className="bg-white/8 rounded-[18px] p-[14px] flex flex-col gap-[10px]">
              <div className="flex gap-2">
                <button
                  onClick={() => toggle("airplane")}
                  className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                  style={{ background: settings.airplane ? "#f59e0b" : "rgba(255,255,255,0.12)" }}
                >
                  <span className="text-xl">✈︎</span>
                </button>
                <button
                  onClick={() => toggle("wifi")}
                  className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                  style={{ background: settings.wifi ? "#007AFF" : "rgba(255,255,255,0.12)" }}
                >
                  <Wifi size={20} />
                </button>
                <button
                  onClick={() => toggle("bluetooth")}
                  className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                  style={{ background: settings.bluetooth ? "#007AFF" : "rgba(255,255,255,0.12)" }}
                >
                  <Bluetooth size={20} />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggle("flashlight")}
                  className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                  style={{ background: settings.flashlight ? "#007AFF" : "rgba(255,255,255,0.12)" }}
                >
                  <Flashlight size={20} />
                </button>
              </div>
            </div>

            {/* Right cluster: Now Playing + Screen Mirroring */}
            <div className="bg-white/8 rounded-[18px] p-[14px] flex flex-col items-center justify-center gap-2">
              <div className="w-[46px] h-[46px] rounded-full bg-white/12 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <p className="text-[11px] text-white/60 text-center leading-tight">
                {now.format("dddd")}
              </p>
              <p className="text-[22px] font-bold text-white leading-none">
                {now.format("h:mm")}
              </p>
              <p className="text-[11px] text-white/50">
                {now.format("MMMM D")}
              </p>
            </div>
          </div>

          {/* Second row: Display & Audio */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Display cluster */}
            <div className="bg-white/8 rounded-[18px] p-[14px]">
              <div className="flex items-center justify-between mb-2">
                <Sun size={14} className="text-white/70" />
                <Moon size={14} className="text-white/70" />
              </div>
              <div className="h-1 rounded-[2px] bg-white/15 relative">
                <div
                  className="h-full rounded-[2px] bg-white transition-[width] duration-200 ease-out"
                  style={{ width: `${brightness}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer"
                />
              </div>
              <button
                onClick={() => toggle("darkMode")}
                className="flex items-center gap-2 mt-3 w-full"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-2xl"
                  style={{ background: settings.darkMode ? "#007AFF" : "rgba(255,255,255,0.12)" }}
                >
                  {settings.darkMode ? <Moon size={15} /> : <Sun size={15} />}
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-white">
                    {settings.darkMode ? "Dark" : "Light"}
                  </p>
                  <p className="text-[9px] text-white/40">Appearance</p>
                </div>
              </button>
            </div>

            {/* Audio cluster */}
            <div className="bg-white/8 rounded-[18px] p-[14px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-white/70">🔈</span>
                <span className="text-[10px] text-white/70">🔊</span>
              </div>
              <div className="h-1 rounded-[2px] bg-white/15 relative">
                <div
                  className="h-full rounded-[2px] bg-white transition-[width] duration-200 ease-out"
                  style={{ width: `${volume}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer"
                />
              </div>
              <button
                onClick={() => toggle("lowPower")}
                className="flex items-center gap-2 mt-3 w-full"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-2xl"
                  style={{ background: settings.lowPower ? "#f59e0b" : "rgba(255,255,255,0.12)" }}
                >
                  <Battery size={15} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-white">
                    {settings.lowPower ? "On" : "Off"}
                  </p>
                  <p className="text-[9px] text-white/40">Low Power Mode</p>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom shortcuts */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Calculator size={20} />, label: "Calculator" },
              { icon: <Camera size={20} />, label: "Camera" },
              { icon: <Clock size={20} />, label: "Timer" },
              { icon: <Search size={20} />, label: "Search" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1 bg-white/8 rounded-2xl py-[14px] px-2"
              >
                <div className="text-white/80">{item.icon}</div>
                <span className="text-[9px] text-white/50">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ===== APP GRID — HOME SCREEN ===== */}
      <section className="absolute inset-0 overflow-y-auto pt-[64px] pb-[120px]">
        <div className="grid grid-cols-4 px-5 gap-y-7 gap-x-3">
          {dockApps.map((app) => (
            <button
              key={app.id}
              disabled={!app.canOpen}
              onClick={() => app.canOpen && openWindow(app.id)}
              className="flex flex-col items-center gap-[6px] active:scale-[0.85] transition-transform duration-150"
            >
              <div
                className="overflow-hidden w-[62px] h-[62px] rounded-[15px]"
                style={{
                  boxShadow: app.canOpen
                    ? "0 2px 8px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.08)"
                    : "none",
                  opacity: app.canOpen ? 1 : 0.4,
                  background: app.canOpen ? "transparent" : "rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src={`/images/${app.icon}`}
                  alt={app.name}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </div>
              <span
                className="text-[11px] font-medium text-center text-white leading-tight max-w-[72px] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]"
              >
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Page dots */}
        {pageCount > 1 && (
          <div className="flex justify-center gap-[6px] mt-4">
            {Array.from({ length: pageCount }).map((_, i) => (
              <div
                key={i}
                className="h-[7px] rounded-[4px] transition-all duration-250 ease-out"
                style={{
                  width: i === currentPage ? 18 : 7,
                  background: i === currentPage
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ===== DOCK (iPhone 16 Style) ===== */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-around w-[92%] h-[88px] bg-white/22 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[32px] border border-white/18 shadow-[0_8px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] px-[10px]">
        {dockApps
          .filter((a) => a.canOpen)
          .slice(0, 4)
          .map((app) => (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="active:scale-[0.82] transition-transform duration-150 w-[58px] h-[58px] rounded-[14px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </button>
          ))}
      </footer>

      {/* ===== HOME INDICATOR ===== */}
      <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full z-50 w-[134px] h-[5px] bg-white/55" />
    </div>
  );
};

export default MobileOS;
