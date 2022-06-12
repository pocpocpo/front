import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Controller } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, StyledSelect } from './styles';

interface SelectProps {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
  error?: any;
  options: any;
  placeholder: string;
  control: any;
}

const Select: React.FC<SelectProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  control,
  error,
  options,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, ref, ...field } }) => (
          <StyledSelect
            {...rest}
            {...field}
            options={options}
            ref={(e) => {
              ref(e);
              inputRef.current = e; // you can still assign to ref
            }}
            value={options.find((c: any) => c.value === value)}
            onChange={(e: any) => onChange(e.value)}
            styles={{
              input: (provided) => ({ ...provided, height: '19px' }),
              control: (provided) => ({
                ...provided,
                minHeight: '19px',
                height: '19px',
                border: '0',
              }),
              valueContainer: (provided) => ({ ...provided, height: '19px' }),
              indicatorsContainer: (provided) => ({
                ...provided,
                height: '19px',
              }),
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        )}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
