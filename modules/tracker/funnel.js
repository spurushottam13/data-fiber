import Store from "../store/store.js"
import _TS from '../functions/_ts.js'
const Funnel = (function () {
   const funnelStore = Store.createNode('funnel')
   return function (name, inital) {
      if (!name) throw "[Fabric] (Store) => funnel :both name is required props"
      if (typeof inital !== 'undefined' && typeof inital !== 'object') throw "[Fabric] (Store) => funnel :inital must be object"
      const funnel = funnelStore.get()
      if (!funnel[name]) {
         funnelStore.add(name, {
            init: inital,
            _createdTS: _TS()
         })
      }
      return {
         add(data) {
            funnelStore.add(name, { data, ts: _TS() })
         }
      }
   }
})()
export default Funnel