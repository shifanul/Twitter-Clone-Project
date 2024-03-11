import ReactDOM from "react-dom";
import App from "./App";
import TweetProvider from "./Bar/TweetContext";
import CurrentUserProvider from "./CurrentUserContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <CurrentUserProvider>
    <TweetProvider>
      <App />
    </TweetProvider>
  </CurrentUserProvider>,
  rootElement
);
