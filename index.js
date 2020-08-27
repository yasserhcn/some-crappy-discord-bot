const Discord = require('discord.js');
const auth = require('./auth.json')
const client = new Discord.Client();
const search = require('./wikiSearch');
const fightGame = require('./game/fightGame');

let PREFIX = "*";

let fightGames = [];


client.on('ready', () => {
	/* log when the bot is ready */
  console.log(`Logged in as ${client.user.tag}!`);

  /* set bot status */
  client.user.setActivity("the better and improved bot", {
  type: "CRYING",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  });

});

client.on('message', msg => {

  if (msg.content.substr(0, 1) == PREFIX ) {
    console.log("command detected")
    console.log("sending " + msg.content.substr(1))
    commands(msg, msg.content.substr(1))
  }

	/* classic ping */
	if (msg.content == "ping")
	{
		msg.reply("pong");
  }

});

function commands(msg, cmdTxt)
{
  switch(cmdTxt.substr(0, 4))
  {
    case "ping":
      msg.channel.send("*pong*");
      break;
    case "help":
      help(msg);
      break;
    case "wiki":
      var text = cmdTxt.substr(5);
      wikiSearch(msg, text);
      break;
  }

  if (cmdTxt.substr(0,5).toLowerCase() == "fight") {

    console.log(cmdTxt.substr(6,11));
    if (cmdTxt.substr(6,11) == "strt") {
      console.log("creating a new class instance for an existing user")

      //iterate through the existing games to check if it already exists
      let exists = false;
      for (let i = 0; i < fightGames.length; i++) {
        console.log(fightGames[i]);
        console.log(i)
        if (fightGames[i].id == msg.author.id) {
          exists = true;
        }
      }

      if (exists) {
        msg.channel.send("game already exists"); 
      }else{
        fightGames.push(new fightGame.player(msg.author.id));
      }

    }
  }
}

function help(msg)
{
  let messageEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(" Help ")
        .setDescription("these are the available commands")
        .addFields(
          { name : "Prefix", value : "*****", inline : false},
          { name: "Games", value: "fight", inline: true },
          { name: "Commands", value: " wiki\n ping\n ", inline: true }
        )
        .setTimestamp()
        .setFooter("the message is finished, nothing to read here")

  msg.channel.send(messageEmbed)
}

function wikiSearch(msg, text)
{
  search.wikiSearch(msg, text);
}

client.login(auth.token);