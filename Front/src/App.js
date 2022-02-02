import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ConnectNavigate from "./components/Navigation";
import { LogInPage } from "./pages/auth/LoginPage";
import { ProfilePage } from "./pages/auth/ProfilePage";
import { Registration } from "./pages/auth/RegistrationPage";
import { routers } from "./utils/routes";
import createHistory from "history/createBrowserHistory";
import { NewsPage } from "./pages/main/NewsPage";
import { FontAwesomeIcon } from "./components/Footer";
import { SettingsPage } from "./pages/main/SettingsPage";
import { CommentsPage } from "./pages/main/CommentsPage";
import { SearchPage } from "./pages/main/SearchPage";
export const history = createHistory();

function App() {
  return (
    <>
      <Router history={history}>
        <ConnectNavigate />
        <Switch>
          <Route path={routers.NEWS.path} component={NewsPage} />
          <Route path={routers.SIGNUP.path} component={Registration} />
          <Route path={routers.LOGIN.path} component={LogInPage} />
          <Route path={routers.PROFILE.path} component={ProfilePage} />
          <Route path={routers.SETTINGS.path} component={SettingsPage} />
          <Route path={routers.COMMENTS.path} component={CommentsPage} />
          <Route path={routers.SEARCH.path} component={SearchPage} />

          <Redirect to={routers.LOGIN.path} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
