import React, { useState } from 'react';
import { useSummary } from '../hook/useSummary'; // Import your custom hook

const Demo: React.FC = () => {
  const [url, setUrl] = useState<string>(''); // URL entered by the user
  const [fetchUrl, setFetchUrl] = useState<string>(''); // URL to trigger the API call
  
  const { summary, loading, error } = useSummary(fetchUrl); // The hook uses fetchUrl to trigger

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value); // Update the URL input
  };

  const handleSummarizeClick = () => {
    setFetchUrl(url); // Set the fetchUrl to trigger the API call in useEffect
  };

  return (
    <div>
      <h1>URL Summarizer</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleUrlChange} // Change URL value
        style={{ width: '300px', padding: '5px' }}
      />
      <button onClick={handleSummarizeClick} style={{ marginLeft: '10px' }}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: '20px' }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Demo;
