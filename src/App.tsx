import { FC } from "react";
import "./App.css";
import { assign, fromCallback, setup } from "xstate";
import { useMachine } from "@xstate/react";
import { createBrowserInspector } from "@statelyai/inspect";
import { letsGetThePartyStarted } from "./party";

// Debugging (allow popups in your browser!)
const { inspect } = createBrowserInspector();

// Setup and create the machine
const machine = setup({
  types: {} as {
    context: {
      time: number;
    };
    events:
      | { type: "START" }
      | { type: "STOP" }
      | { type: "RESET" }
      | { type: "TICK" };
  },
  actions: {
    showEffect: letsGetThePartyStarted,
  },
  actors: {
    timer: fromCallback(({ sendBack }) => {
      const timer = setInterval(() => sendBack({ type: "TICK" }), 1000);
      return () => clearInterval(timer);
    }),
  },
}).createMachine({
  context: {
    time: 0,
  },
  initial: "stopped",
  states: {
    stopped: {
      on: {
        START: "running",
      },
    },
    running: {
      entry: "showEffect",
      invoke: {
        src: "timer",
      },
      on: {
        STOP: "stopped",
        TICK: {
          actions: assign({
            time: (x) => x.context.time + 1000,
          }),
        },
      },
    },
  },
  on: {
    RESET: {
      target: ".stopped",
      actions: assign({ time: 0 }),
      guard: (x) => x.context.time > 0,
    },
  },
});

const App: FC = () => {
  const [snapshot, send] = useMachine(machine, { inspect });

  return (
    <>
      <h1>Stopwatch</h1>
      <div>Time: {snapshot.context.time / 1000}s</div>
      <div className="actions">
        <button
          onClick={() => send({ type: "START" })}
          disabled={!snapshot.can({ type: "START" })}
        >
          Start
        </button>
        <button
          onClick={() => send({ type: "STOP" })}
          disabled={!snapshot.can({ type: "STOP" })}
        >
          Stop
        </button>
        <button
          onClick={() => send({ type: "RESET" })}
          disabled={!snapshot.can({ type: "RESET" })}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default App;
