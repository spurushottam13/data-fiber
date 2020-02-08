const _TS = (function(){
   const base = new Date().getTime()
   return function(isbase = false){
      if(isbase) return base
      return new Date().getTime() - base
   }
})()
export default _TS