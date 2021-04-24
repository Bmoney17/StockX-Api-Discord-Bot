
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
                console.log(data1)
                const { Product } = data1;
                const sizePrices = Object.keys(Product.children).map(key => {
                    const Size = Product.children[key].shoeSize;
                    const Ask = Product.children[key].market.lowestAsk;
                    const Bid = Product.children[key].market.highestBid;
                    return { name: '**Size:** '+Size , value: Ask+' | '+Bid , inline: true }
                })
                console.log(Product.traits);

                if(Product.contentGroup === 'sneakers') {
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
                    .setDescription('Release Date: '+Product.traits[3].value+'\n'+'Style Code: '+Product.traits[0].value+'\n Retail Price: $' +Product.traits[2].value+'\n')
                    .addFields(sizePrices)
                    .setTimestamp()
                    .setFooter('Made by Bmoney#9306')
                    message.channel.send(StockXEmbed);
                }
                if(Product.contentGroup === 'streetwear-clothing') {
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
                    .setDescription('Release Season: '+Product.traits[0].value+'\n'+'Retail Price: $'+Product.traits[3].value)
                    .addFields(sizePrices)
                    .setTimestamp()
                    .setFooter('Made by Bmoney#9306')
                    message.channel.send(StockXEmbed);
                }
                if(Product.contentGroup === 'watches') {
                    const data1 = JSON.parse(response.body);
                    const { Product } = data1;
                    const sizePrices = Object.keys(Product.children).map(key => {
                        const Size = Product.children[key].shoeSize;
                        const Ask = Product.children[key].market.lowestAsk;
                        const Bid = Product.children[key].market.highestBid;
                        return { name: '**Price:** '+Size , value: Ask+' | '+Bid , inline: true }
                    })
                    
                    const StockXEmbed = new Discord.MessageEmbed()
                    .setColor('#0dd413')
                    .setTitle(Product.title)
                    .setURL('https://stockx.com/'+url_key)
                    .setThumbnail(Product.media.imageUrl)
                    .setDescription('Retail Price: $'+Product.traits[8].value+'\nReference Number: '+Product.traits[1].value)
                    .addFields(sizePrices)
                    .setTimestamp()
                    .setFooter('Made by Bmoney#9306')
                    message.channel.send(StockXEmbed);
                }
                if(Product.contentGroup === 'collectibles') {
                    const data1 = JSON.parse(response.body);
                    const { Product } = data1;
                    const sizePrices = Object.keys(Product.children).map(key => {
                        const Size = Product.children[key].shoeSize;
                        const Ask = Product.children[key].market.lowestAsk;
                        const Bid = Product.children[key].market.highestBid;
                        return { name: '**Price:** '+Size , value: Ask+' | '+Bid , inline: true }
                    })

                    const StockXEmbed = new Discord.MessageEmbed()
                    .setColor('#0dd413')
                    .setTitle(Product.title)
                    .setURL('https://stockx.com/'+url_key)
                    .setThumbnail(Product.media.imageUrl)
                    .addFields(sizePrices)
                    .setTimestamp()
                    .setFooter('Made by Bmoney#9306')
                    message.channel.send(StockXEmbed);
                }
                if(Product.contentGroup === 'handbags') {
                    const data1 = JSON.parse(response.body);
                    const { Product } = data1;
                    const sizePrices = Object.keys(Product.children).map(key => {
                        const Size = Product.children[key].shoeSize;
                        const Ask = Product.children[key].market.lowestAsk;
                        const Bid = Product.children[key].market.highestBid;
                        return { name: '**Price:**'+Size , value: Ask+' | '+Bid , inline: true }
                    })

                    const StockXEmbed = new Discord.MessageEmbed()
                    .setColor('#0dd413')
                    .setTitle(Product.title)
                    .setURL('https://stockx.com/'+url_key)
                    .setThumbnail(Product.media.imageUrl)
                    .setDescription('Retail Price: $'+Product.traits[10].value)
                    .addFields(sizePrices)
                    .setTimestamp()
                    .setFooter('Made by Bmoney#9306')
                    message.channel.send(StockXEmbed);
                }



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
