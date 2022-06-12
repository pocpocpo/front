import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from '../../services/api';

import Upload from './components/upload';

const ImageUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: any;
    id: string;
    name: any;
    readableSize: string;
    preview: string;
    progress: number;
    uploaded: boolean;
    error: boolean;
    url: null;
}>>([]);

  const updateFile = (
    id: string,
    data: { progress?: number; uploaded?: boolean; id?: any; url?: any; error?: boolean; },
  ) => {
    setUploadedFiles((state) =>
       state.map((uploadedFile) => id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile));
  };

  const processUpload = (uploadedFile: {
    file: string | Blob; name: string | undefined; id: string; progress: number;
  }) => {
    const data = new FormData();

    data.append('image', uploadedFile.file, uploadedFile.name);

    api
      .post('image', data, {
        onUploadProgress: ({ loaded, total }) => {
          const progress = Math.round((Number(loaded) * 100) / Number(total));

          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          // eslint-disable-next-line no-underscore-dangle
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  const handleUpload = (files: any[]) => {
    const newFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles((state) =>
      state.concat(newFiles));

    newFiles.forEach(processUpload);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`posts/${id}`);

    setUploadedFiles((state) =>
      state.filter((file) => file.id !== id));
  };

    return (
      <Upload onUpload={handleUpload} uploadedFiles={uploadedFiles} />
    );
};

export default ImageUploader;
