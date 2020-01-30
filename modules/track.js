import Store from "./store.js"

const Track = (function(){
   return function(name){
      if(!Store.getNode('track')){
         Store.createNode('track', [])
      }
      Store.push('track',false,name)
   }
})()
export default Track