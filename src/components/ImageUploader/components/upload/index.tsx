import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['translations']);
  const onDrop = useCallback(onUpload, []);

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) return <UploadMessage>{t('imageUploader.drag_files_here')}</UploadMessage>;

    if (isDragReject) return <UploadMessage type="error">{t('imageUploader.archive_not_supported')}</UploadMessage>;

    return <UploadMessage type="success">{t('imageUploader.drop_archive')}</UploadMessage>;
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
