
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

const getprice = async  () => {
    let arr = [];
    let res = await fetch('https://api.binance.com/api/v3/ticker/price');
    let data = await res.json();
    
    // 模糊查找
    data = data.filter(item => item.symbol.includes('USDT'));

    // 遍历数组
    data.forEach(item => {
        arr.push(item.symbol);
    })

    return arr;
}

let symbols = getprice();

console.log(symbols,'<---symbols');

// https://api.binance.com/api/v3/klines?symbol=MFTUSDT&interval=1m&limit=6

const limit = 6;
const interval = '1m';


const getkline = async (symbols,interval,limit) => {
    let arr = [];

    for(let i = 0; i < symbols.length; i++) {
        let res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbols[i]}&interval=${interval}&limit=${limit}`);
        let data = await res.json();
        let avgs = [];
        console.log(data,'<---data'); 
        data.forEach(item => {

            // 找出 (item[2]-item[3]) / item[3]* 100 > 0.5 的数据
            // if((item[2]-item[3]) / item[3]* 100 > 0.5) {
                avgs.push((item[2]-item[3]) / item[3]* 100 > 0.5);
            // }
        } )

        // avgs 平均值
        let avg = avgs.reduce((prev,curr) => {
            return prev + curr[4];
        } ,0) / avgs.length;

        console.log(avg, '<-----avg');


    }
    return arr;
}

let kline = getkline(symbols,interval,limit);





