const Store = (function () {
	const store = {
		config: {},
	}
	return {
		store,
		init(data) {
			store.config = data
			store.config.isSafeToAddEvent = Boolean(
				!!store.config['secretKey']
				&&
				!!store.config['userId']
			)
		},
		addUserInfo(value) {
			if (typeof value !== 'object') throw "[Fabric] (Store) dataType :only object vaild in init function"
			store.config = Object.assign(store.config, value)
			this.sync()
		},
		createNode(nodeName, isArray = false, data){
			if(!nodeName) throw "[Fabric] (Store) required missing :nodeName is required props"
			store[nodeName] = data ? data :  isArray ? [] : {}
			const add = function(key, data){
				if(!store[nodeName][key]){
					store[nodeName][key] = [data]
				}else{
					store[nodeName][key].push(data)
				}
			}
			const get = function(){
				return store[nodeName]
			}
			const push = function(data){
				if(!isArray) throw "[Fabric] (Store) not supported :node does not support push"
				store[nodeName].push(data)
			}
			return {
				add,
				get,
				push
			}
		},
		sync() {
			if(store.config.customBeacon) return store.config.customBeacon(store)
			console.log("[:: sending to server ::]", store)
		}
	}
})()

export default Store