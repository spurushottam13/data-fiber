import Store from "./store.js"
import Collector from "./collector.js"
import Fingerprint from "./fingerprint.js"
import Utils from "./utils.js"
const Init = (function(){
   console.log(Fingerprint)
   return function({userId, secretKey, startOnInit}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey: secretKey,
         userId: userId || Utils.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
         sessionDOM: Utils.getDomAbstraction(document.getElementsByTagName('html')[0]),
         location: window.location,
         fingerprintId: Fingerprint.fingerprintId,
         deviceInfo: Fingerprint.deviceInfo
      })
      if(startOnInit  === false ? startOnInit : true){
         Collector.start()
      }
   }
})()
export default Init