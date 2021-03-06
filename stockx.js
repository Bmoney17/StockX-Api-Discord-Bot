
const { DiscordAPIError, Channel } = require("discord.js")
const got = require('got');
const { product } = require("puppeteer");


module.exports = {
    name: 'stockx',
    description: 'StockX API, Created by Bmoney#9306',
    execute(message, args, Discord) {
        (async () => {
            try {

                const ErrorEmbed1 = new Discord.MessageEmbed()
                .setColor('#e30b25')
                .setTitle('Error')
                .setDescription('Product not found / invalid arguments given.')
                
                if(args.length == 0) {
                    message.channel.send(ErrorEmbed1)
                    return;
                }

                let search = args.join(' ')
                let response = await got(`https://stockx.com/api/browse?&_search=${search}&dataType=product`);
                const data = JSON.parse(response.body);
                const { Products } = data;
        
        
                let url_key = Products[0].urlKey
        
                response = await got('https://stockx.com/api/products/'+ url_key + '?includes=market');
                const data1 = JSON.parse(response.body);
                const { Product } = data1;
                const sizePrices = Object.keys(Product.children).map(key => {
                    const Size = Product.children[key].shoeSize;
                    const Ask = Product.children[key].market.lowestAsk;
                    const Bid = Product.children[key].market.highestBid;
                    return { name: '**Size:** '+Size , value: Ask+' | '+Bid , inline: true }
                })
                const StockXEmbed = new Discord.MessageEmbed()
                .setColor('#0dd413')
                .setTitle(Product.title)
                .setURL('https://stockx.com/'+url_key)
                .setThumbnail(Product.media.imageUrl)
                .setDescription('Release Date: '+Product.traits[3].value+'\n'+'Colorway: '+Product.traits[1].value+'\nStyle Code: '+Product.traits[0].value+`\nLast Sale Size: `+Product.market.lastSaleSize+'\n Retial Price: ' +Product.traits[2].value+'\n')
                .addFields(sizePrices)
                .setTimestamp()
                .setFooter('Made by Bmoney#9306')
                message.channel.send(StockXEmbed);
            } catch (error) {
                const ErrorEmbed = new Discord.MessageEmbed()
                .setColor('#e30b25')
                .setTitle('Error')
                .setDescription('Product not found / invalid arguments given.')
                message.channel.send(ErrorEmbed);
            }
        })();
    }
}
