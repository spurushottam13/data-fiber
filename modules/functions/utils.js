const Utils = (function () {
	const resolvePath = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
	const getXpath = (ele) => {
		if (!ele) return null
		if (ele.tagName === 'BODY') {
			return '/html/body'
		} else {
			const sameTagSiblings = Array.from(ele.parentNode.childNodes)
				.filter(e => e.nodeName === ele.nodeName)
			const idx = sameTagSiblings.indexOf(ele)
			return getXpath(ele.parentNode) +
				'/' +
				ele.tagName.toLowerCase() +
				(sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
		}
	}
	const getDomAbstraction = (ele) => {
		const haveChild = (ele) => !!ele.childNodes.length
		const getAttributes = (ele) => ele.getAttributeNames ? ele.getAttributeNames().map(i => ({ [i]: ele.getAttribute(i) })) : []
		return {
			type: ele.nodeName,
			props: getAttributes(ele),
			children: haveChild(ele) ? Array.from(ele.childNodes).map(i => getDomAbstraction(i)) : ele.nodeType === Node.TEXT_NODE ? ele.nodeValue : ele.innerHTML
		}
	}

	const generateUUID = () => {
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		})
		sessionStorage.setItem('FABRIC_SESSION_ID', uuid)
		return uuid
	} 

	const getUserId = () => ({
		userId : sessionStorage.getItem('FABRIC_SESSION_ID') ? sessionStorage.getItem('FABRIC_SESSION_ID') : generateUUID(),
		isFresh: !Boolean(sessionStorage.getItem('FABRIC_SESSION_ID'))
	})
	return {
		resolvePath,
		getXpath,
		getDomAbstraction,
		getUserId
	}
})()
export default Utils