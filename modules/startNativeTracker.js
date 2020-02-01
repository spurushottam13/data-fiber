import Collector from "./collector.js"
import CampaignTracker from "./campaign.js"

const NativeTracker  = function(){
   const start = () => {
      Collector.start()
      CampaignTracker.start()
   }
   return{start}
}()
export default NativeTracker