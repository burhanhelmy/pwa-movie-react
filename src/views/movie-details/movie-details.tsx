import React, { ReactNode, Props } from 'react';
import axios from 'axios';
import './movie-details.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Badge, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect, RouteProps } from "react-router-dom";
interface QueryProps {
  match: {
    params: {
      id: string
    }
  }
}
interface History {

  history: any

}

interface MyState {
  someString: string,
  loading: boolean
}


class MovieDetails extends React.Component<QueryProps & RouteProps & History> {
  state: any = {
    movieDetails: {},
    loading: true,
  }

  componentDidMount() {
    this.callApi()
  }

  callApi() {
    axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`).then((response) => {
      this.setState({ loading: false, movieDetails: response.data.data })
    })
  }




  render() {
    if (this.state.loading) {
      return 'Loading...'
    } else {
      return (
        <div className="main-container" >
          <img className="background-cover" src={this.state.movieDetails.images[1].legacy_url} alt="" />
          <div className="app-title" onClick={() => this.goBack()} >
            <span className="title"> Bjak <span>Movies</span></span>
          </div>
          <Row>
            <Col sm="4">
              <img src={this.state.movieDetails.images[0].legacy_url} alt="" />
            </Col>
            <Col>
              <h1 className="title"> {this.state.movieDetails.title}</h1>
              <h2>
                {this.state.movieDetails.short_description}
              </h2>
            </Col>
          </Row>
        </div>
      );
    }
  }

  goBack() {
    this.props.history.push('/')
  }

}

export default MovieDetails;
