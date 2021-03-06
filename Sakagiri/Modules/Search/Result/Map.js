const Search = require("../Search");

module.exports.process = async (item, message) => {
	const res = [];

	res.push(`> **${item.name}**`);
	res.push(`>  `);
	res.push(`> Type **${item.type}**  -  Id **${item.id}**`);
	res.push(`>  `);
	res.push(`> **Monsters** (${item.mobs.length} total)`);
	res.push(`>  `);
	for (const mob of item.mobs) {
		const m = Search.process(`${mob} -t monster;miniboss;boss`).list.shift();

		if (m) {
			res.push(`> [${m.id}] **${m.name}** (${m.type})`);
		} else {
			res.push(`> **${mob}**`);
		}
	}

	message.channel.send(res.join("\n"));
};
