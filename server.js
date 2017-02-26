var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res) {
  res.end("Usage: /search or /sentiment");
});

app.get('/search', function(req, res) {
  var searchQuery = req.query.query;
	var key = req.query.key;
  var options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + searchQuery,
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': key
    }
  };
	request(options, function (error, response, body) {
		if (!error) {
			res.end(body);
		}
	});
});

app.get('/sentiment', function (req, res) {
	var query = req.query.query;
	var key = req.query.key;
	var options = {
		url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': key
		},
		body: JSON.stringify({
			"documents": [{
				"language": "en",
				"id": "1",
				"text": query
			}]
		}),
	};
	request(options, function (error, response, body) {
		if (!error) {
			res.end(body);
		}
	});
});
app.listen(port);
console.log("app running on port", port);
exports = module.exports = app;
