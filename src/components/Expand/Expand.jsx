import React, { useRef } from "react";
import styles from "./BellWavePerfect.module.scss";

export default function BellWavePerfect({
  width = 320,
  height = 160,
  barHeight = 10,
  waveHeight = 100,
  text = "Hover me",
}) {
  const animInRef = useRef(null);
  const animOutRef = useRef(null);

  const onEnter = () => animInRef.current?.beginElement();
  const onLeave = () => animOutRef.current?.beginElement();

  // We use a fixed SVG viewBox and compute Y positions as percentages
  // to keep the curve looking consistent at any size.
  const vbW = 1000;
  const vbH = 120;

  const yBottom = vbH;
  const yBarTop = vbH - (barHeight / height) * vbH; // bar top
  const yWaveSide = vbH - (waveHeight / height) * vbH * 0.55; // sides of bell
  const yWaveMid = vbH - (waveHeight / height) * vbH; // peak of bell (highest)

  // IMPORTANT: both "d" strings have the same command structure
  // so the path can morph smoothly.
  const dBar = `
    M 0 ${yBottom}
    L 0 ${yBarTop}
    C 200 ${yBarTop}, 300 ${yBarTop}, 400 ${yBarTop}
    C 500 ${yBarTop}, 500 ${yBarTop}, 500 ${yBarTop}
    C 500 ${yBarTop}, 500 ${yBarTop}, 600 ${yBarTop}
    C 700 ${yBarTop}, 800 ${yBarTop}, 1000 ${yBarTop}
    L 1000 ${yBottom}
    Z
  `;

  const dWave = `
    M 0 ${yBottom}
    L 0 ${yWaveSide}
    C 180 ${yWaveSide}, 260 ${yWaveMid}, 400 ${yWaveMid}
    C 460 ${yWaveMid}, 480 ${yWaveMid}, 500 ${yWaveMid}
    C 520 ${yWaveMid}, 540 ${yWaveMid}, 600 ${yWaveMid}
    C 740 ${yWaveMid}, 820 ${yWaveSide}, 1000 ${yWaveSide}
    L 1000 ${yBottom}
    Z
  `;

  return (
    <div
      className={styles.card}
      style={{ width, height }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className={styles.label}>{text}</span>

      <svg
        className={styles.svg}
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className={styles.path} d={dBar}>
          {/* Morph IN */}
          <animate
            ref={animInRef}
            attributeName="d"
            dur="420ms"
            fill="freeze"
            begin="indefinite"
            calcMode="spline"
            keySplines="0.2 0.9 0.2 1"
            values={`${dBar};${dWave}`}
          />
          {/* Morph OUT */}
          <animate
            ref={animOutRef}
            attributeName="d"
            dur="420ms"
            fill="freeze"
            begin="indefinite"
            calcMode="spline"
            keySplines="0.2 0.9 0.2 1"
            values={`${dWave};${dBar}`}
          />
        </path>
      </svg>
    </div>
  );
}
