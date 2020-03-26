import Store from "./store/store.js"
import Utils from "./functions/utils.js"
import NativeTracker from "./startNativeTracker.js"
import SessionRecording from "./tracker/mutationObserver.js"
import _TS from './functions/_ts.js'
import StaticData from "./staticData.js"
import Socket from "./socket/socket.js"
const Init = (function(){
   return function({userId, secretKey, startOnInit, campaignTracker,customBeacon}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey,
         customBeacon,
         campaignTracker,
         sessionTS: _TS(true),
         userId: userId || Utils.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
      })
      Socket({url: 'ws://localhost:3000/'}).then(ws => {
         Store.createNode('ws', false, ws)
         StaticData.insert()
         if(startOnInit  === false ? startOnInit : true){
            NativeTracker.start()
            SessionRecording.start()
         }
      })
   }
})()
export default Init