var AWS = require("aws-sdk");
const { timeStamp } = require("console");
const zipRef = require('./zipData');

AWS.config.update({
    region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function formatData(data) {
    var formatted = []
    for (const entry of data) {
        var reserved = 0;
        var res50 = 0;
        var res50Date = "";
        var resDates = [];
        var ga = 0;
        var ga50 = 0
        var ga50Date = "";
        var gaDates = []
        for (const buyerEntry of entry.buyersReport) {
            if (reserved < 80 && buyerEntry.Section == "Reserved") {
                reserved += 1
                if (!resDates.includes(buyerEntry.Date)) {
                    resDates.push(buyerEntry.Date)
                }
                if (reserved == 40) {
                    res50 = resDates.length
                    res50Date = resDates.reverse()[0]
                }
            } else if (ga < 370 && buyerEntry.Section == "GA") {
                ga += 1
                if (!gaDates.includes(buyerEntry.Date)) {
                    gaDates.push(buyerEntry.Date)
                }
                if (ga == 185) {
                    ga50 = gaDates.length
                    ga50Date = gaDates.reverse()[0]
                    console.log(ga)
                }
            } else {
                continue
            }
        }
        console.log("reserve = ", reserved)
        console.log("ga = ", ga)
        var showEntry = {
            show: entry.show,
            reserve50: res50,
            reserve50Date: res50Date,
            reserveSellout: resDates.length,
            reserveSellDate: resDates.reverse()[0],
            ga50: ga50,
            ga50Date: ga50Date,
            gaSellout: gaDates.length,
            gaSellDate: gaDates.reverse()[0]
        };
        showEntry.gaSellDate = gaDates[-1]
        if (reserved < 80) {
            showEntry.reserveSellout = 0
            showEntry.reserveSellDate = "Did not sell out"
        }
        if (ga < 370) {
            console.log("ga < 370")
            showEntry.gaSellout = 0
            showEntry.gaSellDate = "Did not sell out"
        }
        formatted.push(showEntry)
    }
    return formatted
}




exports.handler = async (event) => {
    const result = []
    console.log(`searching for ${event.searchTerm}`)
    var params = {
        TableName: "BuyersReport",
        FilterExpression: 'contains(#sh, :ss)',
        ExpressionAttributeNames: {
            '#sh': 'show'
        },
        ExpressionAttributeValues: {
            ":ss": event.searchTerm.toUpperCase()
        }
    };
    let items;
    do {
        items = await docClient.scan(params).promise();
        items.Items.forEach((item) => result.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;;
    } while (typeof items.LastEvaluatedKey != 'undefined');

    const test = formatData(result)
    console.log(test)
    return test
};

exports.handler({ searchTerm: '02/03/19' })

