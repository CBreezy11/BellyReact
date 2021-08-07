var fs = require('fs');

var allShows = JSON.parse(fs.readFileSync('masterShow.json', 'utf8'));

const pattern = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{2}$/i
function parseDate(str) {
    console.log(str)

    str.forEach(function (casey) {
        if (casey.match(pattern)) {
            return casey
        }
    })
}
console.log(allShows[0].Show)
const str = allShows[0].Show
console.log(str.split(' '))