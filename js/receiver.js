'use strict';
const LOG_EVENTS = true; // set to false in production due to performance issues
const DEBUG = true;
const LICENSE_URL = 'http://path/to/license/server';

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();


const init = () => {
    initPlaybackConfig();

    if (LOG_EVENTS) {
        addEventLogging()
    }
    const options = new cast.framework.CastReceiverOptions();
    addReceiverOptions(options);
    if (DEBUG) {
        addReceiverDebugOptions(options)
    }

    addLicenseUrl(LICENSE_URL); // TODO test with license server
    addMessageInterceptor();

    context.start(options);
};

const initPlaybackConfig = () => {
    const playbackConfig = (Object.assign(new cast.framework.PlaybackConfig(), playerManager.getPlaybackConfig()));

    playbackConfig.autoResumeDuration = 5; // Set the player to start playback as soon as there are five seconds of media content buffered. Default is 10.
    playbackConfig.autoResumeNumberOfSegments = 1;

    playerManager.setPlaybackConfig(playbackConfig);
};

const addReceiverOptions = (options) => {
    // TODO
};

const addReceiverDebugOptions = (options) => {
    console.log('initialize DEBUG options');
    options.maxInactivity = 3600; //Development only
};

const addEventLogging = () => {
    console.log('add event logging');
    // Listen and log all Core Events
    playerManager.addEventListener(
        cast.framework.events.category.CORE,
        event => {
            console.log(event);
        });
};

const addLicenseUrl = (licenseUrl) => {
    console.log(`add license url ${licenseUrl}`);

    // Customize the license url for playback
    const playbackConfig = playerManager.getPlaybackConfig();
    playbackConfig.licenseUrl = licenseUrl;
    playbackConfig.licenseRequestHandler = requestInfo => {
        requestInfo.withCredentials = true;
    };
    playerManager.setPlaybackConfig(playbackConfig);

    // Update playback config LICENSE_URL according to provided value in load request.
    // playerManager.setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
    //     if (loadRequest.media.customData && loadRequest.media.customData.licenseUrl) {
    //         playbackConfig.licenseUrl = loadRequest.media.customData.licenseUrl;
    //     }
    //     return playbackConfig;
    // });
};

const addMessageInterceptor = () => {
    playerManager.setMessageInterceptor(
        cast.framework.messages.MessageType.LOAD,
        request => {
            // Request can be modified here. It is also possible to fetch additional data from a third
            // party server before continuing with the request.
            // see https://developers.google.com/cast/docs/caf_receiver/advanced#message-interception
            console.log(JSON.stringify(request));
            return request;
        });
};

// start cast framework
init();
