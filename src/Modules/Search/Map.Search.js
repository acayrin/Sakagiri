const {
    exec
} = require('../Commands/Search')

module.exports.process = async (item, message) => {
    const res = []

    res.push(`> **${item.name}**`)
    res.push(`>  `)
    res.push(`> Type **${item.type}**  -  Id **${item.id}**`)
    res.push(`> ~~                                   ~~`)
    res.push(`> **Monsters** (${item.mobs.length} total)`)
    res.push(`>  `)
    for (let mob of item.mobs) {
        const m = (await exec(null, `${mob} -t monster;miniboss;boss`)).shift()

        res.push(`> ${m ? `[${m.id}] **${m.name}** (${m.type})` : `**${mob}**`}`)
    }

    message.channel.send(res.join('\n'))
}