import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color = 'default',
  ...rest
}) => (
  <Container color={color} type="button" disabled={loading} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
