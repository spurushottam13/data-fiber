import Store from './modules/store.js'
import Collector from './modules/collector.js'
import Init from './modules/init.js'
import CustomEvent from './modules/customEvent.js'
window.Fabric = (function () {
	console.log(":: Fabric initaited ::")
	if (!window || !document) throw "Fabric only support browser enviroment"
	Element.prototype._fabricDom = function () {
		const haveChild = (ele) => !!ele.children.length
		const getAttributes = (ele) => ele.getAttributeNames().map(i => ({ [i]: ele.getAttribute(i) }))
		return {
			type: this.nodeName,
			props: getAttributes(this),
			children: haveChild(this) ? Array.from(this.children).map(i => i._fabricDom()) : this.innerHTML
		}
	}
	Element.prototype._getElementXpath = function () {
		if (!this) return null
		if (this.tagName === 'BODY') {
			return '/html/body'
		} else {
			const sameTagSiblings = Array.from(this.parentNode.childNodes)
				.filter(e => e.nodeName === this.nodeName)
			const idx = sameTagSiblings.indexOf(this)
			return this.parentNode._getElementXpath() +
				'/' +
				this.tagName.toLowerCase() +
				(sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
		}
	}
	return {
		init: Init,
		store: Store,
		collector: Collector,
		startNativeEvent: Collector.start.bind(Collector),
		addEvent: CustomEvent.add.bind(CustomEvent),
		getEvent: CustomEvent.get.bind(CustomEvent),
		addUserInfo: Store.addUserInfo.bind(Store)
	}
})()
Fabric.init({secretKey:23, startOnInit: false})