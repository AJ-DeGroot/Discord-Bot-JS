const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

//Import Bot Commands
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded.`);
    bot.commands.set(props.help.name, props);
  });
})
//End Import Bot Commands

//Log Bot Into Discord
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity('with Self', {type: "PLAYING"})
});

//Bot Commands
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  //Kick
  if(cmd === `${prefix}kick`){
    return;
  }

  //Ban
  if(cmd === `${prefix}ban`){
  return;
  }

  //Report
  if(cmd === `${prefix}report`){
    return;
  }

  //Server Info
  if(cmd === `${prefix}serverinfo`){
    return;
  }

  //Bot Info
  if(cmd === `${prefix}botinfo`){
    return;
  }

});
//End Bot Commands

bot.login(botconfig.token);
