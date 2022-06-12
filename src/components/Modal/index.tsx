import React from 'react';

import * as S from './styles';

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onRequestClose }) => (
  <S.Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false}
    shouldCloseOnEsc
    shouldCloseOnOverlayClick
    style={{
        overlay: {
          zIndex: 9,
        },
      }}
  >
    {children}
  </S.Modal>
  );
