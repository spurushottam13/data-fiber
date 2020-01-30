import Store from "./store.js"
const NativeEvent = (function () {
   return {
      add({ type, data }) {
         if (!Boolean(!!type && !!data)) throw "[Fabric] (Store) => addNativeEvent :both type and data are required props"
         if (!Store.getNode('nativeEvent')) {
            Store.createNode('nativeEvent')
         }
         Store.push('nativeEvent', type, { data, ts: new Date().getTime() })
      },
      get(type){
         return Store.getNode('nativeEvent')[type]
      }
   }
})()

export default NativeEvent