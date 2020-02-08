import Store from "./store.js"
import _TS from './_ts.js'
const Funnel = (function () {
   const funnelStore = Store.createNode('funnel')
   return function (name, inital) {
      if (!name) throw "[Fabric] (Store) => funnel :both name is required props"
      if (typeof inital !== 'undefined' && typeof inital !== 'object') throw "[Fabric] (Store) => funnel :inital must be object"
      const funnel = funnelStore.get()
      if (!funnel[name]) {
         funnelStore.add(name, {
            init: Object.assign({
               _createdTS: _TS()
            }, inital),
            data: []
         })
      }
      return {
         add(tag, data) {
            funnelStore.add(name, { data: { tagName: tag, data }, ts: _TS() })
            // Store.getNode('funnel')[name].data.push({ data: {tagName: tag, data}, ts: _TS() })
         }
      }
   }
})()
export default Funnel