const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const url = require('url')
const app = express()
const port = process.env.PORT || 8080

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/', function(req, res) {
  res.send("Usage: /search or /sentiment")
})

app.get('/search', function(req, res) {
  let searchQuery = req.query.query;
	let key = req.query.key;
  let options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + searchQuery,
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': key
    }
  };
	request(options, function (error, response, body) {
		if (!error) {
			console.log(body);
			res.end(body);
		}
	})
})

app.get('/sentiment', function (req, res) {
	let query = req.query.query;
	let key = req.query.key;
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
			console.log(body);
			res.end(body);
		}
	})
})
app.listen(port)
console.log("app running on port", port);
exports = module.exports = app;
