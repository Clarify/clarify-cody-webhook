#!/usr/bin/env node

const FS = require('fs');
const Path = require('path');
const ClarifyCody = require('clarify-cody');


FS.readFile(Path.resolve(__dirname, 'sample_insight_transcript.js'), 'utf8', function(err, data) {

    if (err) throw err;

    var transcriptInsight = JSON.parse(data);

    var transcript = ClarifyCody.transcript.transcriptForInsight(transcriptInsight);

    var text = ClarifyCody.transcript.textForTranscript(transcript);

    console.log(text);
});
