import Utils from "./utils.js";
import Store from "./store.js";

const SessionRecording = (function () {
   const targetNode = document;
   const config = { attributes: true, childList: true, subtree: true };
   const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
         const result = {
            type: mutation.type,
            dom: Utils.getDomAbstraction(mutation.target),
            _ts: new Date().getTime()
         }
         Store.add('sessionRecording',result)
      }
   };
   const observer = new MutationObserver(callback);
   return {
      start: _ => observer.observe(targetNode, config)
   }
})()

export default SessionRecording