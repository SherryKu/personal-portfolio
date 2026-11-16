"use client";

import { useId, useState } from "react";
import styles from "./OctavatePreview.module.css";

const artists = [
  {
    name: "Mira Vale",
    label: "Field Notes Records",
    genre: "Indie pop",
    weeklyListeners: [8300, 10400, 9700, 13900, 15600, 18200],
  },
  {
    name: "Northline",
    label: "Parallel Sound",
    genre: "Electronic",
    weeklyListeners: [14700, 12600, 14100, 15300, 17400, 16800],
  },
  {
    name: "June Arcade",
    label: "Field Notes Records",
    genre: "Alternative",
    weeklyListeners: [5100, 5400, 7100, 6900, 8600, 10300],
  },
];

const number = new Intl.NumberFormat("en-US");
const maxListeners = 20_000;

export function OctavatePreview() {
  const artistId = useId();
  const headingId = useId();
  const [selection, setSelection] = useState(0);
  const artist = artists[selection];
  const latest = artist.weeklyListeners.at(-1)!;
  const labelRoster = artists.filter(({ label }) => label === artist.label);

  return (
    <section className={styles.preview} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h4 id={headingId}>Artist Analytics</h4>
        <p>Illustrative preview · Sample data</p>
      </header>
      <div className={styles.filter}>
        <label htmlFor={artistId}>Artist</label>
        <select id={artistId} value={selection} onChange={(event) => setSelection(Number(event.target.value))}>
          {artists.map(({ name }, index) => <option key={name} value={index}>{name}</option>)}
        </select>
      </div>
      <div className={styles.panels} aria-live="polite">
        <div className={styles.chartPanel}>
          <p>{artist.genre}</p>
          <p className={styles.metric}><strong>{number.format(latest)}</strong> weekly listeners</p>
          <ol className={styles.chart} aria-label="Weekly listeners over six weeks">
            {artist.weeklyListeners.map((count, index) => (
              <li key={index} aria-label={`Week ${index + 1}, ${number.format(count)} listeners`}>
                <div className={styles.track} aria-hidden="true">
                  <div className={styles.bar} style={{ height: `${count / maxListeners * 100}%` }} />
                </div>
                <span aria-hidden="true">W{index + 1}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.labelPanel}>
          <h5>Label insights</h5>
          <p className={styles.labelName}>{artist.label}</p>
          <p>Artists in this sample</p>
          <ul className={styles.roster}>
            {labelRoster.map(({ name }) => <li key={name}>{name}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
