1. Firstly you have to download Nodejs, you can download it here: https://nodejs.org/en/download/ 
2. Then run install.bat
3. Now configure the config.json which is located in the app folder.

  * Required:
     * Username: your Steam account name NOT nickname.
     * Password: your Steam account's password.

  * Optional:
    * SharedSecret: for automated Steam log on with 2FA tutorial on how to find it here: https://goo.gl/xHVMbo
    * Game: the game that will be show on your profile, eg remove the two "" and paste 440 for TF2 or 730 for CSGO, for custom games write what you want within two "" eg "accepting donations". Leave it at 0 if you don't want to idle a game.
    * GroupID: the ID of the group you want the user to be invited to (if enabled).  
    * Clock: your local time, eg nb for Norway, en for US, en-uk for UK and de for Germany (find your local time at https://momentjs.com)
    * EnableMessages: either enable or disable messages sent when accepting a donation. False for off, true for on.
    * EnableComments: either enable or disable comments when accepting a donation. False for off, true for on.
    * EnableBlacklist: either enable or disable to ignore leaving comments on user profiles listed in the blacklist.json. False for off, true for on.
    * InviteToGroup: either enable or disable inviting the user you've traded with to our group (steamcommunity.com/groups/blankllc). False for off, true for on. This will help us a lot if you leave it on.
    * Message: message user will recieve if donation went through (if enabled).
    * Comment: comment user will recieve if donation went through (if enabled).

      * Setting up blacklist.json:
        * Paste the ID64 of the user you want to blacklist like shown in the file including a comma at the end (unless it's the last ID).
        * Example: 
        [
          674832647822432,
          436287462787237,
          827326325234267,
          876342678462772
        ]
        

4. Run start.bat
