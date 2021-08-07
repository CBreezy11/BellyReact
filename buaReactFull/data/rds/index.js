const fs = require('fs')
const { Pool, Client } = require('pg')


const pool = new Pool({
    user: 'postgres',
    host: '',
    database: '',
    password: ''
})

const query = async (query) => {
    const text = "select * FROM guests WHERE UPPER(name) = $1";
    const values = [query]
    const res = await pool.query(text, values)
    return res
}


exports.handler = async (event) => {
    query(event.searchTerm).then((data) => {
        result = {
            show: []
        }
        result.name = data.rows[0].name
        var numberOfShows = 0
        var numberOfPhones = []
        var numberOfEmails = []
        var numberOfNoShows = 0
        data.rows.forEach(show => {
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
            result.show.push(show)
        })
        result.shows = numberOfShows
        result.phones = numberOfPhones.length
        result.emails = numberOfEmails.length
        result.noShows = numberOfNoShows
        console.log(result)
        return result
        pool.end()
    })
}

exports.handler({
    searchTerm: "ERIN HEINTZ",
    sortBy: "customer_lookup"
})
