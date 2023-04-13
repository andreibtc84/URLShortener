# URL Shortener

Small react APP for shortening URL's

# About

The web application has a form where users can enter a URL to be shortened. When the form is submitted, an API call is made to an external service to shorten the URL. The shortened URL is then displayed on the page, along with the user's most recent five shortened URLs.

The code uses useState and useEffect hooks to manage state and side effects respectively. The useState hook is used to define three state variables - inputURL, shortenedURL, and recentlyShortenedURLs. The useEffect hook is used to retrieve and update the most recent five shortened URLs from local storage.

The handleSubmit function is executed when the user submits the form. It makes a POST request to an external API to shorten the URL entered by the user. The shortened URL is then added to the state variable shortenedURL. The function also updates the state variable recentlyShortenedURLs and local storage with the newly shortened URL.

The handleInputChange function is used to update the inputURL state variable when the user types a URL to shorten.

The renderRecentlyShortenedURLs function maps the recentlyShortenedURLs array to a list of links, which are displayed on the page.

Overall, the code uses React hooks to manage state and side effects, makes API calls to an external service to shorten URLs, and uses local storage to store and retrieve recently shortened URLs.

# Tech stack:

- React.js
- Typescript
- SASS
- REST API
- Local storage
