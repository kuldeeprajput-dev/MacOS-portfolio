import useWindowsStore from "#store/window";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowsStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <button
        onClick={() => closeWindow(target)}
        className="flex items-center gap-0.5 text-[#007AFF] active:opacity-50"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: 17,
          fontWeight: 400,
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
        <span style={{ marginLeft: -4 }}>Back</span>
      </button>
    );
  }

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
