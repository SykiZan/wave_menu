import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styles from "./WaveNavbar.module.scss";

export default function NavWaveItem({ label }) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimationControls();

  // const vbW = 1000;
  // const vbH = 120;

  // const dWave = `
  //   M 0 ${vbH}
  //   L 0 112
  //   C 220 112, 330 76, 500 76
  //   C 670 76, 780 112, 1000 112
  //   L 1000 ${vbH}
  //   Z
  // `;

  const vbW = 1000;
const vbH = 120;

const yBase = 112;  // where it meets the nav bottom line
const yPeak = 76;   // peak height
const r = 80;       // shoulder radius (bigger => smoother ends)

const dWave = `
  M 0 ${vbH}
  L 0 ${yBase + 6}

  C 0 ${yBase}, ${r * 0.35} ${yBase}, ${r} ${yBase}

  C 220 ${yBase}, 330 ${yPeak}, 500 ${yPeak}
  C 670 ${yPeak}, 780 ${yBase}, ${vbW - r} ${yBase}

  C ${vbW - r * 0.35} ${yBase}, ${vbW} ${yBase}, ${vbW} ${yBase + 6}

  L ${vbW} ${vbH}
  Z
`;


  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (hovered) {
        // Enter: uniform grow with a tiny jelly overshoot
        await controls.start({
          scaleY: 1,
          scaleX: 1,
          transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.9 },
        });
      } else {
        // Exit: FALL → small TIP → disappear
        await controls.start({
          scaleY: 0,
          scaleX: 1.02,
          transition: { type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        });

        if (cancelled) return;

        // tiny tip pops back up AFTER it reached 0
        // await controls.start({
        //   scaleY: 0.38, // tip height (try 0.08–0.18)
        //   scaleX: 0.33,
        //   transition: { type: "tween", duration: 0.1, ease: [0.22, 1, 0.36, 1] },
        // });

        if (cancelled) return;
        await controls.start({
          scaleY: 0.24, // tip height (try 0.08–0.18)
          scaleX: 0.24,
          transition: { type: "tween", duration: 0.1, ease: [0.22, 1, 0.36, 1] },
        });

        if (cancelled) return;

        // settle back to 0
        await controls.start({
          scaleY: 0,
          scaleX: 1,
          transition: { type: "tween", duration: 0.10, ease: [0.4, 0, 0.2, 1] },
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

        {/* IMPORTANT: wrapper gets transformed, not the SVG */}
        <motion.div className={styles.waveWrap} initial={{ scaleY: 0 }} animate={controls}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className={styles.path} d={dWave} />
          </svg>
        </motion.div>
      </div>
    </li>
  );
}
