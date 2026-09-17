"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SiteState = {
  /** True once the preloader has started its exit — entrance timelines wait for this. */
  ready: boolean;
  setReady: (value: boolean) => void;
};

const SiteContext = createContext<SiteState>({ ready: true, setReady: () => {} });

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <SiteContext.Provider value={{ ready, setReady }}>{children}</SiteContext.Provider>;
}
