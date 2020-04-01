import Store from "../store/store.js"
import _TS from '../functions/_ts.js'
const Track = (function(){
   const trackStore = Store.createNode('track', [])
   return function(name){
     trackStore.push({name, _ts: _TS()})
   }
})()
export default Track