const Store = (function () {
	const config = Symbol('config')
	const location = Symbol('Location')
	const store = {
		[config]: {
			[location]: window.location
		}
	}
	return {
		config(value) {
			if (typeof value !== 'object') throw "[Fabric] (Store) dataType :only object vaild in init function"
			store[config] = Object.assign(store[config], value)
			this.sync()
		},
		add(type, value) {
			if (!store[type]) {
				store[type] = []
			}
			store[type].push(value)
			this.sync()
		},
		get(type) {
			return store[type]
		},
		sync() {
			console.log("[:: sending to server ::]", store)
		}
	}
})()

export default Store