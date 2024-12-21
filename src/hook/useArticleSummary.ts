// useArticleSummary.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useArticleSummary = (articleUrl:any) => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!articleUrl) return;

    const fetchSummary = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const options = {
          method: 'GET',
          url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
          params: {
            url: articleUrl,
            lang: 'en',
            engine: '2',
          },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_API_KEY,
            'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        setSummary(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSummary();
  }, [articleUrl]); // Dependency: re-fetch if articleUrl changes

  return { summary, error, loading };
};

export default useArticleSummary;
