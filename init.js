import Store from "./store.js"
import UserIdentifer from "./userIdentifier.js"
import Collector from "./collector.js"

const Init = (function(){
   const _location = Symbol('Location')
   const _userId = Symbol('UserID')
   const _secretKey  = Symbol('Secret Key')
   return function({userId, secretKey, startOnInit}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.config({
         [_secretKey]:secretKey,
         [_location]: window.location,
         [_userId]: userId || UserIdentifer.getUserId(),
         startOnInit: startOnInit  === false ? startOnInit : true
      })
      Store.config({ sessionDOM: document.getElementsByTagName('html')[0]._fabricDom() })
      if(startOnInit  === false ? startOnInit : true){
         Collector.start()
      }
   }
})()
export default Init