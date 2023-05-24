import logo from './logo.svg';
import './App.css';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import AddReview from './components/add-review';
import Login from './components/login';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useState } from 'react';
import {Link, Routes, Route} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {
                user ? (
                  <a onClick={logout}>Logout User</a>
                ):(
                  <Link to={"/login"}>Login</Link>
                )
              }
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
    </Navbar>

    <Routes>
      {/* Route Movie-list */}
      <Route exact path={"/"}
        Component={MoviesList}>
      </Route>
      <Route exact path={"/movies"}
        Component={MoviesList}>
      </Route>
      {/* Route Add Review */}
      <Route path="/movies/:id/review" 
        element={<AddReview user={user} />}
      >
      </Route>
      {/* Route Movie*/}
      <Route path="/movies/:id/" 
        element={<Movie user={user} />}
      >
      </Route>
      {/* Route Login*/}
      <Route path="/login" 
        element={<Login login={login} />}
      >
      </Route>
    </Routes>
    </div>
  );
}

export default App;
