import Store from "./store.js"

const Funnel = (function () {
   const funnelStore = Store.createNode('funnel')
   return function (name, inital) {
      if (!name) throw "[Fabric] (Store) => funnel :both name is required props"
      if (typeof inital !== 'undefined' && typeof inital !== 'object') throw "[Fabric] (Store) => funnel :inital must be object"
      const funnel = funnelStore.get()
      if (!funnel[name]) {
         funnelStore.add(name, {
            init: Object.assign({
               _createdTS: new Date().getTime()
            }, inital),
            data: []
         })
      }
      return {
         add(tag, data) {
            funnelStore.add(name, { data: { tagName: tag, data }, ts: new Date().getTime() })
            // Store.getNode('funnel')[name].data.push({ data: {tagName: tag, data}, ts: new Date().getTime() })
         }
      }
   }
})()
export default Funnel