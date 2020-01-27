import Store from "./store.js"

const Track = (function(){
   const track = Symbol('Track')
   return function(name){
      if(!Store.getNode(track)){
         Store.createNode(track, [])
      }
      Store.push(track,false,name)
   }
})()
export default Track