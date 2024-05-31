import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

const TimerChallange = ({ title, targetTime }) => {
  let timer = useRef();
  let dialog = useRef();

  const [timeRemaning, setTimeRemaning] = useState(targetTime * 1000);
  const timerIsActive = timeRemaning > 0 && timeRemaning < targetTime * 1000;
  if (timeRemaning <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleReset() {
    setTimeRemaning(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaning((prevTimeRemaning) => prevTimeRemaning - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();

    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remaningTime={timeRemaning}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds
          {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "stop" : "start"} challange
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? " Time is Running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallange;
