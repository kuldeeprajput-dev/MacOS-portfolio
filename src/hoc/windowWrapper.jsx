import useWindowsStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useRef, useState, useEffect } from "react";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowsStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const prevOpenRef = useRef(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useGSAP(() => {
      const el = ref.current;
      if (!el || isMobile) return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, [isMobile]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || isMobile) return;
      if (isOpen && !prevOpenRef.current) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          { scale: 0.88, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: "power3.out" }
        );
      } else if (!isOpen) {
        el.style.display = "none";
      }
      prevOpenRef.current = isOpen;
    }, [isOpen, isMobile]);

    const mobileStyles = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100dvw",
      height: "100dvh",
      zIndex: isOpen ? zIndex : -1,
      background: "#f2f2f7",
      flexDirection: "column",
      overflow: "hidden",
      display: "flex",
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
      transform: isOpen ? "translateY(0)" : "translateY(100%)",
      transition:
        "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.35s ease",
      border: "none",
      outline: "none",
      boxShadow: "none",
      borderRadius: 0,
    };

    const desktopStyles = {
      zIndex,
      display: isOpen ? "block" : "none",
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={isMobile ? mobileStyles : desktopStyles}
        className={isMobile ? "" : "absolute"}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default windowWrapper;
