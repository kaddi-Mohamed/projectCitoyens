import React from "react";
import YouTube from "react-youtube";
import { getVideoIdFromUrl } from "../utils/formate_text";

function IdeaVideo({ idea }) {
  const videoId = getVideoIdFromUrl(idea.urlVideo);
  const onPlayerReady = function (event) {
    event.target.pauseVideo();
  };
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="video-post">
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
    </div>
  );
}

export default IdeaVideo;
