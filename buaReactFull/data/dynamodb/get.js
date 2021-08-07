var AWS = require("aws-sdk");
const { timeStamp } = require("console");
const zipRef = require('./zipData');

AWS.config.update({
    region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function formatData(data, onSale) {
    console.log(onSale)
    var formatted = []
    for (const entry of data) {
        var showEntry = {
            show: entry.show,
            ticketInfo: [],
            dailySales: [],
            zipInfo: []
        };

        var totalzip = 0;

        var front = {
            location: "Front Range",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var other = {
            location: "Other Mountains",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var aspen = {
            location: "Aspen",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var snowmass = {
            location: "Snowmass",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var woody = {
            location: "Woody Creek",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var basalt = {
            location: "Basalt",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var carbo = {
            location: "Carbondale",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var glen = {
            location: "Glenwood",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var vail = {
            location: "Vail",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var west = {
            location: "Western Slope",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var out = {
            location: "Out of State",
            quantity: 0,
            sales: 0,
            percentage: 0
        }
        var first5Quant = 0;
        var first5Orders = 0;
        var daySalesLenght = entry.daySales.length;
        var firstDay = "";

        for (const tixType of entry.ticketInfo) {
            switch (tixType.TicketType) {
                case "COMPS":
                    break;
                case "PRINTONLYS":
                    break;
                case "":
                    break;
                default:
                    showEntry.ticketInfo.push({
                        type: tixType.TicketType,
                        count: tixType.Count,
                        price: tixType.Price,
                        total: tixType.Total
                    })
                    break;
            }
        }
        if (onSale) {
            firstDay = entry.daySales[0].Day
            for (const [i, daySales] of entry.daySales.entries()) {
                var t = true;
                switch (t) {
                    case i < onSale:
                        first5Quant += Number(daySales.Quantity)
                        first5Orders += Number(daySales.Orders)
                        break;
                }
            }
            showEntry.dailySales.push({
                section: "Show Pacing",
                firstDayOnSale: firstDay,
                numberOfDays: onSale,
                orders: first5Orders,
                quantity: first5Quant,
                runningPercent: String(Math.floor((first5Quant / 450) * 100)) + '%'
            })
        } else {
            showEntry.dailySales.push({
                section: "Show Pacing",
                numberOfDays: "Did not specify",
                orders: 0,
                quantity: 0,
                runningPercent: 0
            })
        }
        for (const zip of entry.zipSales) {
            if (zipRef.FrontRange.includes(Number(zip.Zip))) {
                front.quantity += Number(zip.Quantity)
                front.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.OtherMountains.includes(Number(zip.Zip))) {
                other.quantity += Number(zip.Quantity)
                other.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.WesternSlope.includes(Number(zip.Zip))) {
                west.quantity += Number(zip.Quantity)
                west.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Vail.includes(Number(zip.Zip))) {
                vail.quantity += Number(zip.Quantity)
                vail.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Basalt.includes(Number(zip.Zip))) {
                basalt.quantity += Number(zip.Quantity)
                basalt.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Carbondale.includes(Number(zip.Zip))) {
                carbo.quantity += Number(zip.Quantity)
                carbo.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Glenwood.includes(Number(zip.Zip))) {
                glen.quantity += Number(zip.Quantity)
                glen.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Aspen.includes(Number(zip.Zip))) {
                aspen.quantity += Number(zip.Quantity)
                aspen.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.Snowmass.includes(Number(zip.Zip))) {
                snowmass.quantity += Number(zip.Quantity)
                snowmass.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else if (zipRef.WoodyCreek.includes(Number(zip.Zip))) {
                woody.quantity += Number(zip.Quantity)
                woody.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            } else {
                out.quantity += Number(zip.Quantity)
                out.sales += Number(zip.Sales.split('$')[1])
                totalzip += Number(zip.Quantity)
            }
        }
        front.percentage = String(Math.floor((front.quantity / totalzip) * 100)) + '%';
        other.percentage = String(Math.floor((other.quantity / totalzip) * 100)) + '%';
        west.percentage = String(Math.floor((west.quantity / totalzip) * 100)) + '%';
        vail.percentage = String(Math.floor((vail.quantity / totalzip) * 100)) + '%';
        basalt.percentage = String(Math.floor((basalt.quantity / totalzip) * 100)) + '%';
        carbo.percentage = String(Math.floor((carbo.quantity / totalzip) * 100)) + '%';
        glen.percentage = String(Math.floor((glen.quantity / totalzip) * 100)) + '%';
        aspen.percentage = String(Math.floor((aspen.quantity / totalzip) * 100)) + '%';
        snowmass.percentage = String(Math.floor((snowmass.quantity / totalzip) * 100)) + '%';
        woody.percentage = String(Math.floor((woody.quantity / totalzip) * 100)) + '%';
        out.percentage = String(Math.floor((out.quantity / totalzip) * 100)) + '%';

        showEntry.zipInfo.push(front, other, west, vail, basalt, carbo, glen, aspen, snowmass, woody, out);

        formatted.push(showEntry)
    }
    return formatted
}


exports.handler = async (event) => {
    const result = []
    console.log(`searching for ${event.searchTerm}`)
    var params = {
        TableName: "Shows",
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

    const test = formatData(result, event.onSale)
    console.log(JSON.stringify(test))
    return test
};

exports.handler({ searchTerm: '12/31/19', onSale: 10 })

