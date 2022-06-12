import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropContainer, UploadMessage, Preview, UniqueFilePreview } from './styles';

interface UploadProps {
  onUpload: (files: File[]) => void;
  uploadedFiles: Array<{
    file: any;
    id: string;
    name: any;
    readableSize: string;
    preview: string;
    progress: number;
    uploaded: boolean;
    error: boolean;
    url: null;
  }>;
}

const Upload: React.FC<UploadProps> = ({ onUpload, uploadedFiles }) => {
  const onDrop = useCallback(onUpload, []);

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;

    if (isDragReject) return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ onDrop, accept: 'image/jpeg,image/png' });

  return (
    <DropContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
    >
      <UniqueFilePreview>
        <Preview src={uploadedFiles[0]?.preview} />
        <input {...getInputProps()} src={uploadedFiles[0]?.preview} />
      </UniqueFilePreview>

      {renderDragMessage(isDragActive, isDragReject)}
    </DropContainer>
);
};

export default Upload;
