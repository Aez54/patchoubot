const { Client, MessageReaction, User, GuildMember, GuildMemberManager } = require('discord.js');
const firstMessage = require('./first-message');
const ROLE_CHANNEL_ID = '854026908487385107';


const emojis = {
    il : "• 🍃- pronom il",
    elle : "• 🍃- pronom elle",
    iel : "• 🍃- pronom iel",
    autres : "• 🍃- autres pronoms",

    Patchou_coeurcoeur1 : "• 🌸- entre 15 et 18 ans",
    Patchou_coeurcoeur2 : "• 🌸- entre 19 et 24 ans",
    Patchou_coeurcoeur3 : "• 🌸- 25 et plus",

    Patchou_glace : "• 🍃- bienvenue",
    Patchou_dango : "• 🍃-  alerte bump",
    Patchou_patisserie : "• 🍃- envie de voc",
}


/**
 * 
 * @param {MessageReaction} reaction 
 * @param {User} user 
 * @param {Boolean} add 
 */


const handleReaction = (reaction, user, add) => {
    const emojiName = reaction.emoji.name;
    const { guild } = reaction.message;
    const roleName = emojis[emojiName];
    if (user.bot) return;
    if (!roleName) return;

    const role = guild.roles.cache.find(role => role.name === roleName);

    if(!role) return;

    const member = guild.members.cache.find(member => member.id === user.id);

    if(!member) return;

    if(add) {
        member.roles.add(role);
    } else {
        member.roles.remove(role);
    }

}

/**
 * 
 * @param {Client} Client 
 * 
 */







module.exports = (Client) => {
    const channel = Client.channels.cache.find(channel => channel.id === ROLE_CHANNEL_ID);
    const getEmoji = (emojiName) => Client.emojis.cache.find(emoji => emoji.name === emojiName);
    const reactions = [];

    let text = "Réagis avec l'un des émojis suivant pour obtenir le(s) rôle(s) qui te conviennent! \n\n";

    for (const key in emojis){
        const emoji = getEmoji(key);

        if (!emoji) return;

        reactions.push(emoji);
        text += `${emoji} : ${emojis[key]}\n`
    }

    firstMessage(channel, text, reactions);

    Client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id)
        handleReaction(reaction, user, true);
    });

    Client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id)
        handleReaction(reaction, user, false);
    });
}
