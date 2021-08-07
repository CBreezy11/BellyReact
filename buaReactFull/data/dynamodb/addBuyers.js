var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing shows into DynamoDB. Please wait.");

const end = 4874

var allShows = JSON.parse(fs.readFileSync('masterBuyersReport.json', 'utf8'));
for (var i = end - 100; i <= end; i++) {
    var params = {
        TableName: "BuyersReport",
        Item: {
            "show": allShows[i].Show.toUpperCase(),
            "buyersReport": allShows[i].BuyersData,
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add show", allShows[i].Show, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", allShows[i].Show);
        }
    });
};
console.log(end)