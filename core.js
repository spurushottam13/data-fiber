import Store from './modules/store/store.js'
import MouseEvent from './modules/tracker/mouseEvent.js'
import Init from './modules/init.js'
import CustomEvent from './modules/store/customEvent.js'
import Track from './modules/tracker/track.js'
import Funnel from './modules/tracker/funnel.js'
import NativeTracker from './modules/startNativeTracker.js'
import SessionRecording from "./modules/tracker/mutationObserver.js"
window.Fabric = (function () {
	console.log(":: Fabric initaited ::")
	if (!window || !document) throw "Fabric only support browser enviroment"
	return {
		init: Init,
		store: Store.store,
		mouseEvent: MouseEvent,
		startNativeTracker: NativeTracker.start.bind(NativeTracker),
		addEvent: CustomEvent.add.bind(CustomEvent),
		getEvent: CustomEvent.get.bind(CustomEvent),
		addUserInfo: Store.addUserInfo.bind(Store),
		track: Track,
		createFunnel: Funnel.bind(Funnel),
		record: SessionRecording
	}
})()
Fabric.init({secretKey:23, startOnInit: false, campaignTracker: ['x','y']})