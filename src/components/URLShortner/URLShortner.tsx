import React, { useState, useEffect } from "react";

type RecentlyShortenedURL = string;

export const URLShortener: React.FC = (): JSX.Element => {
  const [inputURL, setInputURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [recentlyShortenedURLs, setRecentlyShortenedURLs] = useState<
    RecentlyShortenedURL[]
  >([]);

  useEffect(() => {
    const recentlyShortenedURLsFromLocalStorage = JSON.parse(
      localStorage.getItem("recentlyShortenedURLs") ?? "[]"
    );
    setRecentlyShortenedURLs(recentlyShortenedURLsFromLocalStorage);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://url-shortner6.p.rapidapi.com/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "d8c5919909mshf788d543f667e86p1997dcjsn48b264758952",
            "X-RapidAPI-Host": "url-shortner6.p.rapidapi.com"
          },
          body: JSON.stringify({ fullUrl: inputURL })
        }
      );

      const data = await response.json();
      setShortenedURL(data.shortUrl);

      const updatedRecentlyShortenedURLs = [
        data.shortUrl,
        ...recentlyShortenedURLs.slice(0, 4)
      ];
      setRecentlyShortenedURLs(updatedRecentlyShortenedURLs);
      localStorage.setItem(
        "recentlyShortenedURLs",
        JSON.stringify(updatedRecentlyShortenedURLs)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputURL(e.target.value);
  };

  const renderRecentlyShortenedURLs = () => {
    return recentlyShortenedURLs.map((url, index) => (
      <li key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </li>
    ));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} aria-label="URL Shortener Form">
        <label htmlFor="inputURL">Enter URL to shorten:</label>
        <input
          id="inputURL"
          type="text"
          value={inputURL}
          onChange={handleInputChange}
          aria-label="Enter URL to shorten"
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedURL && (
        <p aria-live="assertive">
          Shortened URL:{" "}
          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
            {shortenedURL}
          </a>
        </p>
      )}
      {recentlyShortenedURLs.length > 0 && (
        <div>
          <h2>Recently Shortened URLs</h2>
          <ul aria-label="Recently Shortened URLs">
            {renderRecentlyShortenedURLs()}
          </ul>
        </div>
      )}
    </div>
  );
};
