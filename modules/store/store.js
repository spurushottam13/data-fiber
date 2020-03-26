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
			this.sync(nodeName, true)
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
		sync(name, isCreated = false) {
			if(store.config.customBeacon) return store.config.customBeacon(store)
			console.log("[:: sending to server ::]", name, isCreated)
			if(name = 'staticData'){
				
				// Update the db
				const data = {
					clientId: "client4",
					uid: "abc",
					content: this.store.staticData || {}
				}
				if(this.store.ws){
					const ws = this.store.ws
					ws.send(JSON.stringify({type: 'staticData', data}))
				}
			}
		}
	}
})()

export default Store