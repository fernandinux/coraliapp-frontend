import { Provider } from "react-redux";
import { CSSReset } from "@chakra-ui/core";

import { ThemeProvider } from "@chakra-ui/core";

import store from "./../store";
import "../styles/index.css";

import newTheme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={newTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
