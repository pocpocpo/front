import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})<{ isDragActive: boolean; isDragReject: boolean }>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 10px auto;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

interface IObjectKeys {
  [key: string]: string
}

interface IMessageColors extends IObjectKeys {
  default: string
  error: string
  success: string
}

const messageColors: IMessageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p<{type?: string}>`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  height: 100%;
`;

export const Preview = styled.div<{src: string}>`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
  transition: 0.2s;

  ${(props) => props.src && css`
  &:hover {

    &::after {
      display: flex;
      height: 100%;
      align-items: center;
      /* content: 'trocar imagem'; */
      color: #fff;
    }
  }`}
`;

export const UniqueFilePreview = styled.div`
  position: relative;
`;
