/* eslint-env browser */

import { Event, Observable } from "./Observable.js";

function initPlayer(player) {
    player.playerEl = player.el.querySelector("video");
    initControls(player);
    initEvents(player);
}

function initControls(player) {
    player.controls = {
        uploadEl: player.el.querySelector(".upload"),
        seekbarEl: player.el.querySelector(".seekbar"),
        playButton: player.el.querySelector(".button.play"),
        stopButton: player.el.querySelector(".button.stop"),
        uploadButton: player.el.querySelector(".button.file"),
        timeLabel: player.el.querySelector(".label.time"),
    };
}

function initEvents(player) {
    player.controls.uploadEl.addEventListener("change", player.onVideoFileSelected
        .bind(player));
    player.controls.seekbarEl.addEventListener("change", player.onSeekbarChanged.bind(
        player));
    player.controls.playButton.addEventListener("click", player.onPlayButtonClicked
        .bind(player));
    player.controls.stopButton.addEventListener("click", player.onStopButtonClicked
        .bind(player));
    player.controls.uploadButton.addEventListener("click", player.onFileButtonClicked
        .bind(player));
    player.playerEl.addEventListener("timeupdate", player.onVideoTimeChanged.bind(
        player));
    player.playerEl.addEventListener("ended", player.onVideoEnded.bind(player));
}

function syncVideoTime(player) {
    let seekbarPositon = player.controls.seekbarEl.value / parseInt(player.controls
            .seekbarEl
            .max),
        selectedPosition = player.playerEl.duration * seekbarPositon;
    if (selectedPosition) {
        player.playerEl.currentTime = selectedPosition;
    }
}

function syncSeekbar(player) {
    let seekbarMax = parseInt(player.controls.seekbarEl.max),
        value = (seekbarMax / player.playerEl.duration) * player.playerEl.currentTime;
    player.controls.seekbarEl.value = value;
}

function syncTimeLabel(player) {
    let currentTime = player.playerEl.currentTime,
        minutes = parseInt(currentTime / 60),
        seconds = parseInt(currentTime % 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    player.controls.timeLabel.innerHTML = minutes + ":" + seconds;
}

class VideoPlayer extends Observable {

    constructor(el) {
        super();
        this.el = el;
        initPlayer(this);
    }

    play() {
        this.playerEl.play();
        this.controls.playButton.classList.remove("paused");
    }

    pause() {
        this.playerEl.pause();
        this.controls.playButton.classList.add("paused");
    }

    stop() {
        this.pause();
        this.playerEl.currentTime = 0;
    }

    setFile(file) {
        let fileURL = URL.createObjectURL(file);
        this.playerEl.src = fileURL;
    }

    onVideoFileSelected() {
        let file = this.controls.uploadEl.files[0];
        if (file && file.type === "video/mp4") {
            this.setFile(file);
            this.stop();
        }
    }

    onSeekbarChanged() {
        syncVideoTime(this);
        syncTimeLabel(this);
    }

    onVideoTimeChanged() {
        let event = new Event("videoFrameChanged", this.playerEl);
        this.notifyAll(event);
        syncSeekbar(this);
        syncTimeLabel(this);
    }

    onVideoEnded() {
        this.stop();
    }

    onPlayButtonClicked() {
        if (this.playerEl.paused === true) {
            this.play();
        } else {
            this.pause();
        }
    }

    onStopButtonClicked() {
        this.stop();
    }

    onFileButtonClicked() {
        this.controls.uploadEl.click();
    }

}

export default VideoPlayer;