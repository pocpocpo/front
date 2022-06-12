import React, { createContext, useContext, useMemo, useState } from 'react';
import type { SetStateAction, Dispatch } from 'react';

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), []);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
