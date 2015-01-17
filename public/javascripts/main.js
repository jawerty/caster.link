
streamer.video = document.querySelector('video');

streamer.receive()

document.querySelector('input[type=file]').onchange = function() {
    console.log("Start WebChannel")
    var file = this.files[0];
    streamer.stream(this.files[0]);
    //readVideoFile(file)
};

var arrayToStoreChunks = [];

function onReadAsDataURL(event, text) {
    var data = {}; // data object to transmit over data channel

    console.log(event);

    if (event) text = event.target.result; // on first invocation
    
    if (text.length > chunkLength) {
        data.message = text.slice(0, chunkLength); // getting chunk using predefined chunk length
    } else {
        data.message = text;
        data.fileName = fileName;
        delete fileName;
        data.last = true;
    }

    offererDataChannel.send(JSON.stringify(data)); // use JSON.stringify for chrome!

    var remainingDataURL = text.slice(data.message.length);
    if (remainingDataURL.length) setTimeout(function () {
        onReadAsDataURL(null, remainingDataURL); // continue transmitting
    }, 500)
}

function saveToDisk(fileUrl, fileName) {
    var save = document.createElement('a');
    save.href = fileUrl;
    save.target = '_blank';
    save.download = fileName || fileUrl;

    var event = document.createEvent('Event');
    event.initEvent('click', true, true);

    save.dispatchEvent(event);
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
}

function readVideoFile(videoFile) {
	var reader = new window.FileReader();
	reader.readAsDataURL(videoFile);

	fileName = videoFile.name;
	reader.onload = onReadAsDataURL;

	chunkLength = 1000;

}
	