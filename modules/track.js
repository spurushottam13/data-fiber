import Store from "./store.js"
import _TS from './_ts.js'
const Track = (function(){
   const trackStore = Store.createNode('track', true)
   return function(name){
     trackStore.push({name, _ts: _TS()})
   }
})()
export default Track