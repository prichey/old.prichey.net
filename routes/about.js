var express = require('express');
var rp = require('request-promise');
var router = express.Router();

// http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=prichey&api_key=d2e1283a31bd5b2c450f7ed61cf9ab2e&format=json&limit=1

/* GET about page. */
router.get('/', function (req, res, next) {
    var lastfmOpts =  {
        uri: 'http://ws.audioscrobbler.com/2.0',
        qs: {
            method: 'user.getrecenttracks',
            user: 'prichey',
            api_key: 'd2e1283a31bd5b2c450f7ed61cf9ab2e',
            format: 'json',
            limit: 1
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(lastfmOpts)
        .then(function (resp) {
            // console.log(resp);
            var song = getLastSongFromResponse(resp);
            res.render('about', {
                title: 'about',
                song: song
            });
        })
        .catch(function (err) {
            // API call failed...
            res.render('about', {
                title: 'about'
            });
        });
});

// use a promise
function getLastSong() {
    request('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=prichey&api_key=d2e1283a31bd5b2c450f7ed61cf9ab2e&format=json&limit=1', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log(body.recenttracks);
            var returnSong = {
                'title': body.recenttracks.track[0].name,
                'artist': body.recenttracks.track[0].artist
            };
            console.log('returning', returnSong);
            return returnSong;
        } else {
            console.log('returning nothing');
            return {};
        }
    });
    return body;
}

function getLastSongFromResponse(resp) {
    var returnObj = {};
    if (!!resp.recenttracks.track[0]['@attr'].nowplaying) {
        returnObj = {
            'title': resp.recenttracks.track[0].name,
            'artist': resp.recenttracks.track[0].artist['#text']
        };
    }
    return returnObj;
}

module.exports = router;
