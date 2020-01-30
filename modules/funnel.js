import Store from "./store.js"

const Funnel = (function(){
   return function(name, inital){
      if (!name) throw "[Fabric] (Store) => funnel :both name is required props"
      if (typeof inital !== 'undefined' && typeof inital !== 'object') throw "[Fabric] (Store) => funnel :inital must be object"
      const funnel = Store.getNode('funnel')
      if(!funnel){
         Store.createNode('funnel')
         Store.getNode('funnel')[name] = {
            init:Object.assign({
               _createdTS: new Date().getTime()
            }, inital), 
            data:[]
         }
      }else if(!funnel[name]){
         funnel[name] = {
            init:Object.assign({
               _createdTS: new Date().getTime()
            }, inital), 
            data:[]
         }
      }
      return {
         add(tag,data){
            Store.getNode('funnel')[name].data.push({ data: {tagName: tag, data}, ts: new Date().getTime() })
         }
      }
   }
})()
export default Funnel