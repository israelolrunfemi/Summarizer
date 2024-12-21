// App.js
import  { useState } from 'react';
import useArticleSummary from '../hook/useArticleSummary';

const Demo = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [url, setUrl] = useState('');
  const { summary, error, loading } = useArticleSummary(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setUrl(inputUrl.trim()); // Set the URL for the custom hook
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Article Summarizer</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter article URL"
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          Summarize
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {summary ? (
        <div>
          <p>{summary}</p>
        </div>
      ) : (
        !loading && url && <p>No summary available for the given URL.</p>
      )}
    </div>
  );
};

export default Demo;
