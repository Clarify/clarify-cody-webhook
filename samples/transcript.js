#!/usr/bin/env node

const FS = require('fs');
const Path = require('path');
const ClarifyCody = require('clarify-cody');


FS.readFile(Path.resolve(__dirname, 'insights/sample_insight_transcript.json'), 'utf8', function(err, data) {

    if (err) throw err;

    var transcriptInsight = JSON.parse(data);

    // Get a merged transcript (client and agent) from the transcript insight
    var transcript = ClarifyCody.transcript.transcriptForInsight(transcriptInsight);

    // Generate formatted text for the transcript
    var text = ClarifyCody.transcript.textForTranscript(transcript);

    console.log(text);
});
