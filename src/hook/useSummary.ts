import { useEffect, useState } from 'react';
import axios from 'axios';

export const useSummary = (url: string) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://api.apyhub.com/ai/summarize-url',
          {
            url, 
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'apy-token': import.meta.env.VITE_API_KEY, 
            },
          }
        );

        setSummary(response.data.data);
        setError(null);
      } catch (err: any) {
        console.error('Error summarizing URL:', err);
        setError(err.response?.data?.error || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchSummary();
    }
  }, [url]);

  return { summary, error, loading };
};
