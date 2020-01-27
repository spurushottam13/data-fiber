import Store from "./store.js"
import Collector from "./collector.js"
import UserIdentifer from "./userIdentifier.js"
const Init = (function(){
   const _location = Symbol('Location')
   return function({userId, secretKey, startOnInit}){
      if(!secretKey) throw "[data-fiber] (init) :secretKey is required parameter in init"
      Store.init({
         secretKey: secretKey,
         userId: userId || UserIdentifer.getUserId(),
         startOnInit: startOnInit === false ? startOnInit : true,
         sessionDOM: document.getElementsByTagName('html')[0]._fabricDom(),
         [_location]: window.location
      })
      if(startOnInit  === false ? startOnInit : true){
         Collector.start()
      }
   }
})()
export default Init