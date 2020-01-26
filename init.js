import Store from "./store.js"
import Collector from "./collector.js"

const Init = (function(){
   
   return function({userId, secretKey, startOnInit}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({userId, secretKey, startOnInit})
      if(startOnInit  === false ? startOnInit : true){
         Collector.start()
      }
   }
})()
export default Init