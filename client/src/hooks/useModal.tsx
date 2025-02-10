import { useState } from "react";

type UseModalReturn = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (initialState = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
