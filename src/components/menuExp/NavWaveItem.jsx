import React from "react";
import { motion } from "framer-motion";
import styles from "./WaveNavbar.module.scss";

export default function NavWaveItem({
  label,
  isActive,
  onActivate,
}) {
  const vbW = 1000;
  const vbH = 120;

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
      <div className={styles.card}>
        <button
          type="button"
          className={styles.link}
          onClick={() => onActivate(label)}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </button>

        <svg
          className={styles.svg}
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            className={styles.path}
            initial={false}
            animate={{ d: isActive ? dWave : dBar }}
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
