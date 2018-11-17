'use strict';
const logEvents = false; // set to false in production due to performance issues

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
const playbackConfig = playerManager.getPlaybackConfig();

if (logEvents) {
    // Listen and log all Core Events
    playerManager.addEventListener(
        cast.framework.events.category.CORE,
        event => {
            console.log(event);
        });
}

if (playbackConfig) {
    // Set the player to start playback as soon as there are five seconds of
    // media content buffered. Default is 10.
    playbackConfig.autoResumeDuration = 5;
}

context.start();
