import { useCallback, useState } from "react";
import { get_presigned_url } from "../api";
import axios, { AxiosProgressEvent } from "axios";

export async function uploadFileToSignedUrl(
  signedUrl: string,
  file: File,
  contentType: string,
  onProgress: (progress: AxiosProgressEvent) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete: (response: any) => void
) {
  axios
    .put(signedUrl, file, {
      onUploadProgress: onProgress,
      headers: {
        "Content-Type": contentType,
      },
    })
    .then((response) => {
      onComplete(response);
    })
    .catch((err) => {
      console.error(err.response);
    });
}

function getKeyAndContentType(file: File, prefix = "documents") {
  const [fileName, extension] = file.name.split(".");

  // to generate unique key every time
  const key = prefix + `/${fileName}-${new Date().valueOf()}.${extension}`;

  const content_type = file.type;

  return { key, content_type };
}

export default function useFileUpload(
  onSuccess: (fileLink: string) => void,
  prefix: string
) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = useCallback((file: File) => {
    if (file) {
      const { key, content_type } = getKeyAndContentType(file, prefix);

      setUploading(true);
      get_presigned_url({ key, content_type }).then((response) => {
        const signedUrl = response.data?.data?.signedUrl;
        const fileLink = response?.data?.data?.fileLink;

      
        if (signedUrl) {
          uploadFileToSignedUrl(
            signedUrl,
            file,
            content_type,
            (progress) => {
              setUploadProgress(
                (progress.loaded / (progress.total as number)) * 100
              );
            },
            () => {
              onSuccess(fileLink);
              setUploading(false);
            }
          ).finally(() => {
            setUploadProgress(0);
          });
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return {
    uploading,
    uploadProgress,
    uploadFile,
  };
}
