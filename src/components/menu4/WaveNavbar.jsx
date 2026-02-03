import React, { useState } from "react";
import NavWaveItem from "./NavWaveItem";
import styles from "./WaveNavbar.module.scss";

export default function WaveNavbar4({
  items = ["Dashboard", "Administration", "Luigisamiros"],
  pageBg = "#ffffff",
  defaultActive = "Administration", // or null
  allowToggleOff = false,      // set true if clicking active item should close it
  onChange,                    // optional callback (label) => void
}) {
  const [active, setActive] = useState(defaultActive);

  const handleActivate = (label) => {
    setActive((prev) => {
      const next = allowToggleOff && prev === label ? null : label;
      onChange?.(next);
      return next;
    });
  };

  return (
    <nav className={styles.nav} style={{ ["--page-bg"]: pageBg }}>
      <span className={styles.version}>HOVER DIFFERENT</span>
      <ul className={styles.menu}>
        {items.map((label) => (
          <NavWaveItem
            key={label}
            label={label}
            isActive={active === label}
            onActivate={handleActivate}
          />
        ))}
      </ul>
    </nav>
  );
}
