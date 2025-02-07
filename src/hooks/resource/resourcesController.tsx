import { useEffect, useState } from 'react';
import { getUrl } from 'aws-amplify/storage';

interface UseVideoResult {
  resourceUrl: string;
  errorOccurred: boolean;
  isLoading: boolean;
}
const URL_LOAD =
  'https://i.sstatic.net/hzk6C.gif';

const useResourcesController = (path: string): UseVideoResult => {
  const [resourceUrl, setResourceUrl] = useState<string>(URL_LOAD);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUrlStorages = async () => {
    try {
      setIsLoading(true);
      setErrorOccurred(false);
      const response = await getUrl({
        path,
        options: {
          validateObjectExistence: true,
        },
      });

      setResourceUrl(response.url.toString());
    } catch (err) {
      setErrorOccurred(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUrlStorages();
  }, [path]);

  return { resourceUrl, errorOccurred, isLoading };
};

export default useResourcesController;