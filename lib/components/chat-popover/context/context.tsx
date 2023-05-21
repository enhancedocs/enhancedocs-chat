import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type PopoverContextValue = {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
};

export const PopoverContext = createContext<PopoverContextValue>({
  isFullScreen: false,
  setIsFullScreen: () => false
});

type PopoverProviderProps = {
  children: ReactNode;
}

export function PopoverProvider ({ children }: PopoverProviderProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <PopoverContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </PopoverContext.Provider>
  );
}
