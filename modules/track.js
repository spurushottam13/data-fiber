import Store from "./store.js"

const Track = (function(){
   const trackStore = Store.createNode('track', true)
   return function(name){
     trackStore.push({name, _ts: new Date().getTime()})
   }
})()
export default Track