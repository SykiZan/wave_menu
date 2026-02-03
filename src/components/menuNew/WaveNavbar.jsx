import React from "react";
import NavWaveItem from "./NavWaveItem";
import styles from "./WaveNavbar.module.scss";

export default function WaveNavbar({
  items = ["Dashboard", "Administration", "Luigisamiros"],
  pageBg = "#ffffff",
}) {
  return (
    <nav className={styles.nav} style={{ ["--page-bg"]: pageBg }}>
      <span className={styles.version}>HOVER VERSION</span>
      <ul className={styles.menu}>
        {items.map((label) => (
          <NavWaveItem key={label} label={label} />
        ))}
      </ul>
    </nav>
  );
}
