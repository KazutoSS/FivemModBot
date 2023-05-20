const { ActivityType } = require("discord.js");
const { bold } = require("chalk");
const { rootPath } = require("../../bot");
const { statSync } = require("node:fs");
const directorySearch = require("node-recursive-directory");
const {Collection} = require("discord.js");
module.exports = {
    name: "ready",
    runOnce: true,
    run: async (client) => {
        client.user.setActivity("Made by SwitchAlpha", {
            type: ActivityType.Watching
        });

        let allSlashCommands = 0;
        const slashCommandsTotalFiles = await directorySearch(`${rootPath}/Src/Interactions/SlashCommands`);
        await slashCommandsTotalFiles.forEach(cmdFile => {
            if (statSync(cmdFile).isDirectory()) return;
            const slashCmd = require(cmdFile);
            if (!slashCmd.name || slashCmd.ignore || !slashCmd.run) return;
            else allSlashCommands++
        });

        console.log(bold.green("[Client] ") + bold.blue(`Logged into ${client.user.tag}`));
        if (client.messageCommands.size > 0) console.log(bold.red("[MessageCommands] ") + bold.cyanBright(`Loaded ${client.messageCommands.size} MessageCommands with ${bold.white(`${client.messageCommandsAliases.size} Aliases`)}.`));
        if (client.events.size > 0) console.log(bold.yellowBright("[Events] ") + bold.magenta(`Loaded ${client.events.size} Events.`));
        if (client.buttonCommands.size > 0) console.log(bold.whiteBright("[ButtonCommands] ") + bold.greenBright(`Loaded ${client.buttonCommands.size} Buttons.`));
        if (client.selectMenus.size > 0) console.log(bold.red("[SelectMenus] ") + bold.blueBright(`Loaded ${client.selectMenus.size} SelectMenus.`));
        if (client.modalForms.size > 0) console.log(bold.cyanBright("[ModalForms] ") + bold.yellowBright(`Loaded ${client.modalForms.size} Modals.`));
        if (allSlashCommands > 0) console.log(bold.magenta("[SlashCommands] ") + bold.white(`Loaded ${allSlashCommands} SlashCommands.`));

        client.invites = new Collection();
        const wait = require("timers/promises").setTimeout;
        await wait(1000);
        client.guilds.cache.forEach(async (guild) => {
            console.log("Caching:" + guild.name);
            try{
                const firstInvites = await guild.invites.fetch();
                client.invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
            }catch(e){

            }

          });
    }
};