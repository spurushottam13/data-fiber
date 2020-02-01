import Store from "./store.js";

const TrackStructEvent = (function(){
   return function(eleList){
      console.log(eleList)
      Store.createNode('trackStructEvent')
      eleList.forEach(element => {
         const {selector, type, label} = element
         const ele = document.querySelector(selector)
         if(ele){
            ele.addEventListener(type,function(){
              Store.push('trackStructEvent', label, new Date().getTime())
            })
         } 
      });
   }
})()

export default TrackStructEvent