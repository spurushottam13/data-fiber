const Utils = (function(){
   const resolvePath = (p,o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
   return{
      resolvePath
   }
})()
export default Utils