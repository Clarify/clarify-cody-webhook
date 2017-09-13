'use strict';

const Nock = require('nock');

exports.baseUrl = 'https://cdapi.clarify.io';

exports.mockServer = function(noClean) {

    if (!noClean) {
        Nock.cleanAll();
    }
    Nock(exports.baseUrl).get('/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62')
        .query({'embed': '*'})
        .reply(200, conversationWithEmbeds);

    Nock(exports.baseUrl).get('/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62')
        .query({'embed': '*'})
        .reply(200, conversationWithEmbedsMediaErrors);

};


const conversationWithEmbeds = {
  "_links": {
    "self": {
      "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62"
    },
    "insight:keywords": {
      "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/keywords"
    },
    "insight:media": {
      "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/media"
    },
    "insight:speech": {
      "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/speech"
    },
    "insight:transcript": {
      "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/transcript"
    },
    "curies": [
      {
        "name": "clarify",
        "href": "/rels/clarify/{rel}",
        "templated": true
      }
    ]
  },
  "conversation_id": "e710e290-33f6-468e-807a-b392af7cdd62",
  "external_id": "ext-5",
  "created": "2017-08-30T20:20:01.284Z",
  "updated": "2017-08-30T22:55:26.080Z",
  "status": "ready",
  "participants": [
    {
      "name": "agent",
      "media": [
        {
          "url": "http://foobar.tenfold.com/media/out-15555555555.1010.wav",
          "audio_channel": "left"
        }
      ]
    },
    {
      "name": "client",
      "media": [
        {
          "url": "http://foobar.tenfold.com/media/out-15555555555.1010.wav",
          "audio_channel": "right"
        }
      ]
    }
  ],
  "options": {
    "language": "en"
  },
  "notify_url": "https://cody_webhook.tenfold.com/cody_webhook",
  "notify_status": "ok",
  "notify_result": "200",
  "notified": "2017-08-30T22:55:26.080Z",
  "_embedded": {
    "insight:speech": {
      "_links": {
        "self": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/speech"
        },
        "clarify:conversation": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62"
        }
      },
      "conversation_id": "e710e290-33f6-468e-807a-b392af7cdd62",
      "insight": "speech",
      "version": "1.0.0",
      "status": "ok",
      "updated": "2017-08-30T22:55:23.561Z",
      "conversation": {
        "crosstalk_percent": 0,
        "spoken_duration_percent": 74.54,
        "crosstalk_duration": 0,
        "word_count": 655,
        "crosstalk_duration_percent": 0,
        "crosstalk_segments": [],
        "interaction": "",
        "words_per_minute": 157.76,
        "spoken_duration": 249.12
      },
      "participants": [
        {
          "speech_segments": [],
          "interrupt_count": 0,
          "spoken_duration_percent": 0,
          "interrupt_duration": 0,
          "word_count": 0,
          "interrupt_percent": 0,
          "spoken_percent": 0,
          "interrupts": [],
          "listening_score": 95,
          "words_per_minute": 0,
          "spoken_duration": 0,
          "name": "agent"
        },
        {
          "speech_segments": [
            {
              "end": 2.1,
              "word_count": 4,
              "words_per_minute": 186.05,
              "start": 0.81
            },
            {
              "end": 14.58,
              "word_count": 12,
              "words_per_minute": 104.35,
              "start": 7.68
            },
            {
              "end": 21.09,
              "word_count": 8,
              "words_per_minute": 213.33,
              "start": 18.84
            },
            {
              "end": 26.22,
              "word_count": 1,
              "words_per_minute": 153.85,
              "start": 25.83
            },
            {
              "end": 28.71,
              "word_count": 1,
              "words_per_minute": 142.86,
              "start": 28.29
            },
            {
              "end": 31.47,
              "word_count": 2,
              "words_per_minute": 95.24,
              "start": 30.21
            },
            {
              "end": 34.5,
              "word_count": 3,
              "words_per_minute": 120,
              "start": 33
            },
            {
              "end": 54.21,
              "word_count": 43,
              "words_per_minute": 150.61,
              "start": 37.08
            },
            {
              "end": 75.93,
              "word_count": 41,
              "words_per_minute": 139.22,
              "start": 58.26
            },
            {
              "end": 88.11,
              "word_count": 21,
              "words_per_minute": 118.98,
              "start": 77.52
            },
            {
              "end": 105.24,
              "word_count": 42,
              "words_per_minute": 190.48,
              "start": 92.01
            },
            {
              "end": 108.39,
              "word_count": 2,
              "words_per_minute": 102.56,
              "start": 107.22
            },
            {
              "end": 110.97,
              "word_count": 1,
              "words_per_minute": 250,
              "start": 110.73
            },
            {
              "end": 115.02,
              "word_count": 1,
              "words_per_minute": 95.24,
              "start": 114.39
            },
            {
              "end": 120.9,
              "word_count": 9,
              "words_per_minute": 160.71,
              "start": 117.54
            },
            {
              "end": 165.81,
              "word_count": 98,
              "words_per_minute": 136.21,
              "start": 122.64
            },
            {
              "end": 192.84,
              "word_count": 74,
              "words_per_minute": 174.73,
              "start": 167.43
            },
            {
              "end": 203.04,
              "word_count": 20,
              "words_per_minute": 139.86,
              "start": 194.46
            },
            {
              "end": 208.56,
              "word_count": 12,
              "words_per_minute": 210.53,
              "start": 205.14
            },
            {
              "end": 219.66,
              "word_count": 12,
              "words_per_minute": 224.3,
              "start": 216.45
            },
            {
              "end": 239.04,
              "word_count": 32,
              "words_per_minute": 116.58,
              "start": 222.57
            },
            {
              "end": 248.22,
              "word_count": 26,
              "words_per_minute": 225.11,
              "start": 241.29
            },
            {
              "end": 274.23,
              "word_count": 66,
              "words_per_minute": 172.32,
              "start": 251.25
            },
            {
              "end": 281.4,
              "word_count": 13,
              "words_per_minute": 154.76,
              "start": 276.36
            },
            {
              "end": 285.54,
              "word_count": 10,
              "words_per_minute": 253.16,
              "start": 283.17
            },
            {
              "end": 309.72,
              "word_count": 64,
              "words_per_minute": 183.64,
              "start": 288.81
            },
            {
              "end": 321.69,
              "word_count": 30,
              "words_per_minute": 175.44,
              "start": 311.43
            },
            {
              "end": 331.02,
              "word_count": 7,
              "words_per_minute": 179.49,
              "start": 328.68
            }
          ],
          "interrupt_count": 0,
          "spoken_duration_percent": 74.54,
          "interrupt_duration": 0,
          "word_count": 655,
          "interrupt_percent": 0,
          "spoken_percent": 100,
          "interrupts": [],
          "listening_score": 25,
          "words_per_minute": 157.76,
          "spoken_duration": 249.12,
          "name": "client"
        }
      ]
    },
    "insight:keywords": {
      "_links": {
        "self": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/keywords"
        },
        "clarify:conversation": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62"
        }
      },
      "conversation_id": "e710e290-33f6-468e-807a-b392af7cdd62",
      "insight": "keywords",
      "version": "1.0.0",
      "status": "ok",
      "updated": "2017-08-30T22:55:23.561Z",
      "participants": [
        {
          "keywords": [],
          "name": "agent"
        },
        {
          "keywords": [
            {
              "term": "support",
              "weight": 1,
              "count": 6
            },
            {
              "term": "partner",
              "weight": 0.83,
              "count": 5
            },
            {
              "term": "collateral",
              "weight": 0.17,
              "count": 1
            },
            {
              "term": "dashboard",
              "weight": 0.17,
              "count": 1
            },
            {
              "term": "enterprise",
              "weight": 0.17,
              "count": 1
            },
            {
              "term": "integration",
              "weight": 0.17,
              "count": 1
            },
            {
              "term": "password",
              "weight": 0.17,
              "count": 1
            },
            {
              "term": "registration",
              "weight": 0.17,
              "count": 1
            }
          ],
          "name": "client"
        }
      ]
    },
    "insight:media": {
      "_links": {
        "self": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/media"
        },
        "clarify:conversation": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62"
        }
      },
      "conversation_id": "e710e290-33f6-468e-807a-b392af7cdd62",
      "insight": "media",
      "version": "1.0.0",
      "status": "ok",
      "updated": "2017-08-30T22:55:23.561Z",
      "conversation": {
        "duration": 334.2
      },
      "participants": [
        {
          "media": [
            {
              "media_size": 10694444,
              "fetch_code": 200,
              "mime_type": "audio/x-wav",
              "fetch_message": "OK",
              "media_message": "OK",
              "duration": 334.2,
              "url": "http://foobar.tenfold.com/media/out-15555555555.1010.wav",
              "media_code": 1000,
              "audio_codec": "pcm_s16le",
              "audio_channel": "left"
            }
          ],
          "name": "agent"
        },
        {
          "media": [
            {
              "media_size": 10694444,
              "fetch_code": 200,
              "mime_type": "audio/x-wav",
              "fetch_message": "OK",
              "media_message": "OK",
              "duration": 334.2,
              "url": "http://foobar.tenfold.com/media/out-15555555555.1010.wav",
              "media_code": 1000,
              "audio_codec": "pcm_s16le",
              "audio_channel": "right"
            }
          ],
          "name": "client"
        }
      ]
    },
    "insight:transcript": {
      "_links": {
        "self": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62/insights/transcript"
        },
        "clarify:conversation": {
          "href": "/v1/conversations/e710e290-33f6-468e-807a-b392af7cdd62"
        }
      },
      "conversation_id": "e710e290-33f6-468e-807a-b392af7cdd62",
      "insight": "transcript",
      "version": "1.0.0",
      "status": "ok",
      "updated": "2017-08-30T22:55:23.561Z",
      "participants": [
        {
          "transcript": {
            "segments": [
              {
                "language": "en",
                "terms": [
                  {
                    "term": "Hello",
                    "energy": -2.465,
                    "start": 0.02,
                    "dur": 0.34
                  }
                ],
                "energy": -2.465,
                "start": 0.02,
                "dur": 0.34
              }
            ],
            "meta": {
              "format": "clarify_transcript",
              "version": 1
            }
          },
          "name": "agent"
        },
        {
          "transcript": {
            "meta": {
              "format": "clarify_transcript",
              "version": 1
            },
            "segments": [
              {
                "language": "en",
                "terms": [
                  {
                    "term": "Welcome",
                    "energy": -2.465,
                    "start": 0.81,
                    "dur": 0.48
                  },
                  {
                    "term": "to",
                    "energy": -2.89,
                    "start": 1.29,
                    "dur": 0.18
                  },
                  {
                    "term": "join",
                    "energy": -0.947,
                    "start": 1.47,
                    "dur": 0.36
                  },
                  {
                    "term": "us",
                    "energy": -4.848,
                    "start": 1.83,
                    "dur": 0.27
                  },
                  {
                    "term": ".",
                    "type": "mark",
                    "start": 2.1,
                    "dur": 0
                  }
                ],
                "energy": -2.572,
                "start": 0.81,
                "dur": 1.29
              },
              {
                "language": "en",
                "terms": [
                  {
                    "term": "ID",
                    "energy": -2.228,
                    "start": 7.68,
                    "dur": 0.69
                  },
                  {
                    "term": "six",
                    "energy": -8.028,
                    "start": 8.7,
                    "dur": 0.57
                  },
                  {
                    "term": "zero",
                    "energy": -3.366,
                    "start": 9.39,
                    "dur": 0.66
                  },
                  {
                    "term": "eight",
                    "energy": -5.506,
                    "start": 10.11,
                    "dur": 0.54
                  },
                  {
                    "term": "one",
                    "energy": -1.932,
                    "start": 10.71,
                    "dur": 0.54
                  },
                  {
                    "term": "two",
                    "energy": -20.568,
                    "start": 11.28,
                    "dur": 0.06
                  },
                  {
                    "term": "three",
                    "energy": -3.3,
                    "start": 11.37,
                    "dur": 0.57
                  },
                  {
                    "term": "four",
                    "energy": -3.134,
                    "start": 11.97,
                    "dur": 0.57
                  },
                  {
                    "term": "eight",
                    "energy": -5.503,
                    "start": 12.63,
                    "dur": 0.54
                  },
                  {
                    "term": "zero",
                    "energy": -3.259,
                    "start": 13.26,
                    "dur": 0.66
                  },
                  {
                    "term": "is",
                    "energy": -3.076,
                    "start": 14.01,
                    "dur": 0.24
                  },
                  {
                    "term": "not",
                    "energy": -1.458,
                    "start": 14.25,
                    "dur": 0.33
                  },
                  {
                    "term": ".",
                    "type": "mark",
                    "start": 14.58,
                    "dur": 0
                  }
                ],
                "energy": -3.651,
                "start": 7.68,
                "dur": 6.9
              },
              {
                "language": "en",
                "terms": [
                  {
                    "term": "You",
                    "energy": -0.703,
                    "start": 18.84,
                    "dur": 0.21
                  },
                  {
                    "term": "will",
                    "energy": -0.505,
                    "start": 19.05,
                    "dur": 0.18
                  },
                  {
                    "term": "not",
                    "energy": -0.607,
                    "start": 19.23,
                    "dur": 0.27
                  },
                  {
                    "term": "be",
                    "energy": -1.493,
                    "start": 19.5,
                    "dur": 0.12
                  },
                  {
                    "term": "placed",
                    "energy": -3.516,
                    "start": 19.62,
                    "dur": 0.45
                  },
                  {
                    "term": "into",
                    "energy": -1.641,
                    "start": 20.07,
                    "dur": 0.21
                  },
                  {
                    "term": "the",
                    "energy": -2.32,
                    "start": 20.28,
                    "dur": 0.09
                  },
                  {
                    "term": "conference",
                    "energy": -5.317,
                    "start": 20.37,
                    "dur": 0.72
                  },
                  {
                    "term": ".",
                    "type": "mark",
                    "start": 21.09,
                    "dur": 0
                  }
                ],
                "energy": -1.764,
                "start": 18.84,
                "dur": 2.25
              }
            ]
          },
          "name": "client"
        }
      ]
    }
  }
};


const conversationWithEmbedsMediaErrors = {
  "_links": {
    "self": {
      "href": "/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62"
    },
    "insight:media": {
      "href": "/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62/insights/media"
    },
    "curies": [
      {
        "name": "clarify",
        "href": "/rels/clarify/{rel}",
        "templated": true
      }
    ]
  },
  "conversation_id": "00000000-33f6-468e-807a-b392af7cdd62",
  "external_id": "ext-5",
  "created": "2017-08-30T20:20:01.284Z",
  "updated": "2017-08-30T22:55:26.080Z",
  "status": "ready",
  "participants": [
    {
      "name": "agent",
      "media": [
        {
          "url": "http://foobar.example.org/media/out-15555555555.1010.wav",
          "audio_channel": "left"
        }
      ]
    },
    {
      "name": "client",
      "media": [
        {
          "url": "http://foobar.example.org/media/out-15555555555.1010.wav",
          "audio_channel": "right"
        }
      ]
    }
  ],
  "options": {
    "language": "en"
  },
  "notify_url": "https://cody_webhook.example.org/cody_webhook",
  "notify_status": "ok",
  "notify_result": "200",
  "notified": "2017-08-30T22:55:26.080Z",
  "_embedded": {
    "insight:media": {
      "_links": {
        "self": {
          "href": "/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62/insights/media"
        },
        "clarify:conversation": {
          "href": "/v1/conversations/00000000-33f6-468e-807a-b392af7cdd62"
        }
      },
      "conversation_id": "00000000-33f6-468e-807a-b392af7cdd62",
      "insight": "media",
      "version": "1.0.0",
      "status": "error",
      "updated": "2017-08-30T22:55:23.561Z",
      "conversation": {
        "duration": 334.2
      },
      "participants": [
        {
          "media": [
            {
              "media_size": 0,
              "fetch_code": 404,
              "mime_type": "",
              "fetch_message": "Not Found",
              "media_message": "",
              "duration": -1,
              "url": "http://foobar.example.org/media/out-15555555555.1010.wav",
              "media_code": 0,
              "audio_codec": "",
              "audio_channel": "left"
            }
          ],
          "name": "agent"
        },
        {
          "media": [
            {
              "media_size": 10694444,
              "fetch_code": 200,
              "mime_type": "",
              "fetch_message": "OK",
              "media_message": "Malformed file",
              "duration": -1,
              "url": "http://foobar.example.org/media/out-15555555555.1010.wav",
              "media_code": 1200,
              "audio_codec": "",
              "audio_channel": "right"
            }
          ],
          "name": "client"
        }
      ]
    }
  }
};
