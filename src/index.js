import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// https://console.developers.google.com/apis/credentials/
const API_KEY = 'x';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null
    }
    this.videoSearch('nba');
  }

  videoSearch(term) {
    // effectue une recherche via l'API de youtube
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render(){
    // permet d'effectuer une recherche toutes les 300ms maximum
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearch={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector('.container'));
