// JavaScript source code
const Discord = require("discord.js");
const Welcome = require("./discord-welcome");
const roleClaim = require('./role-claim');
require("dotenv").config();
//const dropdown = require('./dropdown');
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],

    partials: ["CHANNEL"]

});

//Préfix des commandes
const prefix = "!P";

Client.once("ready", () => {
    console.log("\n\n~Le bot est opérationnel !");
    console.log("-----------------------------------");
    console.log("~Toutes les commandes sont opérationnelles !");
    console.log("-----------------------------------");
    console.log("~Le message de bienvenue/auto-role est opérationnel !");
    console.log("-----------------------------------");
    console.log("~La blacklist est opérationnelle !");
    console.log("-----------------------------------");
    //dropdown(Client);
    //roleClaim(Client);**************************************




    /******************************************REMINDER EN MS !******************************************/
    var MessageAuto = Client.channels.cache.find(channel => channel.id === '854026908722921515');
    console.log("~Le reminders est opérationnel !");
    setInterval(() => {
        const hey = Client.emojis.cache.get("879489588400357386")
        const embede = new Discord.MessageEmbed()        // Avec création d'un embed
            .setTitle("▔▔▔▔⬥Le reminder Disboard est là⬥▔▔▔▔▔")
            .setColor("#B0F2B6")
            .addField("⬦ Hoyé Hoyé ! __N'oubliez pas de lâcher un petit avis sur Disboard !__", "\u200B")
            .addField("⬦ **Pour quoi faire?**", "⬥ Cela permet un retour des utilisateurs sur le serveur, en notant de 1 à 5 étoiles le serveur, et guider les personnes intéressés tombant sur la page Disboard pour les convaincre de si oui ou non Patchouli vaut le détour ! \n")
            .addField("\u200B", "\u200B")
            .addField("⬦ **Comment faire?**", "⬥ Il suffit de cliquer sur le lien ci-dessus, cliquer sur **'Pourquoi ne pas laisser votre avis sur ، 🍵 Patchouli. ?'** puis Disboard vous demandera tout simplement de vous connecter avec votre compte Discord et voilà, vous pouvez rédiger votre avis ! ")
            .addField("\u200B", `⬦ Cela aide énormément l'avancée du serveur, alors prenez le temps de le faire si vous le souhaitez ! Merci d'avance ${hey} `)
            .setAuthor("Clique ici pour te rendre sur Disboard !", "https://media.discordapp.net/attachments/914150263126908948/914959964097871933/grenouilleobese.png?width=656&height=656", "https://disboard.org/server/854026908287369236")
            .setTimestamp();

        MessageAuto.send({ embeds: [embede] });

    }, 28800000); //Délais de 6h entre chaque message


});

//**********************MESSAGE DE BIENVENUE***************************//
Welcome(Client, {
    //privatemsg : "Default message, welcome anyway",
    publicmsg: `
    ⬦ @GUILDMEMBER à @MEMBER sur **Patchouli** ! @EMOJI\n
⬥ Je t'invite à lire attentivement le @REGLEMENT
⬥ Sélectionne @ROLE te correspondant !
⬥ Présente-toi dans le salon @PRESENTATION\n
⬦ **L'équipe du staff espère que tu te plairas sur le serveur, 
n'hésite pas à venir échanger avec les autres membres** @EMOJIS
    `,
    publicchannel: "854026908722921515"

});

//**********************AUTO ROLE***************************//
Client.on('guildMemberAdd', member => {
    console.log('@' + member.user.tag + ' a rejoint le serv!');
    var patchouli = member.guild.roles.cache.find(role => role.id == '854026908298903629')
    var propos = member.guild.roles.cache.find(role => role.id == '854026908298903628')
    var mesping = member.guild.roles.cache.find(role => role.id == '854026908287369242')
    member.roles.add(patchouli)
    member.roles.add(propos)
    member.roles.add(mesping);
});

//Espace commandes
Client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.guild) {



        //******************************************************************Commande bienvenue  A FAIRE**********************************************
        if (message.content === prefix + "bvn") {
            const userAuthor = message.author.toString()
            const nerd = Client.emojis.cache.get("916724957642375258")
            if (message.content === "!Pbvn") message.delete(100);
            message.channel.send(`⬦ 🌿 ${userAuthor} t'offres un pôti thé pour te souhaiter la bienvenue sur Patchouli ! ${nerd}`);

        }


        //**********************************************Commande !help et !helpm pour les modos***************************************************
        else if (message.content === prefix + "help") {
            message.delete(100);
            const embed = new Discord.MessageEmbed()        // Avec embed
                .setTitle("**Liste des commandes**")
                .setColor("#B0F2B6")
                .addField("__!Phelp__", "Affiche la liste des commandes.")
                .addField("__!Pbvn__", "Souhaite la bienvenue aux nouveaux arrivants.")
                .setTimestamp()
                .setAuthor("Lien Disboard pour y mettre une note", "https://media.discordapp.net/attachments/914150263126908948/914959964097871933/grenouilleobese.png?width=656&height=656", "https://disboard.org/server/854026908287369236");

            message.channel.send({ embeds: [embed] });

        }
        else if (message.member.permissions.has("ADMINISTRATOR")) {
            if (message.content.startsWith(prefix + "helpm")) {
                message.delete(100);
                const embed = new Discord.MessageEmbed()
                    .setTitle("**Liste des commandes de Modération**")
                    .setColor("#B0F2B6")
                    .addField("__!Pban__ + @ + __raison__", "Ban un utilisateur définitivement.")
                    .addField("__!Pkick__ + @", "Kick un utilisateur du serveur.")
                    .addField("__!Pmute__ + @", "Mute un utilisateur jusqu'au unmute.")
                    .addField("__!Pgoulag__ + @", "Mute un utilisateur mais avec un message fun :)")
                    .addField("__!Psurvivant__ + @", "Fait sortir ce brave survivant du goulag")
                    .addField("__!Ptempmute__ + @ + __temps en secondes__", "Mute un utilisateur durant une certaine durée.")
                    .setAuthor("Lien Disboard pour y mettre une note", "https://media.discordapp.net/attachments/914150263126908948/914959964097871933/grenouilleobese.png?width=656&height=656", 'https://disboard.org/server/854026908287369236')
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            }
        }


        //********************COMMANDES MODERATION/ADMINISTRATION***************************//
        if (message.member.permissions.has("BAN_MEMBERS")) {
            if (message.content.startsWith(prefix + "ban")) {
                message.delete(100);
                let mention = message.mentions.members.first();
                const args = message.content.trim().split(/ +/);
                const reason = args.slice(2).join(' ');

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    if (mention.bannable) {
                        mention.ban({ reason })
                            .then(() => {
                                const BAN = Client.emojis.cache.find(emoji => emoji.name === "BAN");
                                message.channel.send(mention.displayName + ` a été banni avec succès, bon voyage ! ${BAN}`);
                            })
                    }
                    else {
                        message.reply("Impossible de bannir ce membre :'(")
                    }
                }
            }
        }




        //***********************COMMANDES KICK***************************//
        if (message.member.permissions.has("KICK_MEMBERS")) {
            if (message.content.startsWith(prefix + "kick")) {
                message.delete(100);
                let mention = message.mentions.members.first();
                const args = message.content.trim().split(/ +/);
                const reason = args.slice(2).join(' ');

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    if (mention.kickable) {
                        mention.kick(reason)
                            .then(() => {
                                message.channel.send(mention.displayName + " a été kick avec succès !");
                            })
                    }
                    else {
                        message.reply("Impossible de kick ce membre :'(")
                    }
                }
            }
        }




        //*************************COMMANDE MUTE*********************************//
        if (message.member.permissions.has('MUTE_MEMBERS')) {
            if (message.content.startsWith(prefix + "mute")) {
                message.delete(100);
                let mention = message.mentions.members.first();

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    mention.roles.add("993999906673016952")
                    message.reply(mention.displayName + " est muté !");

                }

            }


            else if (message.content.startsWith(prefix + "unmute")) {
                message.delete(100);
                let mention = message.mentions.members.first();

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    mention.roles.remove("993999906673016952")
                    message.reply(mention.displayName + " est unmuté !");

                }
            }
            else if (message.content.startsWith(prefix + "tempmute")) {
                message.delete(100);
                let mention = message.mentions.members.first();

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    let args = message.content.split(" ");
                    mention.roles.add("993999906673016952");
                    setTimeout(function () {
                        mention.roles.remove("993999906673016952");
                        message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau, mais attention à toi !");
                    }, args[2] * 1000);

                }

            }
        }




        //*****************************COMMANDE CLEAR***********************************//
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (message.content.startsWith(prefix + "clear")) {
                let args = message.content.split(" ");

                if (args[1] == undefined) {
                    message.reply("Nombre de message non ou mal défini.");
                }
                else {
                    let number = parseInt(args[1]);

                    if (isNaN(number)) {
                        message.reply("Nombre de message non ou mal défini.");
                    }
                    else {
                        message.channel.bulkDelete(number).then(message => {
                            console.log("Suppression de " + message.size + " message réussi !");
                        }).catch(err => {
                            console.log("Erreur de clear : " + err);
                        });
                    }
                }
            }
        }


        //********************************BLACKLIST/BANWORD*************************************************//
        const blacklist = ['tapettes', 'lopettes', 'tantouze', 'tarlouze', 'tapette', 'lopette', 'pédale', 'fiotte', 'nigger', 'goudou', 'gouine', 'nègre', 'nigga', 'negro', 'pédé']
        const userAuthor = message.author.toString()
        let historique = message.content
        blacklist.forEach(word => {
            if (message.member.permissions.has("ADMINISTRATOR")) return;
            if (message.author.bot) return;

            else if (message.content.toLowerCase().includes(word)) message.delete() && message.channel.send(`Attention à ton language ${userAuthor} 😠!`) &&
                console.log(`${userAuthor} s'est fait warn par le bot pour un language grossier. Mot: ${historique}`);
        })
        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (message.content.startsWith(prefix + "blacklist")) {
                message.delete(100);

                const embed = new Discord.MessageEmbed()
                    .setTitle("**Liste des mots blacklistés**")
                    .setColor("#B0F2B6")
                    .addField("\u200B", `${blacklist[0]}, ${blacklist[1]}, ${blacklist[2]}, ${blacklist[3]}, ${blacklist[4]}, ${blacklist[5]}, ${blacklist[6]}`)
                    .addField("\u200B", `${blacklist[7]}, ${blacklist[8]}, ${blacklist[9]}, ${blacklist[10]}, ${blacklist[11]}, ${blacklist[12]}, ${blacklist[13]}`)
                    .addField("\u200B", `${blacklist[14]}`)
                    .addField("Tout abus de langage pourra et sera sanctionné par un membre du staff !", "\u200B")
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            }
        }
    }


    if (message.content === "bip") {
        message.reply("bop")
    }
    if (message.member.permissions.has("ADMINISTRATOR")) {
        if (message.content.startsWith(prefix + "bonnenuit")) {
            message.channel.send("Bonne nuit peuple de Patchouli, faites de beaux rêves !")
        }
    };

    if (message.member.permissions.has("ADMINISTRATOR")) {
        if (message.content === prefix + "rr") {
            const embed = new Discord.MessageEmbed()        // Avec embed
                .setTitle("**Les Rôles**")
                .setColor("#B0F2B6")
                .addField("\u200B", "⬦ Dans ce salon, tu vas pouvoir sélectionner les rôles te correspondant ! Pour cela, rien de plus simple, tu as juste a cliquer sur les réactions en dessous d'un message pour te voir attribuer le rôle.")
                .addField("\u200B", "\u200B")
                .addField("**⬦ Descriptions des rôles disponibles**", "\u200B")
                .addField(`__⬥ Rôles pronoms__`, "​Tu peux prendre le ou les rôles pronoms que tu aimerais voir utiliser sur le serveur. ATTENTION, un pronom ne reflète pas ton genre, tu peux simplement choisir un pronom avec lequel tu te sens le plus à l'aise, car nous nous voulons le plus inclusif possible.")
                .addField("\u200B", "@• 🍃- pronom il ➤ il est gentil ")
                .addField("\u200B", "@• 🍃- pronom elle ➤ elle est gentille ")
                .addField("\u200B", "@• 🍃- pronom iel ➤ iel est gentil(le) ")
                .addField("\u200B", "@• 🍃- autres pronoms ➤ similaire à iel, mais avec des pronoms tels que ael, aelle... ")
                .addField("\u200B", "\u200B")
                .addField("__⬥ Rôles âge__", "Prend un rôle correspondant à ton âge est OBLIGATOIRE ! C'est pour s'assurer de l'âge de nos membres (même si c'est qu'une fourchette d'âge) dans le cas de problème ")
                .addField("\u200B", "\u200B")
                .addField(`__⬥ Rôles de ping__`, "Les rôles de ping te permettent d'être ping seulement pour ce qui t'intéressent, plusieurs rôles sont disponibles mais cela n'empêchera pas les everyone en cas d'annonces importantes ! (tu peux les désactiver dans les paramètres)")
                .addField("\u200B", "@• 🍃- bienvenue ➤ lorsqu'un(e) nouvel(le) membre arrive sur le serveur, tu seras automatiquement ping par le bot afin de lui souhaiter la bienvenue !")
                .addField("\u200B", "@• 🍃-  alerte bump ➤ @Bump Buddy fera des rappels dès que la commande !d bump sera disponible pour mettre en avant le serveur sur Disboard, soit le premier à bump !")
                .addField("\u200B", "@• 🍃- envie de voc ➤ ce ping est disponible si tu souhaites venir en vocal avec des membres et les prévenir que tu es disponible.")
                .addField("\u200B", "@• 🍃- activités dessins ➤ le ping des activités dessins, que ce soit des open collab, des défis charadesign ou autre.")
                .addField("\u200B", "@• 🍃- activités jeux vidéo ➤ le ping lorsque des games sur des jeux multi seront organisés.")
                .addField("\u200B", "@• 🍃- soirée visionnage ➤ le ping lorsque des films, séries ou animés seront stream sur le serveur.");
            message.channel.send({ embeds: [embed] });

        }
            function updaterole(){
                console.log("je suis ready")
                let Embed = new Discord.MessageEmbed()
                    .setColor("#B0F2B6")
                    .setTitle("Rôles du serveur")
                    .setThumbnail(Client.user.displayAvatarURL({ dyamic: true }))
                    .setDescription("Veuillez choisir les rôles que vous voulez dans le menu déroulant ci-dessous.")
                    .setTimestamp()
                    .setFooter(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))

                const menu = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
                    .setCustomId("menu")
                    .setMaxValues(11)
                    .setMinValues(0)
                    .setPlaceholder("Nous attendons votre choix !")
                    .addOptions([{ label: "Pronom il", description: "Vous êtes un 'il'", emoji: "🍃", value: "• 🍃- pronom il" }])
                    .addOptions([{ label: "Pronom elle", description: "Vous êtes un 'elle'", emoji: "🍃", value: "• 🍃- pronom elle" }])
                    .addOptions([{ label: "Pronom iel", description: "Vous êtes un 'iel'", emoji: "🍃", value: "• 🍃- pronom iel" }])
                    .addOptions([{ label: "Pronom autre", description: "Vous êtes un 'autre'", emoji: "🍃", value: "• 🍃- autres pronoms" }])
                    .addOptions([{ label: "15-18 ans", description: "Vous avez entre 15-18 ans", emoji: "🌸", value: "• 🌸- entre 15 et 18 ans" }])
                    .addOptions([{ label: "19-24 ans", description: "Vous avez entre 19 et 24 ans", emoji: "🌸", value: "• 🌸- entre 19 et 24 ans" }])
                    .addOptions([{ label: "25 ans", description: "Vous avez plus de 25 ans", emoji: "🌸", value: "• 🌸- 25 et plus" }])
                    .addOptions([{ label: "Bienvenue", description: "Ping de nouveau membre", emoji: "🍃", value: "• 🍃- bienvenue" }])
                    .addOptions([{ label: "Bump", description: "Ping pour bump le serveur", emoji: "🍃", value: "• 🍃- alerte bump" }])
                    .addOptions([{ label: "Art raffle, dtiys et autres", description: "Art raffle, dtiys et autres", emoji: "🍃", value: "• 🍃- art raffle, dtiys et autres" }])
                    .addOptions([{ label: "Updates du serveur", description: "Ping pour les updates du serveur", emoji: "🍃", value: "• 🍃- updates du serveur" }])
                    .addOptions([{ label: "Dessins/ocs gratuits", description: "Ping pour les dessins et ocs gratuits", emoji: "🍃", value: "• 🍃- dessins/ocs gratuits" }])
                    .addOptions([{ label: "Les dessins de kenaizizi", description: "Ping pour les dessins de Kenaisie", emoji: "🍃", value: "• 🍃- les dessins de kenaizizi" }]))
                    
                let channel = Client.channels.cache.get("854026908487385107")
                let msg = await channel.send({ embeds: [Embed], components: [menu] })
                const filter = async () => true;
                const collector = msg.createMessageComponentCollector({ filter })

                collector.on("collect", async menu => {

                    let il = channel.guild.roles.cache.get("854026908298903627")
                    let elle = channel.guild.roles.cache.get("854026908298903626")
                    let iel = channel.guild.roles.cache.get("854026908298903625")
                    let autre = channel.guild.roles.cache.get("854026908298903624")

                    let mineur = channel.guild.roles.cache.get("854026908287369245")
                    let age2 = channel.guild.roles.cache.get("854026908287369244")
                    let age3 = channel.guild.roles.cache.get("854026908287369243")

                    let bienvenue = channel.guild.roles.cache.get("854026908287369241")
                    let bump = channel.guild.roles.cache.get("854026908287369239")
                    let update = channel.guild.roles.cache.get("993605630948552854")
                    let dessin = channel.guild.roles.cache.get("993606538545594368")

                    let kenaizizi = channel.guild.roles.cache.get("993606916989272134")

                    for (let i = 0; i < menu.values.length; i++) {
                        if (menu.values[i] === "• 🍃- pronom il") menu.member.roles.add("854026908298903627")
                        if (menu.values[i] === "• 🍃- pronom elle") menu.member.roles.add("854026908298903626")
                        if (menu.values[i] === "• 🍃- pronom iel") menu.member.roles.add("854026908298903625")
                        if (menu.values[i] === "• 🍃- autres pronoms") menu.member.roles.add("854026908298903624")
                        if (menu.values[i] === "• 🌸- entre 15 et 18 ans") menu.member.roles.add("854026908287369245")
                        if (menu.values[i] === "• 🌸- entre 19 et 24 ans") menu.member.roles.add("854026908287369244")
                        if (menu.values[i] === "• 🌸- 25 et plus") menu.member.roles.add("854026908287369243")
                        if (menu.values[i] === "• 🍃- bienvenue") menu.member.roles.add("854026908287369241")
                        if (menu.values[i] === "• 🍃- alerte bump") menu.member.roles.add("854026908287369239")
                        if (menu.values[i] === "• 🍃- art raffle, dtiys et autres") menu.member.roles.add("993605630948552854")
                        if (menu.values[i] === "• 🍃- updates du serveur") menu.member.roles.add("993605769343803422")
                        if (menu.values[i] === "• 🍃- dessins/ocs gratuits") menu.member.roles.add("993606538545594368")
                        if (menu.values[i] === "• 🍃- les dessins de kenaizizi") menu.member.roles.add("993606916989272134")

                    }

                    if (menu.member.roles.cache.has(il.id) && !menu.values.includes("il")) menu.member.roles.remove(il.id)
                    if (menu.member.roles.cache.has(elle.id) && !menu.values.includes("elle")) menu.member.roles.remove(elle.id)
                    if (menu.member.roles.cache.has(iel.id) && !menu.values.includes("iel")) menu.member.roles.remove(iel.id)
                    if (menu.member.roles.cache.has(autre.id) && !menu.values.includes("autre")) menu.member.roles.remove(autre.id)
                    if (menu.member.roles.cache.has(mineur.id) && !menu.values.includes("mineur")) menu.member.roles.remove(mineur.id)
                    if (menu.member.roles.cache.has(age2.id) && !menu.values.includes("age2")) menu.member.roles.remove(age2.id)
                    if (menu.member.roles.cache.has(age3.id) && !menu.values.includes("age3")) menu.member.roles.remove(age3.id)
                    if (menu.member.roles.cache.has(bienvenue.id) && !menu.values.includes("bienvenue")) menu.member.roles.remove(bienvenue.id)
                    if (menu.member.roles.cache.has(bump.id) && !menu.values.includes("bump")) menu.member.roles.remove(bump.id)
                    if (menu.member.roles.cache.has(update.id) && !menu.values.includes("update")) menu.member.roles.remove(update.id)
                    if (menu.member.roles.cache.has(dessin.id) && !menu.values.includes("kenaizizi")) menu.member.roles.remove(dessin.id)


                    menu.reply({ content: "Vos rôles on été modifiés !", ephemeral: true })
                })
    }

        if (message.member.permissions.has('MUTE_MEMBERS')) {
            if (message.content.startsWith(prefix + "goulag")) {

                let mention = message.mentions.members.first();

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    mention.roles.add("993999906673016952")
                    message.reply(mention.displayName + " est envoyé(e) au goulag, bonne chance à lui/elle 🪖 !");

                }

            }
            else if (message.content.startsWith(prefix + "survivant")) {

                let mention = message.mentions.members.first();

                if (mention == undefined) {
                    message.reply("Membre non ou mal mentionné.");
                }
                else {
                    mention.roles.remove("993999906673016952")
                    message.reply(mention.displayName + " est sorti(e) du goulag en vie ! Incroyable 🤔... ");

                }
            }
        }

        if (message.member.permissions.has("ADMINISTRATOR")) {
            if (message.content === prefix + "pp") {
                updaterole
            }
        }
        setInterval(() => {
            updaterole
        }, 2000); //86400000
    }

});






//Token du bot (à ne pas toucher)
Client.login(process.env.BOT_TOKEN);