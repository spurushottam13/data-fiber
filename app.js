import Store from './store.js'
import Collector from './collector.js'
window.Fabric = (function () {
	console.log(":: Fabric initaited ::")
	if (!window || !document) throw "Fabric only support browser enviroment"
	Element.prototype._getAttributes = function () {
		return this.getAttributeNames().map(i => ({ [i]: this.getAttribute(i) }))
	}
	Element.prototype._haveChild = function () {
		return !!this.children.length
	}
	Element.prototype._fabricDom = function () {
		return {
			type: this.nodeName,
			props: this._getAttributes(),
			children: this._haveChild() ? Array.from(this.children).map(i => i._fabricDom()) : this.innerHTML
		}
	}
	Element.prototype._getElementXpath = function (element) {
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
	Store.config({ sessionDOM: document.getElementsByTagName('html')[0]._fabricDom() })
	return {
		store: Store,
		collector: Collector
	}
})()