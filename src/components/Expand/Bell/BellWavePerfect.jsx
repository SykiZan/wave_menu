import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./BellWavePerfect.module.scss";

export default function BellWavePerfect2({
  width = 420,
  height = 220,
  text = "Hover me",
}) {
  const [hovered, setHovered] = useState(false);

  // Fixed viewBox for consistent curve math
  const vbW = 1000;
  const vbH = 120;

  // FLAT BAR (same structure as wave: M L C C L Z)
  const dBar = `
  M 0 ${vbH}
  L 0 110
  C 250 110, 375 110, 500 110
  C 625 110, 750 110, 1000 110
  L 1000 ${vbH}
  Z
`;

  // MID-SHARP GAUSSIAN (single peak, steeper but not needle)
  const dWave = `
  M 0 120
  L 0 92

  C 180 92, 360 34, 500 34
  C 640 34, 820 92, 1000 92

  L 1000 120
  Z
`;

  return (
    <div
      className={styles.card}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <span className={styles.link}>menu item</span>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          className={styles.path}
          initial={false}
          animate={{ d: hovered ? dWave : dBar }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 16,
            mass: 1.2,
          }}
        />
      </svg>
    </div>
  );
}
