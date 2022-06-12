import styled from 'styled-components';

import { shade } from 'polished';

interface ButtonProps {
  color: string;
}

const colorMap: { [key: string]: string } = {
  default: '#5345fc',
  danger: '#e74c3c',
};

export const Container = styled.button<ButtonProps>`
  background: ${({ color }) => colorMap[color]};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ color }) => shade(0.2, colorMap[color])};
  }

  &:disabled {
    opacity: 0.6;
  }
`;
