import ReactModal from 'react-modal';
import styled from 'styled-components';

export const Modal = styled(ReactModal)`
  background-color: #fff;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
