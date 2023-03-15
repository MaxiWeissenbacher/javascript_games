/* eslint-env browser */

import VideoPlayer from "./utils/VideoPlayer.js";
import AmbilightContainer from "../../vendors/ambilight.js/index.js";

var player,
    ambiPlayer;

function init() {
    let videoEl = document.querySelector("#player");
    player = new VideoPlayer(videoEl);
    player.addEventListener("videoFrameChanged", onVideoFrameChanged);
    ambiPlayer = new AmbilightContainer(videoEl);
}

function onVideoFrameChanged(event) {
    ambiPlayer.update(event.data);
}

init();