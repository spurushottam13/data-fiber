import MouseEvent from "./tracker/mouseEvent.js"

const NativeTracker  = function(){
   const start = () => {
      MouseEvent.start()
   }
   return{start}
}()
export default NativeTracker