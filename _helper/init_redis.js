const config = require('./config');
const { promisify } = require("util");
const logger = require('./logger');




// let client=null
const redisConnect = async () => {
  try {
    redisClient = require('redis').createClient()
    await redisClient.connect()
     logger.info("redis connected")
    // redisClient.connect()
    //   .then(() => logger.info("connected redis"))
    //   .catch(err => console.log(err))
    // return client
  } catch (error) {
    redisClient.quit()
    logger.error(error);
  }

}



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



module.exports = {
  // getCacheClient, 
  // setValue, getValue , 
  redisConnect,
    
}