Free open-source Steam bot that automatically accepts donations.

How to setup:
1. Firstly you have to download Nodejs, you can download it here: https://nodejs.org/en/download/ 
2. Then run install.bat
3. Now configure the config.json which is located in the app folder. Crtl + F and search for option for optimal use.

  * Required:
    * Username: your Steam account name NOT nickname.
    * Password: your Steam account's password

  * Optional:
    * SharedSecret: for automated Steam log on with 2FA tutorial on how to find it here:
    * Persona: how you will apear for your friends, either Online, Offline, Busy, LookingToTrade or LookingToPlay.
    * Game: the game that will be show on your profile, eg remove the two "" and paste 440 for TF2 or 730 for CSGO, for custom games write what you want within two "" eg "accepting donations". Leave it at 0 if you don't want to idle a game.
    * Clock: your local time, eg nb for Norway, en for US, en-uk for UK and de for Germany (find your local time at https://momentjs.com)
    * enableMessages: either enable or disable messages sent when accepting a donation. False for off, true for on.
    * enableComments: either enable or disable comments when accepting a donation. False for off, true for on.
    * enableBlacklist: either enable or disable to ignore leaving comments on user profiles listed in the blacklist.json. False for off, true for on.
    * inviteToGroup: either enable or disable inviting the user you've traded with to our group (steamcommunity.com/groups/blankllc). False for off, true for on. This will help us a lot if you leave it on.
    * Message: message user will recieve if donation went through (if enabled).
    * Comment: comment user will recieve if donation went through (if enabled).


4. Run start.bat
