const Utils = (function(){
   const resolvePath = (p,o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
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
      const haveChild = (ele) => !!ele.children.length
		const getAttributes = (ele) => ele.getAttributeNames().map(i => ({ [i]: ele.getAttribute(i) }))
		return {
			type: ele.nodeName,
			props: getAttributes(ele),
			children: haveChild(ele) ? Array.from(ele.children).map(i => getDomAbstraction(i)) : ele.innerHTML
		}
   }
   return{
      resolvePath,
      getXpath,
      getDomAbstraction
   }
})()
export default Utils