import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '5a76e3dab3643dd50fee1a5fab49be2c';
axios.defaults.params = { api_key: API_KEY };

export const MovieService = {
  _query: '',
  _page: 1,
  total_pages: '',

  async getMovieTrend() {
    const response = await axios.get(
      `/trending/movie/week?language=en-US-RU-UA&page=${this._page}`
    );
    const { genres } = await this.getGenres(); //массив обьектов жанров
    let { results, total_pages } = response.data;

    results = results.map(result => ({
      ...result,
      genre_ids: result.genre_ids.map(
        id => genres.find(genre => genre.id === id).name
      ),
    }));

    return { results, total_pages };
  },

  async getGenres() {
    const { data: genres } = await axios.get(`genre/movie/list`);
    return genres;
  },

  get page() {
    return this._page;
  },

  changePage(newPage) {
    this._page = newPage;
  },

  async getSearchMovieResult() {
    const response = await axios.get(
      `search/movie?language=en-US-RU-UA&query=${this._query}&page=${this._page}`
    );

    const { genres } = await this.getGenres(); //массив обьектов жанров
    let { results, total_pages } = response.data;

    results = results.map(result => ({
      ...result,
      genre_ids: result.genre_ids.map(
        id => genres.find(genre => genre.id === id).name
      ),
    }));

    return { results, total_pages };
  },

// ===================================================TEST=======================================/
  async getMoviebyId() {
    
    const response = await axios.get('/movie/507086');
 
    return response.data
  },
// ===================================================TEST=======================================/
  async getSearchMovieById(id) {
    console.log(id);
    const response = await axios.get(`movie/${id}`);

    console.log(response);
    return response.data;
  },

};


