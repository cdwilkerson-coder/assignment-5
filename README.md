# Assignment 5: React TV Show Explorer

**Student:** Cameron Wilkerson  
**Course:** CSC 372 – Web Development  
**Assignment:** Assignment 5: React

## Project Description

TV Show Explorer is a React single-page application built with Vite that allows users to search for television shows using the TVmaze API.

This project rebuilds my previous Assignment 4 television show gallery using React components, props, state, effects, and client-side routing.

Users can search for shows by title or keyword and view up to 10 matching results. Each show card displays information such as the show's name, summary, premiere date, last-updated date, genres, average rating, poster, and main cast members.

Users can also select a show's name to open a separate detail page containing additional information, including the show's status, network or streaming channel, and up to 15 cast members.

The application handles missing data, loading states, empty searches, unsuccessful requests, and searches that return no results.

## Technologies Used

- React
- JavaScript and JSX
- Vite
- React Router
- HTML and CSS
- TVmaze REST API
- Fetch API
- Git and GitHub

## Installation and Setup

1. Clone or download the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Open a terminal inside the project folder.
4. Install the project dependencies using `npm install`.
5. Start the development server using `npm run dev`.
6. Open the local URL provided by Vite, typically `http://localhost:5173/`.

To create a production build, run `npm run build`.

To check the project's JavaScript and React code with ESLint, run `npm run lint`.

## Application Features

- Automatically searches for Breaking Bad when the application loads.
- Allows users to search for television shows using a controlled form.
- Displays a maximum of 10 matching shows.
- Presents show information in responsive Flexbox cards.
- Retrieves main cast information through a separate API request for each show.
- Displays up to five cast members on each card.
- Provides individual show detail pages using React Router.
- Displays up to 15 cast members on the detail page.
- Allows navigation between the gallery and detail pages without a full-page reload.
- Supports directly opening or refreshing show detail URLs.
- Handles missing information using readable fallback messages.
- Displays loading, error, empty-search, and no-results messages.
- Includes attribution and links to TVmaze.

## Required React Concepts

| Required Concept | Implementation | File Location |
|---|---|---|
| 1. Components and Props | The application is organized into reusable components that receive information through props. | `App.jsx`, `SearchForm.jsx`, `ShowCard.jsx`, `CastList.jsx`, `ShowDetail.jsx` |
| 2. Lists and Keys | Search results and cast members are rendered using `map()` and stable show or person IDs as keys. | `App.jsx`, `CastList.jsx` |
| 3. Conditional Rendering | The interface displays different content depending on loading, error, empty-search, no-results, and success states. | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 4. Controlled Form | The search input uses `value` and `onChange`, and form submission uses `onSubmit` and `preventDefault()`. | `SearchForm.jsx`, `App.jsx` |
| 5. State | `useState` manages the search query, submitted search term, results, cast information, and request statuses. | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 6. Effects and Fetch | `useEffect` and `fetch()` retrieve television show information and cast data from TVmaze. Responses are checked before parsing JSON. | `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |
| 7. Lifted State | The search query and results are managed by the parent `App` component and shared with child components through props. | `App.jsx`, `SearchForm.jsx`, `ShowCard.jsx` |
| 8. Routing | React Router provides gallery and detail routes. `Link` handles navigation, and `useParams` reads the show ID from the URL. | `main.jsx`, `App.jsx`, `ShowCard.jsx`, `ShowDetail.jsx` |

## Reflection: React vs. Vanilla JavaScript

Rebuilding my TV show application with React helped me understand the difference between managing a webpage manually and using components to organize an application. In Assignment 4, I used vanilla JavaScript to fetch information from TVmaze, create HTML elements, and update the page whenever users searched for a show. With React, I found it easier to separate the application into smaller components, such as the search form, show cards, cast list, and detail page.

One of the biggest improvements was using `useState` to manage information instead of manually changing elements in the DOM. I also learned how `useEffect` handles API requests and how props allow components to share information. However, understanding where state should be stored and how components communicate was more challenging at first.

React Router was another new concept because I had to understand how different pages could display without reloading the website. Overall, React required more planning and organization initially, but it made the application easier to maintain, reuse, and expand compared with my previous vanilla JavaScript version.

## AI Assistance Disclosure

During development, I encountered several issues that helped me better understand React. Initially, my search form did not appear because I had created the SearchForm component but had not connected it to App.jsx. AI helped me understand how components must be imported and rendered before they become visible.

I also experienced confusion when my Search button displayed the search term but did not show actual television shows. Through AI guidance, I learned that updating React state and retrieving API information are separate operations. I then implemented the TVmaze API requests and tested different searches, including Breaking Bad and The Walking Dead.

AI also helped me implement React Router, organize reusable helper functions, and correct date-formatting mistakes. Specifically, I learned that TVmaze returns premiere dates as strings while last-updated values are Unix timestamps.

I followed the development steps in VS Code, tested my application in the browser, reviewed the results, and made corrections when needed. After completing the application, I verified that the project built successfully using npm run build and passed its ESLint checks using npm run lint.

Overall, I used AI for code examples, explanations, debugging assistance, and reviewing my implementation. The process helped me better understand how React components, state management, API requests, and routing work together.

## API Attribution

Television show information is provided by the [TVmaze API](https://www.tvmaze.com/api).

TVmaze data is licensed under CC BY-SA. This application includes visible TVmaze attribution and links to the original show pages.