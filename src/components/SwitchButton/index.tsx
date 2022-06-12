import React, { InputHTMLAttributes } from 'react';

import { Container, Input, Slider } from './styles';

interface SwitchButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  onChange?: (value: any) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ register, ...rest }) => (
  <Container>
    <Input type="checkbox" {...register('role')} {...rest} />
    <Slider />
  </Container>
);

export default SwitchButton;
