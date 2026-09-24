"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/components/effects/SmoothScroll";
import Icon from "@/components/ui/Icon";

/** Square accent button, shown once the visitor has scrolled a screen's worth. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      className={visible ? "back-to-top visible" : "back-to-top"}
      aria-label="Back to top"
      tabIndex={visible ? undefined : -1}
      onClick={toTop}
    >
      <Icon name="arrowUp" />
    </button>
  );
}
