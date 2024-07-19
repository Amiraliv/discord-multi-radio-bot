const { GatewayIntentBits } = require("discord-api-types/v10");

module.exports = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
};
