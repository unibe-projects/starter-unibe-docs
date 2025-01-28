import { uploadData } from 'aws-amplify/storage';

export const handleUpload = async (path: string, data: string | Blob): Promise<string> => {
  const operation = uploadData({
    path,
    data
  });

  const result = await operation.result;
  return result.path
}