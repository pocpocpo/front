import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { Container, FileInfo, Preview } from './styles';

interface FileList {
  files: any[]
  onDelete: (id: string) => void
}
const { t } = useTranslation(['translations']);

const FileList: React.FC<FileList> = ({ files = [], onDelete }) => (
  <Container>
    {files.map((uploadedFile: {
      id: string;
      preview: string;
      name: string;
      readableSize: string;
      url: string | undefined;
      uploaded: boolean;
      error: boolean;
      progress: number; }) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{' '}
                {!!uploadedFile.url && (
                <button type="button" onClick={() => onDelete(uploadedFile.id)}>
                  {t('imageUploader.delete')}
                </button>
              )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' },
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}

            {uploadedFile.url && (
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

            {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
    ))}
  </Container>
);

export default FileList;
