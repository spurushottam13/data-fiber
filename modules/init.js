import Store from "./store.js"
import Fingerprint from "./fingerprint.js"
import Utils from "./utils.js"
import NativeTracker from "./startNativeTracker.js"
import SessionRecording from "./mutationObserver.js"
const Init = (function(){
   return function({userId, secretKey, startOnInit, campaignTracker,customBeacon}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey,
         customBeacon,
         campaignTracker,
         sessionTS: new Date().getTime(),
         userId: userId || Utils.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
         sessionDOM: Utils.getDomAbstraction(document.getElementsByTagName('html')[0]),
         location: window.location,
         fingerprintId: Fingerprint.fingerprintId,
         deviceInfo: Fingerprint.deviceInfo
      })
      if(startOnInit  === false ? startOnInit : true){
         NativeTracker.start()
      }
      SessionRecording.start()
   }
})()
export default Init