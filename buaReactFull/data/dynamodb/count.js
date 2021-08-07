var fs = require('fs');

var allShows = JSON.parse(fs.readFileSync('masterBuyersReport.json', 'utf8'));


console.log(allShows.length)

