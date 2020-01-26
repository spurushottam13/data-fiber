import Store from './store.js'
const Collector = (function () {
	const events = ['mouseover', 'click', 'contextmenu']
	const shouldCaptureDOM = (type) => ['click', 'contextmenu'].includes(type)
	return {
		start() {
			events.forEach(event => window.addEventListener(event, function (e) {
				const { screenX, screenY, pageX, pageY, clientX, clientY, movementX, movementY, type, target, relatedTarget } = e
				const data = {
					position: { screenX, screenY, pageX, pageY, clientX, clientY, movementX, movementY },
					...(relatedTarget && shouldCaptureDOM(type) && { relatedDOM: relatedTarget._getElementXpath() }),
					...(target && shouldCaptureDOM(type) && { targetDOM: target._getElementXpath() })
				}
				Store.add(type, data)
			}))
		}
	}
})()

export default Collector