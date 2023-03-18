import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContexts';

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
                 <PostsPage message="Nothing to see here!  Search again." />
                )}
              />
              <Route 
                exact 
                path="/feed" 
                render={() => (
                 <PostsPage message="Nothing to see here!  Search again or follow a friend." 
                 filter={`owner__followed__owner__profile=${profile_id}&`}
                 />
                )}
                />
              <Route 
                exact 
                path="/liked" 
                render={() => (
                 <PostsPage message="Nothing to see here!  Search again or like a post." 
                 filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                 />
                )}
              />
              <Route exact path="/login" render={() => <LogInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/posts/create" render={() => <PostCreateForm />} />
              <Route exact path="/posts/:id" render={() => <PostPage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}


export default App;