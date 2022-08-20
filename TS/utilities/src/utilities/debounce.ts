import React from "react";

export type CallbackType = (...args: Array<unknown>) => void;

export const debounce = <Callback extends CallbackType>(
  fn: Callback,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<Callback>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const useDebounce = <Callback extends CallbackType>(
  callbackFn: Callback,
  delay: number
) => {
  const callbackRef = React.useRef(callbackFn); // Creates a latest ref
  React.useEffect(() => {
    // Use the latest version of the callback
    callbackRef.current = callbackFn;
  });

  return React.useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );
};
