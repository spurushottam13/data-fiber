import Store from "./store.js";
import _TS from './_ts.js'
const TrackStructEvent = (function(){
   const eventStore =  Store.createNode('trackStructEvent')
   return function(eleList){
      eleList.forEach(element => {
         const {selector, type, label} = element
         const ele = document.querySelector(selector)
         if(ele){
            ele.addEventListener(type,function(){
               eventStore.add(label, _TS())
            })
         } 
      });
   }
})()

export default TrackStructEvent