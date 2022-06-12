import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, ErrorWrapper } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
  error?: any;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  register,
  error,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { ref, ...restRegister } = register(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [inputRef]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}

      <input
        {...rest}
        {...restRegister}
        {...register(name)}
        ref={(e) => {
          ref(e);
          inputRef.current = e; // you can still assign to ref
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {error && (
        <ErrorWrapper>
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        </ErrorWrapper>
      )}
    </Container>
  );
};

export default Input;
