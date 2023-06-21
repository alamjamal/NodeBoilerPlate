const config = require('./config');
const { promisify } = require("util");
const logger = require('./logger');


// const redis = require('redis')
// let client;
// const   getCacheClient =  () => {
    // return new Promise((resolve, reject) => {

      const redisClient = require('redis').createClient()
      redisClient.connect().then(()=>logger.info("Connected To Redis Client")).catch(err=>console.log(err))

      // redisClient.on('connect', () => {
        // resolve(redisClient)
        // resolve("redis connected...");
      //   console.log("redis connected...");
      // });
  
      redisClient.on('error', (redisError) => {
        console.log('Error connecting Redis', redisError.message);
        redisClient.quit();
        throw new Error("Quited...")
        
      });
    // })
  // }





// let redisClient=null
// const redisConnect = async() => {
//   try {
//     redisClient = require('redis').createClient()

//       redisClient.on("error", (error) => {
//         logger.error(`Redis Error : ${error}`)
//         process.exit(1)
//     });

//       redisClient.on('connect', () => {
//         logger.info("Connected to redis Client...");
//       });

//     await redisClient.connect()
//     // redisClient.connect().then(()=>logger.info("connec redis")).catch(err=>console.log(err))
    
//   } catch (error) {
//     logger.error(error);
//     redisClient.quit()
//   }
 
// }


// const setValue = async (key, value) => {
//    return new Promise(async(resolve) => {
//     await redisClient.set(value, key, (err, res) => {
//       if (err) console.error(err);
//       resolve(res);
//     })
//   }
//   )
// }


// const getValue =  (key) => {
//   return new Promise(async(resolve) => {
//     await redisClient.get(key, (err, res) => {
//       if (err) console.error(err);
//       resolve(res);
//     })
//   }
//   )
// }



// async function testList() {
//   let res = await setValue('loo', 'jamal')
//   console.log('redis: ', res)
// }

// testList().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })



module.exports={
  // getCacheClient, 
  // setValue, getValue , 
  // redisConnect,
  redisClient
}