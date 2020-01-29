import NativeEvent from './nativeEvent.js'
import Utils from './utils.js'
const Collector = (function () {
	const events = ['mouseover', 'click', 'contextmenu']
	const shouldCaptureDOM = (type) => ['click', 'contextmenu'].includes(type)
	return {
		start() {
			events.forEach(event => window.addEventListener(event, function (e) {
				const { screenX, screenY, pageX, pageY, clientX, clientY, movementX, movementY, type, target, relatedTarget } = e
				const data = {
					position: { screenX, screenY, pageX, pageY, clientX, clientY, movementX, movementY },
					...(relatedTarget && shouldCaptureDOM(type) && { relatedDOM: Utils.getXpath(relatedTarget) }),
					...(target && shouldCaptureDOM(type) && { targetDOM: Utils.getXpath(target) })
				}
				console.log("called")
				NativeEvent.add({ type, data })
			}))
		}
	}
})()

export default Collector