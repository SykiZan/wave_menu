import classes from "./App.module.scss";
import WaveNavbar2 from "./components/menuExp/WaveNavbar";
import WaveNavbar from "./components/menuNew/WaveNavbar";

function App() {
  return (
    <div className={classes.wrapper}>
      <WaveNavbar />

      <main className={classes.bodyPanel}>
        <div className={classes.inner}>
          {" "}
          <WaveNavbar2 />
        </div>
      </main>
    </div>
  );
}

export default App;
