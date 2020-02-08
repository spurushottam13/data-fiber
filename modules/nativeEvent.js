import Store from "./store.js"
import _TS from './_ts.js'
const NativeEvent = (function () {
   const eventStore = Store.createNode('nativeEvent')
   return {
      add({ type, data }) {
         if (!Boolean(!!type && !!data)) throw "[Fabric] (Store) => addNativeEvent :both type and data are required props"
         eventStore.add(type,{ data, ts: _TS() })
      },
      get(type){
         return Store.getNode('nativeEvent')[type]
      }
   }
})()

export default NativeEvent