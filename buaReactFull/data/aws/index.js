var AWS = require("aws-sdk");
const { timeStamp } = require("console");
const zipRef = require('./zipData');
const { Pool, Client } = require('pg')

AWS.config.update({
    region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const pool = new Pool({
    user: 'postgres',
    host: '',
    database: '',
    password: ''
})

function formatData(data) {
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
        var daySalesLenght = entry.daySales.length;

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

        for (const [i, daySales] of entry.daySales.entries()) {
            var t = true;
            switch (t) {
                case i < 5:
                    first5Quant += Number(daySales.Quantity)
                    showEntry.dailySales.push({
                        section: "First Five",
                        day: daySales.Day,
                        orders: Number(daySales.Orders),
                        quantity: Number(daySales.Quantity),
                        sales: daySales.Sales,
                        runningPercent: String(Math.floor((first5Quant / 450) * 100)) + '%'
                    })
                    break;
            }
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
    if (event.sortBy == 'show_data') {
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

        const test = formatData(result)
        return test
    } else {
        console.log(event.searchTerm)
        const text = "select * FROM guests WHERE UPPER(name) = $1";
        const values = [event.searchTerm.toUpperCase()]
        const res = await pool.query(text, values)

        var result = []
        var entry = {
            show: []
        }
        entry.name = event.searchTerm.toUpperCase()
        var numberOfShows = 0
        var numberOfPhones = []
        var numberOfEmails = []
        var numberOfNoShows = 0
        res.rows.forEach(show => {
            numberOfShows++
            if (show.scanned == 0) {
                numberOfNoShows++
            }
            if (!numberOfPhones.includes(show.phone)) {
                numberOfPhones.push(show.phone)
            }
            if (!numberOfEmails.includes(show.email)) {
                numberOfEmails.push(show.email)
            }
            entry.show.push(show)
        });
        entry.shows = numberOfShows
        entry.phones = numberOfPhones.length
        entry.emails = numberOfEmails.length
        entry.noShows = numberOfNoShows
        result.push(entry)
        console.log(result)
        return result
        pool.end();
    }
};

