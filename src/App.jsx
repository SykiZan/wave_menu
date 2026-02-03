import classes from "./App.module.scss";
import WaveNavbar3 from "./components/menu3/WaveNavbar";
import WaveNavbar4 from "./components/menu4/WaveNavbar";
import WaveNavbar5 from "./components/menu5/WaveNavbar";
import WaveNavbar2 from "./components/menuExp/WaveNavbar";

import WaveNavbar from "./components/menuNew/WaveNavbar";

function App() {
  return (
    <div className={classes.wrapper}>
      <WaveNavbar />

      <main className={classes.bodyPanel}>
        <div className={classes.inner}>
          <WaveNavbar2 />
          <WaveNavbar4 />
          {/* <WaveNavbar5 /> */}
        </div>
      </main>
    </div>
  );
}

export default App;
