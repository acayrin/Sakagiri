const nw = require('../../../Modules/NewsAnnouncer/Fetch')

module.exports = {
    name: 'fetch_news',
    exec(client) {
        setInterval(async () => nw.exec(client), 5 * 1000)
    }
}