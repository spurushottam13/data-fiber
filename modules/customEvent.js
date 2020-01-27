import Store from "./store.js"
const CustomEvent = (function () {
   const customEvent = Symbol('Custom Event')
   return {
      add({ name, data }) {
         if (!Boolean(!!name && !!data)) throw "[Fabric] (Store) => addCustomeEvent :both name and data are required props"
         if (!Store.getNode(customEvent)) {
            Store.createNode(customEvent)
         }
         Store.push(customEvent, name, { data, ts: new Date().getTime() })
      },
      get(type){
         return Store.getNode(customEvent)[type]
      }
   }
})()
export default CustomEvent