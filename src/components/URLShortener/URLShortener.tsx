import React, { useState, useEffect } from "react";
import "./URLShortener.scss";

//Defines a custom type to represent a recently shortened URL as a string.
type RecentlyShortenedURL = string;

export const URLShortener: React.FC = (): JSX.Element => {
  const [inputURL, setInputURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [recentlyShortenedURLs, setRecentlyShortenedURLs] = useState<
    RecentlyShortenedURL[]
  >([]);

  //Executes when the component mounts. Retrieves recently shortened URLs from local storage and updates the recentlyShortenedURLs state variable.

  useEffect(() => {
    const recentlyShortenedURLsFromLocalStorage = JSON.parse(
      localStorage.getItem("recentlyShortenedURLs") ?? "[]"
    );
    setRecentlyShortenedURLs(recentlyShortenedURLsFromLocalStorage);
  }, []);

  // Declares an async function named handleSubmit that is executed when the user submits the form to shorten a URL. It makes a POST request to an external API with the URL entered by the user, sets the shortenedURL and recentlyShortenedURLs state variables, and updates the local storage.

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

  // Declares a function that updates the inputURL state variable when the user types a URL to shorten.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputURL(e.target.value);
  };

  // Declares a function that maps the recentlyShortenedURLs array to a list of links.
  const renderRecentlyShortenedURLs = () => {
    return recentlyShortenedURLs.map((url, index) => (
      <li key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
        <p>{inputURL}</p>
      </li>
    ));
  };

  return (
    <div className="appContainer">
      <section className="formContainer">
        <form
          className="form"
          onSubmit={handleSubmit}
          aria-label="URL Shortener Form"
        >
          {/* <label htmlFor="inputURL">Please enter URL to shorten:</label> */}
          <input
            className="textInput"
            id="inputURL"
            type="text"
            value={inputURL}
            onChange={handleInputChange}
            aria-label="Please enter URL to shorten"
            placeholder="Please enter URL to shorten"
            required
          />
          <button className="submitButton" type="submit">
            SUBMIT
          </button>
        </form>
      </section>

      {shortenedURL && (
        <section className="lastShortenedSection">
          <p aria-live="assertive" className="lastShortenedURL">
            Last shortened URL:{" "}
            <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
              {shortenedURL}
            </a>
          </p>
        </section>
      )}

      <section className="recentlyShortenedURLsSection">
        {recentlyShortenedURLs.length > 0 && (
          <div className="recentlyShortenedURLsContainer">
            <h4>Your last 5 shortened URLs</h4>
            <ul aria-label="Your last 5 shortened URLs">
              {renderRecentlyShortenedURLs()}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};
