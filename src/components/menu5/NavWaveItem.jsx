import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styles from "./WaveNavbar.module.scss";

export default function NavWaveItem({ label }) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimationControls();

  const vbW = 1000;
  const vbH = 120;

  // Top of the rounded rectangle (this is where the bump starts/ends)
  const yTop = 112;

  // Peak height (smaller => taller bump)
  const yPeak = 76;

  // "Width" of the bump shoulder inside the viewBox
  const left = 80;
  const right = vbW - 80;

  // Bump only (no "fill to bottom" walls)
  const dBump = `
    M ${left} ${yTop}
    C 260 ${yTop}, 340 ${yPeak}, 500 ${yPeak}
    C 660 ${yPeak}, 740 ${yTop}, ${right} ${yTop}
    L ${left} ${yTop}
    Z
  `;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (hovered) {
        await controls.start({
          scaleY: 1,
          scaleX: 1,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 18,
            mass: 0.9,
          },
        });
      } else {
        await controls.start({
          scaleY: 0,
          scaleX: 1.02,
          transition: { type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        });

        if (cancelled) return;

        await controls.start({
          scaleY: 0.45,
          scaleX: 0.92, // <-- keep sane; don't crush to 0.45
          transition: {
            type: "tween",
            duration: 0.15,
            ease: [0.22, 1, 0.36, 1],
          },
        });

        if (cancelled) return;

        await controls.start({
          scaleY: 0.3,
          scaleX: 1.02,
          transition: {
            type: "tween",
            duration: 0.17,
            ease: [0.22, 1, 0.36, 1],
          },
        });

        if (cancelled) return;

        await controls.start({
          scaleY: 0,
          scaleX: 1,
          transition: { type: "tween", duration: 0.1, ease: [0.4, 0, 0.2, 1] },
        });
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [hovered, controls]);

  return (
    <li className={styles.item}>
      <div
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button type="button" className={styles.link}>
          {label}
        </button>

        <motion.div
          className={styles.waveWrap}
          initial={{ scaleY: 0 }}
          animate={controls}
        >
          <svg
            className={styles.svg}
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* 1) Rounded base (pill) */}
            <rect
              x="0"
              y={yTop}
              width={vbW}
              height={vbH - yTop}
              rx="40" // corner roundness in viewBox units
              ry="40"
              className={styles.path}
            />

            {/* 2) Bump sitting on top of the pill */}
            <path className={styles.path} d={dBump} />
          </svg>
        </motion.div>
      </div>
    </li>
  );
}
