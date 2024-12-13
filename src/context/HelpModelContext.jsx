import React, { createContext, useContext, useState } from "react";

const HelpModalContext = createContext();

export const useHelpModal = () => {
  return useContext(HelpModalContext);
};

export const HelpModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openHelpModal = () => setIsOpen(true);
  const closeHelpModal = () => setIsOpen(false);

  return (
    <HelpModalContext.Provider
      value={{ isOpen, openHelpModal, closeHelpModal }}
    >
      {children}
    </HelpModalContext.Provider>
  );
};
