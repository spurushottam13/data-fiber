import Store from "./store/store.js"
import Utils from "./functions/utils.js"
import NativeTracker from "./startNativeTracker.js"
import SessionRecording from "./tracker/mutationObserver.js"
import _TS from './functions/_ts.js'
import StaticData from "./store/staticData.js"
import Socket from "./socket/socket.js"
const Init = (function(){
   return async function({userId, clientId, startOnInit = true, campaignTracker,customBeacon}){
      if(!clientId) throw "[data-fiber] (init) :clientId is required parameter in init"
      Store.init({
         clientId,
         customBeacon,
         campaignTracker,
         sessionTS: _TS(true),
         userId: userId || Utils.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
      })
      await StaticData.insert()
      if(startOnInit){
         NativeTracker.start()
         SessionRecording.start()
      }
      const ws = await Socket({url: 'ws://localhost:3000'})
      Store.createNode('ws',ws)
      Store.startSync()
   }
})()
export default Init