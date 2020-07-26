import CampaignTracker from "../tracker/campaign.js"
import Fingerprint from "../functions/fingerprint.js"
import Store from "./store.js"
import Utils from "../functions/utils.js"
import Location from "../functions/location.js"
import _TS from '../functions/_ts.js'
import DeviceInfo from "../functions/deviceInfo.js"

const StaticData = (function(){
   return {
      get: async () => ({
         fingerprint: await Fingerprint.get(),
         deviceInfo: DeviceInfo.get(),
         topPage: window.location.pathname,
         browser:"Chrome",
         browserLocation: window.location,
         campaign: CampaignTracker.get(),
         activeTime: _TS(true),
         sessionDOM: Utils.getDomAbstraction(document.getElementsByTagName('html')[0]),
         location: await Location.get()
      }),
      insert: async() => {
         const staticData = await StaticData.get()
         Store.createNode('staticData', staticData)
      }
   }
})()

export default StaticData