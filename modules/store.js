import UserIdentifer from "./userIdentifier.js"
const Store = (function () {
	const config = Symbol('Config')
	const nativeEvent = Symbol('Native Event')
	const customEvent = Symbol('Custom Event')
	const _location = Symbol('Location')
	const _userId = Symbol('UserID')
	const _secretKey = Symbol('Secret Key')
	const isSafeToAddEvent = Symbol('isSafeToAddEvent')
	const store = {
		[config]: {},
		[nativeEvent]: {},
		[customEvent]: {}
	}
	return {
		store,
		init({ userId, secretKey, startOnInit }) {
			store[config] = {
				[_secretKey]: secretKey,
				[_location]: window.location,
				[_userId]: userId || UserIdentifer.getUserId(),
				startOnInit: startOnInit === false ? startOnInit : true,
				sessionDOM: document.getElementsByTagName('html')[0]._fabricDom()
			}
			store[config][isSafeToAddEvent] = Boolean(
				!!store[config][_secretKey]
				&&
				!!store[config][_userId]
				&&
				!!store[config][_location]
			)
		},
		addUserInfo(value) {
			if (typeof value !== 'object') throw "[Fabric] (Store) dataType :only object vaild in init function"
			store[config] = Object.assign(store[config], value)
			this.sync()
		},
		addNativeEvent({ type, data }) {
			if (!store[config][isSafeToAddEvent]) throw "[Fabric] (Store) callBeforeInit :store not initiated"
			if (!Boolean(!!type && !!data)) throw "[Fabric] (Store) => addNativeEvent :both type and data are required props"
			if (!store[nativeEvent][type]) {
				store[nativeEvent][type] = []
			}
			store[nativeEvent][type].push({data, ts: new Date().getTime()})
			this.sync()
		},
		addCustomEvent({ name, data }) {
			if (!store[config][isSafeToAddEvent]) throw "[Fabric] (Store) callBeforeInit :store not initiated"
			if (!Boolean(!!name && !!data)) throw "[Fabric] (Store) => addCustomeEvent :both name and data are required props"
			if (!store[customEvent][name]) {
				store[customEvent][name] = []
			}
			store[customEvent][name].push({data, ts: new Date().getTime()})
			this.sync()
		},
		getCustomeEvent(type) {
			return store[customEvent][type]
		},
		getNativeEvent(type) {
			return store[nativeEvent][type]
		},
		sync() {
			console.log("[:: sending to server ::]", store)
		}
	}
})()

export default Store