import React from 'react';
import HomePage from '../home/home';
import { Route } from 'react-router-dom';
import MovieDetails from '../movie-details/movie-details';
class Root extends React.Component {

    render() {
        return (<div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movie-details/:id" component={MovieDetails} />
        </div>)
    }

}

export default Root;
