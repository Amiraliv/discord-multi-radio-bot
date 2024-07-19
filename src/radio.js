const args = process.argv.splice(2);
const [token, channel, music] = args;

const { Client } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
} = require("@discordjs/voice");

const path = require("node:path");
const appConfig = require("./appConfig");

const client = new Client({
  intents: appConfig.intents,
});

client.on("ready", () => {
  const radioChannel = client.channels.cache.get(channel);

  const connection = joinVoiceChannel({
    channelId: radioChannel.id,
    guildId: radioChannel.guild.id,
    adapterCreator: radioChannel.guild.voiceAdapterCreator,
    selfDeaf: true,
  });

  function radio(connection) {
    const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, "music", music));

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      radio(connection);
    });
    player.on(AudioPlayerStatus.AutoPaused, () => {
      radio(connection);
    });
    player.on("error", () => {
      radio(connection);
    });
  }
  radio(connection);
});

client.login(token).then(() => console.log("Connect To", client.user.tag));
