// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import styles from "./WaveNavbar.module.scss";

// export default function NavWaveItem({ label }) {
//   const [hovered, setHovered] = useState(false);

//   const vbW = 1000;
//   const vbH = 120;

//   // 1) BASE: always present, just a flat cut-out area.
//   // Make this match the "resting" line you want under the nav item.
//   // The important part: it ALWAYS goes to vbH (bottom).
//   const dBase = `
//     M 0 ${vbH}
//     L 0 112
//     L 1000 112
//     L 1000 ${vbH}
//     Z
//   `;

//   // 2) BUMP: only the curved part above the base line.
//   // It also closes to vbH, but we’ll animate it; base stays put so bottom never lifts.
//   const dBump = `
//     M 0 ${vbH}
//     L 0 112
//     C 220 112, 330 76, 500 76
//     C 670 76, 780 112, 1000 112
//     L 1000 ${vbH}
//     Z
//   `;

//   return (
//     <li className={styles.item}>
//       <div
//         className={styles.card}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <button type="button" className={styles.link}>
//           {label}
//         </button>

//         <svg
//           className={styles.svg}
//           viewBox={`0 0 ${vbW} ${vbH}`}
//           preserveAspectRatio="none"
//           aria-hidden="true"
//         >
//           {/* Base fill (never animates) */}
//           <path className={styles.path} d={dBase} />

//           {/* Animated bump */}
//           <motion.path
//             className={styles.path}
//             d={dBump}
//             style={{
//               transformBox: "fill-box",
//               transformOrigin: "50% 100%", // scale from bottom
//             }}
//             initial={false}
//             animate={hovered ? { scaleY: 1 } : { scaleY: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 240,
//               damping: 18,
//               mass: 0.9,
//             }}
//           />
//         </svg>
//       </div>
//     </li>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./WaveNavbar.module.scss";

export default function NavWaveItem({ label }) {
  const [hovered, setHovered] = useState(false);

  const vbW = 1000;
  const vbH = 120;

  const dWave = `
    M 0 ${vbH}
    L 0 112
    C 220 112, 330 76, 500 76
    C 670 76, 780 112, 1000 112
    L 1000 ${vbH}
    Z
  `;

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

        <div className={styles.wavePos}>
          <motion.div
            className={styles.waveWrap}
            initial={false}
            animate={hovered ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
              mass: 0.9,
            }}
          >
            <svg
              className={styles.svg}
              viewBox={`0 0 ${vbW} ${vbH}`}
              preserveAspectRatio="none"
            >
              <path className={styles.path} d={dWave} />
            </svg>
          </motion.div>
        </div>
      </div>
    </li>
  );
}
