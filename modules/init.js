import Store from "./store.js"
import Collector from "./collector.js"
import Fingerprint from "./fingerprint.js"
import Utils from "./utils.js"
import CampaignTracker from "./campaign.js"
import NativeTracker from "./startNativeTracker.js"
const Init = (function(){
   return function({userId, secretKey, startOnInit, campaignTracker}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey,
         campaignTracker,
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
   }
})()
export default Init