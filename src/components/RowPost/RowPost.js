import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl } from "../../constants/constants";
import YouTube from "react-youtube";
import { API_KEY } from "../../constants/constants";

function RowPost(props) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const [UrlId, setUrlId] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
          setShowVideo(true);
        } else {
          console.log("No data available");
        }
      });
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, [props.url]);

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      {showVideo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <button
            onClick={closeVideo}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px",
              background: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <YouTube videoId={UrlId.key} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default RowPost;
