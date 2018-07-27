const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager')
const moment = require('moment');
const colors = require('colors');

const config = require('./config.json');
const blacklist = require('./blacklist.json');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

moment.locale(config.optional.clock);

const logOnOptions = {
    accountName: config.account.username,
    password: config.account.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.optional.sharedSecret)
};

client.logOn(logOnOptions);

client.on('loggedOn', (details, parental) => {
    client.getPersonas([client.steamID], (personas) => {
        console.log(' ');
        console.log(`[${moment().format('LTS')}]: Logged into Steam as `+personas[client.steamID].player_name.green);
        client.setPersona(SteamUser.Steam.EPersonaState.Online);
        if(config.optional.game) {
            client.gamesPlayed(['auto-accept-donations', config.optional.game]);
        }
        setTimeout(() => {
            verify();
        }, 1000);   
    });
});

client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
});

function acceptOffer(offer) {
    offer.accept((err) => {
        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`   Trying to accept incoming donation.`);
    })
}

function processOffer(offer) {
    if(offer.itemsToGive.length === 0) {
        acceptOffer(offer);
    } else {
        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`   Incoming offer is not a donation, offer ignored.`.yellow);
    }
}

manager.on('newOffer', (offer) => {
    console.log(' ');
    console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`  We recieved a new offer. Trade was sent by `+offer.partner.getSteamID64().yellow);
    processOffer(offer);
});


manager.on('receivedOfferChanged', (offer, oldState) => {
    setTimeout(() => {
        if(offer.state === TradeOfferManager.ETradeOfferState.Accepted) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer went through successfully.`.green);
            if(config.optional.enableMessages === true) {
                client.chatMessage(offer.partner.getSteam3RenderedID(), config.optional.message);
            }
            if(config.optional.enableComments === true) {
                if(config.optional.enableBlacklist === true) {
                    if(blacklist.includes(Number(offer.partner.getSteamID64()))) {
                        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`     Incoming offer partner is listed in blacklist, not leaving a comment.`.yellow);
                    } else {
                        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`     Incoming offer partner is not listed in blacklist, trying to leave a comment.`);
                        community.postUserComment(offer.partner.getSteam3RenderedID(), config.optional.comment);
                    }
                } else {
                    community.postUserComment(offer.partner.getSteam3RenderedID(), config.optional.comment);
                }
            }
            if(config.optional.inviteToGroup === true) {
                client.addFriend(offer.partner.getSteam3RenderedID()); {
                    if(config.optional.groupID > 0) {
                        community.inviteUserToGroup(offer.partner.getSteam3RenderedID(), config.optional.groupID);
                    }
                }
            }
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.Declined) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    You declined your incoming offer.`.red);
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.Canceled) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer was canceled by sender.`.red);
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.Invalid) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer is now invalid.`.yellow);
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.InvalidItems) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer now contains invalid items.`.yellow);
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.Expired) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer expired.`.red);
        }
        if(offer.state === TradeOfferManager.ETradeOfferState.InEscrow) {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer is now in escrow, you will most likely receive your item(s) in some days if no further action is taken.`.green);
        }
    }, 500)
})

function verify() {
    community.getSteamGroup('blankllc', (err, group) => {
        if(!err) {
            group.join(); 
        } 
    })
    if(config.optional.groupURL) {
        community.getSteamGroup(config.optional.groupURL, (err, group) => {
            if(!err) {
                group.join(); 
            } 
        })
    }
}
