import { useState, useEffect } from "react";

// type Response<T> = {
//   data: T | null;
//   error: Error | null;
//   loading: boolean;
//   response: Response | null;
// };

export default function useFetch<T>(url: string, options = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setError(null);
        setResponse(response);
      })
      .catch((error) => {
        setData(null);
        setError(error);
        setResponse(null);
      })
      .finally(() => setLoading(false));
  }, [url, options]);

  return { data, error, loading, response };
}
