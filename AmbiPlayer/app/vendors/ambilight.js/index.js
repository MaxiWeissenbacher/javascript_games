/* eslint-env browser */

const BOX_SHADOW_DEFAULT_COLOR = "rgb(255,255,255)",
    BOX_SHADOW_STRING = "0px 0px 70px 35px {{COLOR}}",
    IMAGE_DATA_VECTOR_LENGTH = 4;

var shadowCanvas,
    shadowContext;

/* Init shadow elements for extracting current video frame */
shadowCanvas = document.createElement("canvas");
shadowContext = shadowCanvas.getContext("2d");
shadowCanvas.style["display"] = "none";
document.body.appendChild(shadowCanvas);

function getColorFromVideo(video) {
    let color = {
            r: 0,
            g: 0,
            b: 0,
        },
        pixels = getImageDataFromVideo(video);

    for (let i = 0; i < pixels.length; i += IMAGE_DATA_VECTOR_LENGTH) {
        color.r += pixels[i];
        color.g += pixels[i + 1];
        color.b += pixels[i + 2];
    }

    color.r = parseInt(color.r / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    color.g = parseInt(color.g / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    color.b = parseInt(color.b / (pixels.length / IMAGE_DATA_VECTOR_LENGTH));
    return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
}

function getImageDataFromVideo(video) {
    shadowCanvas.width = video.videoWidth;
    shadowCanvas.height = video.videoHeight;
    shadowContext.drawImage(video, 0, 0);
    return shadowContext.getImageData(0, 0, shadowCanvas.width,
        shadowCanvas.height).data;
}

class AmbilightContainer {
    constructor(el) {
        this.el = el;
        this.el.classList.add("ambilight-container");
        this.setColor(BOX_SHADOW_DEFAULT_COLOR);
    }

    update(source) {
        let color;
        if (typeof source === "string") {
            color = source;
        }
        if (source instanceof HTMLVideoElement) {
            color = getColorFromVideo(source);
        }
        this.setColor(color);
    }

    setColor(color) {
        this.el.style["box-shadow"] = BOX_SHADOW_STRING.replace("{{COLOR}}",
            color);
        this.el.style["border-color"] = color;
    }

}

export default AmbilightContainer;