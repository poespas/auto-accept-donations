## **Downloading NodeJS**
Like all of my other bots this bot also uses something called Node Package Modules, or NPM for short. And for using these modules you need to download NodeJS, which can be done [here](https://nodejs.org/en/download/). To see if you've downloaded NodeJS open command prompt (Windows key (⊞) + R, and type CMD, then hit the ENTER (↵) button.) and type node -v and npm -v. If the installation was successful you will see a version number starting with v then some numbers.
* [Download NodeJS](https://nodejs.org/en/download/)
#
#

**So after following the [Installation guide](https://github.com/confernn/auto-accept-donations/wiki/Installation) you're ready to configure the bot. Do not configure any other file than config.json and blacklist.json unless you know what you're doing!**

# **Required settings**
### Username
#### Username or account name of your Steam account witch can be seen in the top right corner of Steam. The username of your account is **NOT** your nickname!
#
### Password
#### The password of your Steam account.
#
#
# **Optional settings**
### SharedSecret
#### SharedSecret of your user's account to automatically log in without putting in the 2FA code manually. You would need to have your account set up to SDA to get this key. Tutorial could be found [here](https://github.com/SteamTimeIdler/stidler/wiki/Getting-your-%27shared_secret%27-code-for-use-with-Auto-Restarter-on-Mobile-Authentication).
#
### Persona
#### How you will apear for your friends. Either Online, Offline, Busy, Away, LookingToPlay or LookingToTrade.
#
### Game
#### The app ID of the game you want to idle, could be found by copying the link of the game's page in the Steam Store. E.G for TF2 use 440, for CSGO use 730.
#
### GroupURL
#### The URL of the group you want to invite the user to. This is needed to validate that you're in the group you want to invite to.
#### Delete the option ("groupURL": "https://steamcommunity.com/groups/blankllc",) to disable the option.
#
### GroupID
#### The ID64 of the group you want to invite the user to (if enabled).You can find the ID of your group here: https://steamcommunity.com/groups/YOUR_STEAM_GROUP_HERE/memberslistxml/?xml=1
#### Set the option to 0 to disable the option (Option must be a number).
#
### Clock
#### Language code for setting your local time. E.G 'en' for US, 'en-uk' for UK, 'nb' for Norway, 'ru' for Russia. You can find your local code here: momentjs.com
#
### EnableMessages
#### This option will send your custom set [message](https://github.com/confernn/auto-accept-donations/wiki/Configuration#message) to the donator. You can set this option to either true or false. 
#
### EnableComments
#### This option will publish your custom set [comment](https://github.com/confernn/auto-accept-donations/wiki/Configuration#comment) to the donator. You can set this option to either true of false. 
#
### EnableBlacklist
#### This option will either enable or disable the blacklist. If the blacklist is enabled and the ID64 listed in the blacklist and the donator's ID64 is same, it would ignore leaving a comment at the listed user's profile. Option could either be set as true or false. 
#
### InviteToGroup
#### Either true or false, will invite the donator to your previously set [GroupID](https://github.com/confernn/auto-accept-donations/wiki/Configuration#groupid) if enabled.
#
### Message
#### Custom message which will be sent to the donator if enabled.
#
### Comment
#### Custom comment that will be left at the donator's profile if enabled.
#
#
# **You're now ready to start the bot**
### Follow the last steps of the guide [here](https://github.com/confernn/auto-accept-donations/wiki/Installation#running-the-bot).
## **Running the bot**
Before running the start.bat you need to run the install.bat (this might take some minutes). When everything has been installed correctly you can finally run the start.bat. When starting the bot enter your 2FA code and you will hopefully see: **Successfully logged into Steam as 'nickname'**. 
