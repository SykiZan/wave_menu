import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./WaveNavbar.module.scss";

export default function NavWaveItem({ label }) {
  const [hovered, setHovered] = useState(false);

  const vbW = 1000;
  const vbH = 120;

  // same structure => smooth morph
  const dBar = `
    M 0 ${vbH}
    L 0 110
    C 250 110, 375 110, 500 110
    C 625 110, 750 110, 1000 110
    L 1000 ${vbH}
    Z
  `;

  const dWave = `
    M 0 ${vbH}
    L 0 92
    C 180 92, 360 34, 500 34
    C 640 34, 820 92, 1000 92
    L 1000 ${vbH}
    Z
  `;

  return (
    <li className={styles.item}>
      {/* THIS is the hover box (like your .card) */}
      <div
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button type="button" className={styles.link} onClick={()=>{console.log(label)}}>
          {label}
        </button>

        {/* SVG is ALWAYS present (like BellWavePerfect2) */}
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
    </li>
  );
}
