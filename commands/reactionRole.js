module.exports = {
  name: 'reactionRole',
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, client, axios){
    const channel='958255225381216338';
    const bronzeRole=message.guild.roles.cache.find(role => role.name === "Bronze");
    const silverRole=message.guild.roles.cache.find(role => role.name === "Silver");
      
    const bronzeEmoji='??';
        
    let embed = new Discord.MessageEmbed()
    .setColor('#e32643')
    .setTitle('Choose a team to play on!')
    .setDescription('Getting a role will enable you to view hidden channnels\n\n'+ `${bronzeEmoji} for Bronze role\n`);// + `${silverEmoji} for Bronze role\n`);

   let messageEmbed=await message.channel.send({embeds:[embed]});
    messageEmbed.react(bronzeEmoji);
    //messageEmbed.react(silverEmoji);
    
    client.on('messageReactionAdd', async(reaction,user) => {
      if(reaction.message.partial) await reaction.message.fetch();
      if(reaction.partial) await reaction.fetch();
      if(user.bot) return;
      if(!reaction.message.guild) return;
      try{
        let userDataFromBackend=await axios.get(`http://9f27-2405-201-4018-6130-f5c4-88b5-9ef1-f2ed.ngrok.io/checkStatus/check/${message.member.id}`);
        if(userDataFromBackend.data==''){
          message.channel.send("You are not in our DB, Please verify then comeback here");
        }
      }
      catch(error) {
        alert(error);
      }
      
      if(reaction.message.channel.id == channel){
        if(reaction.emoji.name === bronzeEmoji){
          await reaction.message.guild.members.cache.get(user.id).roles.add(bronzeRole);
        }
        //if(reaction.emoji.name === silverEmoji){
          //await reaction.message.guild.members.cache.get(user.id).roles.add(silverRole);
        //}
      }
      else return;
    })

    client.on('messageReactionRemove', async(reaction,user) => {
      if(reaction.message.partial) await reaction.message.fetch();
      if(reaction.partial) await reaction.fetch();
      if(user.bot) return;
      if(!reaction.message.guild) return;

      if(reaction.message.channel.id == channel){
        if(reaction.emoji.name === bronzeEmoji){
          await reaction.message.guild.members.cache.get(user.id).roles.remove(bronzeRole);
        }
        // if(reaction.emoji.name === silverEmoji){
        //   await reaction.message.guild.members.cache.get(user.id).roles.remove(silverRole);
        // }
      }
      else return;
    })
    
  }
}