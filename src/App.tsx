import { FC } from "react";
import "./App.css";
import { setup } from "xstate";
import { useMachine } from "@xstate/react";
import { createBrowserInspector } from "@statelyai/inspect";

// Debugging (allow popups in your browser!)
const { inspect } = createBrowserInspector();

const machine = setup({}).createMachine({});

const App: FC = () => {
  const [snapshot, send] = useMachine(machine, { inspect });

  return (
    <>
      <h1>Stopwatch</h1>
      <div>Time: {0}</div>
      <div className="actions">
        <button>Start</button>
        <button disabled>Stop</button>
        <button disabled>Reset</button>
      </div>
    </>
  );
};

export default App;
