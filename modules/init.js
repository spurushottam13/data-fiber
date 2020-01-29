import Store from "./store.js"
import Collector from "./collector.js"
import UserIdentifer from "./userIdentifier.js"
import Fingerprint from "./fingerprint.js"
import Utils from "./utils.js"
const Init = (function(){
   const _location = Symbol('Location')
   const _fingerprintId = Symbol('FingerprintId')
   console.log(Fingerprint)
   return function({userId, secretKey, startOnInit}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey: secretKey,
         userId: userId || UserIdentifer.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
         sessionDOM: Utils.getDomAbstraction(document.getElementsByTagName('html')[0]),
         [_location]: window.location,
         [_fingerprintId]: Fingerprint.fingerprintId,
         deviceInfo: Fingerprint.deviceInfo
      })
      if(startOnInit  === false ? startOnInit : true){
         Collector.start()
      }
   }
})()
export default Init