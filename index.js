
const fetch = require("node-fetch")
 
// fetch('https://api.binance.com/api/v3/ticker/price', {
// fetch('https://api.binance.com/api/v3/ticker/price', {

//     // https://api.juejin.cn/tag_api/v1/query_category_briefs
//     method: 'GET'
// })
// .then(async res => {
//     let data = await res.json();
   
//     console.log(data,'<---data');


// })
// .catch(err => {
//     console.log('Error: ', err.message);
// });


const limit = 6;
const interval = '1m';


const getkline = async (symbols,interval,limit) => {
    let arr = [];

    for(let i = 0; i < symbols.length; i++) {
        let res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbols[i]}&interval=${interval}&limit=${limit}`);
        let data = await res.json();
        let avgs = [];

        data.forEach(item => {
            avgs.push((item[2]-item[3]) / item[3]* 100);
        } )

        // 找出平均值
        let avg = avgs.reduce((a,b) => a+b) / avgs.length;

        if (avg> 0.5) {
            arr.push(symbols[i]);
        }


    }
    return arr;
}

const getprice = async  () => {
    let arr = [];
    let res = await fetch('https://api.binance.com/api/v3/ticker/price');
    let data = await res.json();
    
    console.log(data, '<---data');


    // 模糊查找
    data = data.filter(item => item.symbol.includes('USDT'));

    // 遍历数组
    data.forEach(item => {
        arr.push(item.symbol);
    })

    return arr;
}


// const symbolsfn = async () => {

// }

 getprice().then(async res => {
    console.log(res,'<---res###');

    let symbols = res;

    let kline = await getkline(symbols,interval,limit);
    console.log(kline, '<----kline');
    // 排除UP和DOWN
    kline = kline.filter(item => !item.includes('UP') && !item.includes('DOWN'));
    console.log(kline, '<----kline##');
    

    
}).catch(err => {
    console.log(err,'<---err');
}).finally(() => {
    console.log('finally');
});


// https://api.binance.com/api/v3/klines?symbol=MFTUSDT&interval=1m&limit=6












