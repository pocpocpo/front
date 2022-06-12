import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  position: relative;

  /* border: 2px solid #5345fc; */
  border: 2px solid #1c2321;
  color: #1c2321;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #4238b0;
      border-color: #4238b0;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #4238b0;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0 solid transparent;
    color: #1c2321;
    min-height: 100%;
    max-width: 73%;
    min-height: 21px;

    &::placeholder {
      color: #b7b5e4;
    }

    &:focus {
      outline: none;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  right: 0;
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
