import WindowControls from "#components/WindowControls";
import { locations } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useLocationStore from "#store/location";
import useWindowsStore from "#store/window";
import clsx from "clsx";
import { Search, ChevronRight, Folder, FileText, Globe, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

const fileIconMap = {
  folder: <Folder size={28} className="text-blue-500" />,
  txt: <FileText size={28} className="text-gray-500" />,
  url: <Globe size={28} className="text-blue-500" />,
  img: <ImageIcon size={28} className="text-green-500" />,
  fig: <Globe size={28} className="text-gray-700" />,
  pdf: <FileText size={28} className="text-red-500" />,
};

const Finder = () => {
  const { openWindow } = useWindowsStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [navStack, setNavStack] = useState([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") {
      if (isMobile) {
        setNavStack((prev) => [...prev, activeLocation]);
      }
      return setActiveLocation(item);
    }
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const goBack = () => {
    if (navStack.length > 0) {
      const prev = navStack[navStack.length - 1];
      setNavStack((s) => s.slice(0, -1));
      setActiveLocation(prev);
    }
  };

  if (isMobile) {
    return (
      <>
        <div
          id="window-header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 16px",
            background: "#f2f2f7",
            borderBottom: "1px solid #e5e5ea",
            gap: 10,
            minHeight: 52,
          }}
        >
          <WindowControls target="finder" />
          <h1
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
            }}
          >
            {activeLocation?.name || "Files"}
          </h1>
          <Search size={20} className="text-blue-500" />
        </div>

        <div
          className="finder-main"
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f7",
          }}
        >
          {/* Location sections */}
          <div style={{ padding: "20px 16px 8px" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#6d6d72",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Favorites
            </p>
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {Object.values(locations).map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setNavStack((prev) => [...prev, activeLocation]);
                    setActiveLocation(item);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 16px",
                    background:
                      item.id === activeLocation?.id
                        ? "#e8f0fe"
                        : "transparent",
                    borderBottom:
                      index < Object.values(locations).length - 1
                        ? "0.5px solid #e5e5ea"
                        : "none",
                    gap: 14,
                    textAlign: "left",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: 30, height: 30, borderRadius: 7 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#000",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Current folder content */}
          {activeLocation?.children && activeLocation.children.length > 0 && (
            <div style={{ padding: "24px 16px 8px" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6d6d72",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 8,
                }}
              >
                {activeLocation.name}
              </p>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {activeLocation.children.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openItem(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      borderBottom:
                        index < activeLocation.children.length - 1
                          ? "0.5px solid #e5e5ea"
                          : "none",
                      gap: 14,
                      textAlign: "left",
                    }}
                  >
                    {item.kind === "folder" ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        style={{ width: 30, height: 30, borderRadius: 7 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 7,
                          background: "#f2f2f7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {fileIconMap[item.fileType] || (
                          <FileText size={20} className="text-gray-400" />
                        )}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                          color: "#000",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.kind === "folder" && (
                        <p style={{ fontSize: 12, color: "#8e8e93" }}>
                          {item.children?.length || 0} items
                        </p>
                      )}
                    </div>
                    {item.kind === "folder" && (
                      <ChevronRight size={18} className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target={"finder"} />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full finder-main">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>
              {Object.values(locations).map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveLocation(item)}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active"
                  )}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>
              {locations.work.children.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveLocation(item)}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active"
                  )}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
