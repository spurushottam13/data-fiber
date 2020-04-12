const safeSetting = {
	writable: false,
    configurable: false,
	enumerable: false
}
const Store  = (function(){
	return Object.defineProperties({}, {
		config: {
			...safeSetting,
			value: {isSyncActive: false}
		},
		startSync: {
			...safeSetting,
			value: function(){
				this.config.isSyncActive = true,
				this.sync('_firstCall')
			}
		},
		init: {
			...safeSetting,
			value: function(data){
				Object.assign(this.config, data)
				this.config.isSafeToAddEvent = Boolean(
					!!this.config['secretKey']
					&&
					!!this.config['userId']
				)
			}
		},
		addUserInfo: {
			...safeSetting,
			value: function(value){
				if (typeof value !== 'object') throw "[Fabric] (Store) dataType :only object vaild in init function"
				this.config = Object.assign(this.config, value)
				this.sync()
			}
		},
		createNode: {
			...safeSetting,
			value: function(nodeName, data){
				if(!nodeName) throw "[Fabric] (Store) required missing :nodeName is required props"
				this[nodeName] = data ? data : {}
				const add = function(key, data){
					if(!this[nodeName][key]){
						this[nodeName][key] = [data]
					}else{
						this[nodeName][key].push(data)
					}
					this.sync(this[nodeName])
				}.bind(this)
				const get = function(){
					return this[nodeName]
				}
				const push = function(data){
					if(!Array.isArray(this[nodeName])) throw "[Fabric] (Store) not supported :node does not support push"
					this[nodeName].push(data)
					this.sync(this[nodeName])
				}.bind(this)
				return {
					add,
					get,
					push
				}
			}
		},
		getNode: {
			...safeSetting,
			value: function(name){
				return this[name]
			}
		},
		sync: {
			...safeSetting,
			value: function(name) {
				if(!this.config.isSyncActive) return
				if(this.config.customBeacon) return this.config.customBeacon(name, this)
				if(name === '_firstCall'){
					console.log("[:: sending first-chunk ::]", this)
					this.socketSend('staticData',this.staticData)
					return
				}
			}
		},
		socketSend: {
			...safeSetting,
			value: function(type,data){
				if(!type || !data) throw new Error('[Fabric] (Store) socketSend required two parameter')
				const ws = this.ws
				ws.send(JSON.stringify({
					type,
					data: {
						clientId: this.config.clientId,
						uid: this.config.userId,
						content: data,
						_date: {
							month: "M-" + new Date().getMonth(),
							date: "D-" + new Date().getDate()
						}
					},
				}))
			}
		}
	})
})()
export default Store