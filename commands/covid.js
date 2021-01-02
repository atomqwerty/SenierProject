const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "สถานะCOVID-19",

    async run (client, message, args){

        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('กรอกข้อมูลให้ครบ (ex: ;covid all || ;covid Thailand)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "world"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`สถานะCOVID-19ทั่วโลก🌎`)
                .addField('คอนเฟิร์มแล้ว', confirmed)
                .addField('รักษาแล้ว', recovered)
                .addField('เสียชีวิต', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`สถานะCOVID-19ของ **${countries}**`)
                .addField('คอนเฟิร์มแล้ว', confirmed)
                .addField('รักษาแล้ว', recovered)
                .addField('เสียชีวิต', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('กรอกชื่อประเทศผิด')
            })
        }
    }
}
