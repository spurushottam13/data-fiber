import Store from './modules/store.js'
import Collector from './modules/collector.js'
import Init from './modules/init.js'
import CustomEvent from './modules/customEvent.js'
import Track from './modules/track.js'
import Funnel from './modules/funnel.js'
import NativeTracker from './modules/startNativeTracker.js'
window.Fabric = (function () {
	console.log(":: Fabric initaited ::")
	if (!window || !document) throw "Fabric only support browser enviroment"
	return {
		init: Init,
		store: Store,
		collector: Collector,
		startNativeTracker: NativeTracker.start.bind(NativeTracker),
		addEvent: CustomEvent.add.bind(CustomEvent),
		getEvent: CustomEvent.get.bind(CustomEvent),
		addUserInfo: Store.addUserInfo.bind(Store),
		track: Track,
		createFunnel: Funnel.bind(Funnel)
	}
})()
Fabric.init({secretKey:23, startOnInit: false, campaignTracker: ['x','y']})