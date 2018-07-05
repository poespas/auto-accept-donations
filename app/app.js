const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager')
const moment = require('moment');
const colors = require('colors');

const config = require('./config.json');

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
        console.log(`[${moment().format('LTS')}]: Logged into Steam as `+personas[client.steamID].player_name.green);
        var persona = config.optional.persona;
        client.setPersona(SteamUser.Steam.EPersonaState.persona);
        if(config.optional.game != 0) {
            client.gamesPlayed([config.optional.game]);
        }
        setTimeout(function() {
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
        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`   Trying to accept incoming offer.`);
    })
}

function processOffer(offer) {
    if(offer.itemsToGive.length === 0) {
        acceptOffer(offer);
    } else {
        console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer is not a donation, offer ignored.`.yellow);
        console.log(' ');
    }
}

manager.on('newOffer', (offer) => {
    console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`  We recieved a new offer. Trade was sent by `+offer.partner.getSteamID64().yellow);
    processOffer(offer);
});

manager.on('receivedOfferChanged', (offer, oldState) => {
    if(offer.state === TradeOfferManager.ETradeOfferState.Accepted) {
        setTimeout(function() {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer went through successfully.`.green);
            console.log(' ');
            if(config.optional.enableMessages === true) {
                client.chatMessage(offer.partner.getSteam3RenderedID(), config.optional.message);
            }
            if(config.optional.enableComments === true) {
                community.postUserComment(offer.partner.getSteam3RenderedID(), config.optional.comment)
            }
            if(config.optional.inviteToGroup === true) {
                client.addFriend(offer.partner.getSteam3RenderedID()); {
                    community.inviteUserToGroup(offer.partner.getSteam3RenderedID(), 103582791440562795);
                }
            }
        }, 500);
    }
    if(offer.state === TradeOfferManager.ETradeOfferState.Declined) {
        setTimeout(function() {
            console.log(`[${moment().format('LTS')}]: `+`(${offer.id})`.yellow+`    Incoming offer was declined.`.red);
            console.log(' ');
        }, 500);
    }
})

function verify() {
    community.getSteamGroup('blankllc', (err, group) => {
        if(!err) {
            group.join();
        }
    })
}

var now = new Date();
var delay = 1 * 60 * 1000;
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

setTimeout(function support(details, parental) {
    if(config.optional.inviteToGroup != true) {
        console.log(' ');
        console.log(` Hey! Thanks for using my free script! I would really appericate if you turned the 'inviteUserToGroup' on, even though it's optional. This project is entirely community driven, which means that I do not make any money whatsoever. Thanks for understanding.`.red);
        console.log(' ');
    }
    setTimeout(support, delay);
}, start);