import { atom } from "jotai";

export const counterAtom = atom(0);

counterAtom.debugLabel = "counter";

export const incrementAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) + 1);
});

export const decrementAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) - 1);
});

export const resetAtom = atom(null, (get, set) => {
  set(counterAtom, 0);
});

export const incrementByAtom = atom(null, (get, set, by: number) => {
  set(counterAtom, get(counterAtom) + by);
});
