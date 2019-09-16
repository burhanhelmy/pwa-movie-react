import React, { ReactNode, Props } from 'react';
import axios from 'axios';
import './movie-details.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Redirect, RouteProps } from "react-router-dom";
interface QueryProps {
  match: {
    params: {
      id: string
    }
  }
}

interface MyState {
  someString: string,
  loading: boolean
}


class MovieDetails extends React.Component<QueryProps & RouteProps> {
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
          <div className="app-title" >
            <span className="title"> {this.state.movieDetails.title}</span>
          </div>
        </div>
      );
    }
  }

}

export default MovieDetails;
