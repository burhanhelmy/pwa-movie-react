import React from 'react';
import axios from 'axios';
import './home.css';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap';

interface History {

  history:any

}
class HomePage extends React.Component<History> {
  state = {
    movieData: [],
    loading: true,
    pagination: 1,
    totalPage: 0
  }
  lastScrollY = 0;
  ticking = false;
  nav: any = React.createRef();

  componentDidMount() {
    this.callApi()
    window.addEventListener('scroll', this.handleScroll, true);
  }

  callApi() {
    axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${this.state.pagination}&perPage=10`).then((response) => {
      console.log(response);
      this.setState({ movieData: this.state.movieData.concat(response.data.data), loading: false, pagination: response.data.pagination.page, totalPage: response.data.pagination.totalPages })
    })
  }
  updateMovie() {
    if (this.state.pagination < this.state.totalPage) {
      axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${this.state.pagination + 1}&perPage=10`).then((response) => {
        console.log(response);
        this.setState({ movieData: this.state.movieData.concat(response.data.data), loading: false, pagination: response.data.pagination.page, totalPage: response.data.pagination.totalPages })
      })
    } else {
      console.log("max page")
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e: any) => {
    this.lastScrollY = window.scrollY;
    if (e.target.scrollingElement) {
      const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight;
      console.log(bottom);
      if (bottom) {
        this.updateMovie()
      }
    }
  };

  render() {
    // <Route path="home" component={HomePage} />

    if (this.state.loading) {
      return 'Loading...'
    } else {
      const movieCategories = this.state.movieData.filter((movie: any) => movie.type === 'Multi-Title-Manual-Curation')
      return (
        console.log(movieCategories),
        <div onScroll={this.handleScroll} className="main-container" >
          <div className="app-title" >
            <span className="title"> Bjak <span>Movies</span></span>
          </div>
          {
            movieCategories.map((movies: any) => {
              const _movies: any[] = movies.data;
              return <div className="movie-container" >
                <h1 className="movie-category-title">{movies.row_name}</h1>
                <div className="movies">
                  {
                    this._movieList(_movies)
                  }
                </div>
              </div>
            })
          }
        </div>
      );
    }
  }

  _movieList(_movies: any[]) {
    return _movies.map((movie) => {
      return (
        <Card className="movie-card" onClick={() => { this.showDetails(movie.id) }} >
          <CardImg bottom className="cover-img" width="100%" src={movie.images[0].url} alt="Card image cap" />
          <CardBody>
            <CardTitle className="card-title" >{movie.title}</CardTitle>
            <CardSubtitle><Badge color="secondary"> {movie.as}</Badge> {movie.meta.ageRating} </CardSubtitle>
          </CardBody>
        </Card>
      )
    })
  }

  showDetails(id: any) {
    this.props.history.push(`movie-details/${id}`)

  }
}

export default HomePage;
