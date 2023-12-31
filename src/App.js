import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes";
import SignUp from "./screens/SignUp";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <>
                <Route path={routes.home} exact>
                  {isLoggedIn ? <Home /> : <Login />}
                </Route>
                {!isLoggedIn ? (
                  <Route path={routes.signUp}>
                    <SignUp />
                  </Route>
                ) : null}
                <Route>
                  <NotFound />
                </Route>
              </>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
