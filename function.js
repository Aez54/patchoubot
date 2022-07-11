function spamCheck(message, set, time) {
    // go through every user in the set Object
    for (let u of set) {
        
        // if a user was found, continue
        if (u.id === message.author.id) {
            if (u.times >= 7) {
                message.reply(`Moins vite oh, je n'arrive plus à suivre !`)
                message.member.timeout(10000)

                // reset set Object
                u.time = Date.now()
                u.times = 0
            } else if ((Date.now() - u.time) <= time) {
                u.times++
                u.time = Date.now()
            } else {
                // if u.time is above 'time' parameter, reset it
                u.time = Date.now()
                u.times = 1
            }
        }
    }

    let userInSet = false
    set.forEach(u => { 
        if (u.id === message.author.id) userInSet = true 
    })
    
    // 'times' is set to 1 instead of 0 because the member already has sent 1 message
    if (!userInSet) set.add({ id: message.author.id, time: Date.now(), times: 1 })
}

module.exports = { spamCheck }