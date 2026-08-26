// components/Toggle.tsx
// This component should receive `isOn` (boolean) and `onToggle` (function that takes no arguments and returns void)
// The onToggle function should change the value of `isOn` meaning you n eed to pass state down ;)

import type { MouseEventHandler } from 'react';

type ToggleProps = {
  isOn: boolean;
  // onToggle: () => void;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};

// type Beispiel = {
//   strToNum: (s: string) => number;
// };

const Toggle = ({ isOn, onToggle }: ToggleProps) => {
  return <button onClick={onToggle}>{isOn ? 'ON' : 'OFF'}</button>;
};

export default Toggle;
