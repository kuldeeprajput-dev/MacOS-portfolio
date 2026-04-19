import React from "react";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { Search, Heart, MapPin, Users, Star, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const tabIcons = {
  Library: <Clock size={20} />,
  Memories: <Star size={20} />,
  Places: <MapPin size={20} />,
  People: <Users size={20} />,
  Favorites: <Heart size={20} />,
};

const Photos = () => {
  const { openWindow } = useWindowsStore();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("Library");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          <WindowControls target="photos" />
          <h1
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
            }}
          >
            Photos
          </h1>
          <Search size={20} className="text-blue-500" />
        </div>

        <div
          className="photos-main"
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              padding: "8px 12px 4px",
              gap: 0,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {photosLinks.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => setActiveTab(title)}
                className="flex-shrink-0"
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: activeTab === title ? "#007AFF" : "transparent",
                  color: activeTab === title ? "#fff" : "#007AFF",
                  fontSize: 13,
                  fontWeight: 500,
                  border: "none",
                  marginRight: 6,
                  transition: "all 0.2s ease",
                }}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Date section header (iOS Photos style) */}
          <div style={{ padding: "16px 16px 6px" }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>
              Library
            </p>
            <p style={{ fontSize: 15, color: "#8e8e93", marginTop: 2 }}>
              {gallery.length} Photos
            </p>
          </div>

          {/* Photo Grid (iOS style: 3 columns, square crops) */}
          <div style={{ padding: "4px 2px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              {gallery.map(({ id, img }) => (
                <button
                  key={id}
                  onClick={() =>
                    openWindow("imgfile", {
                      id,
                      name: "Gallery image",
                      icon: "/images/image.png",
                      kind: "file",
                      fileType: "img",
                      imageUrl: img,
                    })
                  }
                  style={{
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    background: "#e5e5ea",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={img}
                    alt={`Gallery image ${id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* iOS-style bottom tab bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "8px 0 24px",
            background: "rgba(249,249,249,0.94)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "0.5px solid #e5e5ea",
            flexShrink: 0,
          }}
        >
          {photosLinks.slice(0, 4).map(({ id, title }) => (
            <button
              key={id}
              onClick={() => setActiveTab(title)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                background: "none",
                border: "none",
                padding: "4px 12px",
              }}
            >
              <div
                style={{
                  color: activeTab === title ? "#007AFF" : "#8e8e93",
                  transition: "color 0.2s",
                }}
              >
                {tabIcons[title] || <Star size={22} />}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: activeTab === title ? "#007AFF" : "#8e8e93",
                  fontWeight: activeTab === title ? 500 : 400,
                }}
              >
                {title}
              </span>
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target={"photos"} />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Search className="icon" />
        </div>
      </div>
      <div className="flex w-full photos-main">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img src={img} alt={`Gallery image ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
const PhotosWindow = windowWrapper(Photos, "photos");
PhotosWindow.displayName = "Photos";
export default PhotosWindow;
