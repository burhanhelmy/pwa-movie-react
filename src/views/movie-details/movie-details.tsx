import React, { ReactNode, Props } from 'react';
import axios from 'axios';
import './movie-details.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Badge, Row, Col } from 'reactstrap';
import { FaCalendarDay, FaChild, FaClock } from "react-icons/fa";
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
          <img className="background-cover" src={this.state.movieDetails.images[1].legacy_url ? this.state.movieDetails.images[1].legacy_url : this.state.movieDetails.images[1].url} alt="" />
          <div className="app-title" onClick={() => this.goBack()} >
            <span className="title"> Bjak <span>Movies</span></span>
          </div>
          <Row>
            <Col sm="4">
              <img className="cover-img" src={this.state.movieDetails.images[0].legacy_url ? this.state.movieDetails.images[0].legacy_url : this.state.movieDetails.images[0].url} />
              <div className="cover-img background-cover-img"></div>
            </Col>
            <Col>
              <Row>
                <div className="padding-left"></div>
                {
                  this.state.movieDetails.tags.map((tag: any) => {
                    return<Badge color="secondary"> #{tag.label}</Badge>
                  })
                }
              </Row>

              <Row className="details-label">
                  <h4 className="title"><FaCalendarDay></FaCalendarDay> {this.state.movieDetails.meta.releaseYear}</h4>
                  <h4 className="title padding-left"><FaChild></FaChild>{this.state.movieDetails.meta.ageRating}</h4>
                  <h4 className="title padding-left"><FaClock></FaClock>{this.state.movieDetails.running_time_friendly}</h4>
              </Row>
              <h1 className="title"> {this.state.movieDetails.title}</h1>
              <h2>
                {this.state.movieDetails.description ? this.state.movieDetails.description : this.state.movieDetails.short_description}
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
