const Store = (function () {
	const config = Symbol('Config')
	const isSafeToAddEvent = Symbol('isSafeToAddEvent')
	const store = {
		[config]: {},
	}
	return {
		store,
		init(data) {
			store[config] = data
			store[config][isSafeToAddEvent] = Boolean(
				!!store[config]['secretKey']
				&&
				!!store[config]['userId']
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