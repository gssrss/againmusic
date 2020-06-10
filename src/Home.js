import React, { Component } from "react"
import fire from "./config/fire"
import axios from "axios"
import "./Search.css"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import Loader from "./Loader.gif"

class Home extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    }
    this.cancel = ""
  }

  logout() {
    fire.auth().signOut()
  }

  searchResults = (indexNumber = "", query) => {
    const indexNum = indexNumber ? `&index=25${indexNumber}` : ""
    const url = `/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=${query}${indexNum}`
    if (this.cancel) {
      this.cancel.cancel()
    }
    this.cancel = axios.CancelToken.source()
    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.data.length
          ? "No more search results, please try a new search"
          : ""
        console.log(resultNotFoundMsg)
        this.setState({
          results: res.data.data,
          message: resultNotFoundMsg,
          loading: false,
        })
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Low Network",
          })
        }
      })
  }
  renderSearchResults = () => {
    const { results } = this.state
    if (Object.keys(results).length && results.length) {
      return (
        <table className="tablstl">
          <thead>
            <tr>
              <th className="title">Picture</th>
              <th className="title">Artist name</th>
              <th className="title">Song name</th>
              <th className="title">Song</th>
              <th className="title">Album</th>
              <th className="title">Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((music) => (
              <tr key={music.id}>
                <td className="tdstyle">
                  {
                    <img
                      className="img"
                      src={music.artist.picture_medium}
                      alt="Artist"
                    />
                  }
                </td>
                <td className="tdstyle">{music.artist.name}</td>
                <td className="tdstyle">{music.title_short}</td>

                <td className="tdstyle">
                  {
                    <AudioPlayer
                      style={{ width: "400px", height: "100px" }}
                      //autoPlay
                      src={music.preview}
                      //onPlay={(e) => console.log("onPlay")}
                    />
                  }
                </td>
                <td className="tdstyle">
                  {
                    <img
                      className="img"
                      src={music.album.cover_medium}
                      alt="Album"
                    />
                  }
                </td>
                <td className="tdstyle">
                  {
                    <a href={music.link} target="blank">
                      If you want tu listen full song push here
                    </a>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
  onInputChange = (event) => {
    const query = event.target.value
    if (!query) {
      this.setState({ query: query, results: {}, message: "" })
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.searchResults(1, query)
      })
    }
  }
  render() {
    const query = this.state.query
    const message = this.state.message
    const loading = this.state.loading

    return (
      <div className="Search">
        <h1>Find your music</h1>
        <label>
          <input
            className="label"
            type="text"
            value={query}
            placeholder="Search..."
            onChange={this.onInputChange}
          />
        </label>
        {message && <p className="p">{message}</p>}
        <img
          src={Loader}
          className={`loader ${loading ? "show" : "hide"}`}
          alt="loader"
        />
        {this.renderSearchResults()}
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}
export default Home
