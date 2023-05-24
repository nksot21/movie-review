import { findByTitle } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieDataService from '../services/movies'

export default function MoviesList({props}) {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
    }, []);

  const retrieveMovies = () => {
      MovieDataService.getAll()
      .then(response => {
        console.log(response.data.movies);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const retrieveRatings = () => {
      MovieDataService.getRatings()
      .then(response => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }

  // Search Films
  const find = (query, by) => {
    MovieDataService.getAll(query, by)
    .then(res => {
      setMovies(res.data.movies)
    })
    .catch(err => console.log(err))
  }

  const findByTitle = () => {
    find(searchTitle, "title")
  }

  const findByRating = () => {
    if(searchRating === "All Ratings")
      retrieveMovies();
    else 
      find(searchRating, "rated")
  }

  return (
    <div >
      <Container>
        <Row>
          <Col>
            {/* Form Search by Title */}
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Search by title"
                value={searchTitle} onChange={onChangeSearchTitle} />
              </Form.Group>
              <Button variant="primary" type="button" 
              onClick={findByTitle}
              >
                Search
              </Button>
            </Form>
          </Col>

          {/* Form Search By Ratings  */}
          <Col>
            <Form>
              <Form.Group controlId="formRating">
                <Form.Label>Ratings</Form.Label>
                <Form.Control as="select" onChange={onChangeSearchRating} >
                {
                  ratings.map(rating => {
                    return (<option value={rating}>{rating}</option>)
                  })
                }
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button"
              onClick={findByRating}
              >
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Row style={{marginTop: '3rem'}}>
          {movies.map(movie => {
            return (
              <Col>
                <Card style={{width: '18rem', height:'45rem', marginBottom:'3rem'}}>
                  <Card.Img src={movie.poster+'/100px180'} />
                  <Card.Body >
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      Rating: {movie.rated}
                    </Card.Text>
                    <Card.Text>
                      {movie.plot}
                    </Card.Text>
                    <Link to={"/movies/"+movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
      
      
    </div>
  )
}
