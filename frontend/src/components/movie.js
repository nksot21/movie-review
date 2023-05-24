import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom'
import MovieDataService from '../services/movies'
import moment from 'moment/moment'

export default function Movie({props}) {
  const {id} = useParams()
  const {user} = useLocation()
  const [movie, setMovie] = useState({
    id:null,
    title: '',
    rated: '',
    reviews: []
  })
  const [isLoading, setLoading] = useState(true)

  const getMovie = id => {
    MovieDataService.get(id)
    .then(res => {
      setMovie(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getMovie(id)
    setLoading(true)
    }, [id]);

  if (isLoading)
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster+"/75px200"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {movie.plot}
                </Card.Text>
                {user &&
                <Link to={"/movies/" + id + "/review"}>
                  Add Review
                </Link>
                }
              </Card.Body>
            </Card>
          <br />
          <h2>Reviews</h2>
          {
            movie.reviews.map((review, index) => {
              return (<Card key={index}>
                <Card.Body>
                <h6>{review.name + " reviewd on "} {moment(review.date).format("Do MMMM YYYY")}</h6>
                  <p>{review.review}</p>
                  {user && user.id === review.user_id &&
                    <Row>
                      <Col>
                        <Link to={{
                          pathname:"/movies/" + id +
                          "/review",
                          state: {currentReview: review}
                        }}>Edit</Link>
                      </Col>
                      <Col><Button variant="link">Delete</Button></Col>
                    </Row>
                  }
                </Card.Body>
              </Card>)
            })
          }
          </Col>
        </Row>
      </Container>
    </div>
    );
}

