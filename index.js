const Discord=require("discord.js")
const { Client, Intents, MessageActionRow, MessageButton} = require('discord.js');
const intents = ["GUILDS", "GUILD_MEMBERS",Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
const client = new Client({intents: intents, ws:{intents: intents}});
const welcome=require('./welcome.js')
//require("discord-buttons")(client)
const PREFIX = "$"

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  welcome(client);
})

client.on("guildMemberAdd",guildMember => {
  let welcomeRole=guildMember.guild.roles.cache.find(role => role.name === 'Bronze'); 
  
  guildMember.roles.add(welcomeRole);
      guildMember.guild.channels.cache.get('958255225381216338').send(`Welcome <@${guildMember.user.id}> to our server, Your have been assigned Bronze`);
})


client.on("messageCreate", (msg) => {
  let isBotMentioned = msg.content.toLowerCase().includes('@RoleBot#8634') || msg.content.toLowerCase().includes('@RoleBot');
  console.log(isBotMentioned);

  if(msg.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args] = msg.content
      .trim()
      .substring(PREFIX)
      .split(/\s+/);

    if(CMD_NAME.tolowercase() === "button"){
      
    }
  }
  
  if(msg.content === "Hi") {
     msg.reply(`Hi, @${msg.member.user.tag}\n ${msg.member.id}`);
   }

  if(!msg.author.bot && msg.content.indexOf("amount")!=-1){
    msg.author.send("You have 43 ETH");
  }

  if(!msg.author.bot && msg.content.indexOf("buy BoredApe")!=-1){
      msg.reply(`Hi, @${msg.member.user.tag}\n You have insufficiet balance?`);
      
  }

  if(isBotMentioned && (msg.content.indexOf("metamask") != -1 || msg.content.indexOf("Metamask") != -1)) {
     msg.reply(`Signup to Metamask ${process.env.metamask}`)
   }

  if(msg.content === "/button"){
       
    msg.channel.send({
      "content": "Verification",
      "components": [
      {
        "type": 1,
        "components": [
        {
          "style": 5,
          "label": `Verify Me`,
          "disabled": false,
          "url":'http://github.com',
          "type": 2
        },
        {
          "style": 1,
          "label": `Help !`,
          "custom_id": `help`,
          "disabled": false,
          "type": 2
        }
      ]
    }
  ],
  "embeds": [
    {
      "type": "rich",
      "title": `Lets  Verify User`,
      "description": `Verificiation is a process on how you will be verified.`,
      "color": 0x00FFFF
    }
  ]
  });
  }
})    

client.on('interactionCreate', async (interaction) => {
	//if (interaction.isCommand()) return;
  console.log("Here Interaction "+interaction.user);
	  //let welcomeRole=interaction.guild.roles.cache.find(role => role.name === 'Bronze');
  //interaction.user.roles.add(welcomeRole);
  //guildMember.guild.channels.cache.get('958255225381216338').send(`Welcome <@${interaction.user.id}> to our server, Your have been assigned Bronze`);
  
});

client.login(process.env.TOKEN);