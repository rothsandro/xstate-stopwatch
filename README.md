# XState Stopwatch

Implement a simple stopwatch using XState + React.

https://github.com/rothsandro/xstate-stopwatch/assets/16229645/f0cc3525-4d24-40d8-af1b-06e6ce48ad35

## Requirements

- It's stopped by default and shows "0" seconds.
- Start button
  - It starts the stopwatch and increments the time every second.
  - It shows a confetti effect (use the `letsGetThePartyStarted()` function)
  - It's disabled if the stopwatch is already started.
- Stop button
  - It stops the stopwatch.
  - It's disabled if the stopwatch is already stopped.
- Reset button
  - It stops the stopwatch (if started)
  - It resets the time to "0" seconds.
  - It's disabled if the time is already "0" seconds.
