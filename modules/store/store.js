const Store = (function () {
	const store = {
		config: {isSyncActive: false}
	}
	return {
		store,
		startSync(){
			this.store.config.isSyncActive = true
			this.sync('_firstCall')
		},
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
				this.sync(this[nodeName])
			}.bind(this)
			const get = function(){
				return store[nodeName]
			}
			const push = function(data){
				if(!isArray) throw "[Fabric] (Store) not supported :node does not support push"
				store[nodeName].push(data)
				this.sync(this[nodeName])
			}.bind(this)
			return {
				add,
				get,
				push
			}
		},
		getNode(name){
			return store[name]
		},
		sync(name) {
			if(!store.config.isSyncActive) return
			if(store.config.customBeacon) return store.config.customBeacon(name, store)
			if(name === '_firstCall'){
				console.log("[:: sending first-chunk ::]", store)
				this.socketSend('staticData',store.staticData)
				return
			}
		},
		socketSend(type,data){
			if(!type || !data) throw new Error('[Fabric] (Store) socketSend required two parameter')
			const {ws} = store
			ws.send(JSON.stringify({
				type,
				data: {
					clientId: store.config.clientId,
					uid: store.config.userId,
					content: data
				},
			}))
		}
	}
})()

export default Store