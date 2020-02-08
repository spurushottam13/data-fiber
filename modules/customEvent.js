import Store from "./store.js"
import _TS from './_ts.js'
const CustomEvent = (function () {
   const eventStore = Store.createNode('nativeEvent')
   return {
      add({ name, data }) {
         if (!Boolean(!!name && !!data)) throw "[Fabric] (Store) => addCustomeEvent :both name and data are required props"
         eventStore.add(name, { data, ts: _TS() })
      },
      get(type){
         return Store.getNode('customEvent')[type]
      }
   }
})()
export default CustomEvent