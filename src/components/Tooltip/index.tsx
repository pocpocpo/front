import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => (
  <Container>
    {children}
    <span>{title}</span>
  </Container>
);

export default Tooltip;
