import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import CaptionCreateForm from './pages/captions/CaptionCreateForm';
import CaptionPage from './pages/captions/CaptionPage';
import CaptionsPage from './pages/captions/CaptionsPage';
import { useCurrentUser } from './contexts/CurrentUserContexts';
import CaptionEditForm from './pages/captions/CaptionEditForm';
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";


  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route 
                exact 
                path="/" 
                render={() => (
                 <CaptionsPage message="Nothing to see here!  Search again." />
                )}
              />
                 <Route
                  exact
                  path="/fave"
                  render={() => (
                    <CaptionsPage
                      message="Nothing to see here! Fave a caption you want to see again!"
                      filter={`fave__owner__profile=${profile_id}&ordering=-fave__created_on&`}
                    />
                  )}
                />
                
              <Route 
                exact 
                path="/love" 
                render={() => (
                 <CaptionsPage message="Nothing to see here!  Search again or love a caption." 
                 filter={`love__owner__profile=${profile_id}&ordering=-love__created_at&`}
                 />
                )}
              />
              <Route exact path="/login" render={() => <LogInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/captions/create" render={() => <CaptionCreateForm />} />
              <Route exact path="/captions/:id" render={() => <CaptionPage />} />
              <Route exact path="/captions/:id/edit" render={() => <CaptionEditForm/>} />
              <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}


export default App;