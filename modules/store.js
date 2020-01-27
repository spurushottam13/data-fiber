import UserIdentifer from "./userIdentifier.js"
const Store = (function () {
	const config = Symbol('Config')
	const _location = Symbol('Location')
	const _userId = Symbol('UserID')
	const _secretKey = Symbol('Secret Key')
	const isSafeToAddEvent = Symbol('isSafeToAddEvent')
	const store = {
		[config]: {},
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
		createNode(nodeName,data){
			if (!store[config][isSafeToAddEvent]) throw "[Fabric] (Store) callBeforeInit :store not initiated"
			store[nodeName] = data || {}
			this.sync()
		},
		push(nodeName, key, data){
			if(!store[nodeName]) throw "[Fabric] (Store: Push) node doest not exit in store"
			if(!store[nodeName][key]){
				store[nodeName][key] = []
			}
			store[nodeName][key].push(data)
			this.sync()
		},
		getNode(nodeName){
			return store[nodeName]
		},
		sync() {
			console.log("[:: sending to server ::]", store)
		}
	}
})()

export default Store