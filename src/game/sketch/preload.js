import Koji from '../../config' //'@withkoji/vcc';

import { state } from "../state"

export function preload() {
    preloadFont()
    preloadImages()
    loadSounds();
}

function preloadImages() {
    const { sketch } = state;
    state.images = [
        sketch.loadImage(Koji.config.images.gemRed),
        sketch.loadImage(Koji.config.images.gemOrange),
        sketch.loadImage(Koji.config.images.gemYellow),
        sketch.loadImage(Koji.config.images.gemGreen),
        sketch.loadImage(Koji.config.images.gemBlue),
        sketch.loadImage(Koji.config.images.gemPurple),
        sketch.loadImage(Koji.config.images.gemWhite)
    ]
    state.bg = sketch.loadImage(Koji.config.images.background)
}

function preloadFont() {
    var link = document.createElement('link');
    link.href = Koji.config.strings.fontFamily;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    state.font = getFontFamily(Koji.config.strings.fontFamily).replace("+", " ");
}


function getFontFamily(ff) {
    const start = ff.indexOf('family=');
    if (start === -1) return 'sans-serif';
    let end = ff.indexOf('&', start);
    if (end === -1) end = undefined;
    return ff.slice(start + 7, end);
}

function loadSounds() {
    const { sketch } = state;
    if (Koji.config.sounds.tap) state.tapSound = sketch.loadSound(Koji.config.sounds.tap);
    if (Koji.config.sounds.explode) state.explodeSound = sketch.loadSound(Koji.config.sounds.explode);
    if (Koji.config.sounds.tapDestination) state.tapDestinationSound = sketch.loadSound(Koji.config.sounds.tapDestination);
    if (Koji.config.sounds.select) state.selectSound = sketch.loadSound(Koji.config.sounds.select);
    if (Koji.config.sounds.badDestination) state.badDestinationSound = sketch.loadSound(Koji.config.sounds.badDestination);
}