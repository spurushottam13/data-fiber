import Store from "./store.js";

const TrackStructEvent = (function(){
   const eventStore =  Store.createNode('trackStructEvent')
   return function(eleList){
      eleList.forEach(element => {
         const {selector, type, label} = element
         const ele = document.querySelector(selector)
         if(ele){
            ele.addEventListener(type,function(){
               eventStore.add(label, new Date().getTime())
            })
         } 
      });
   }
})()

export default TrackStructEvent