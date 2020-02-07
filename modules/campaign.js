import Store from "./store.js"

const CampaignTracker = (function () {
	const getURLParams = (query) => new URL(window.location.href).searchParams.get(query)
	const  start = () => {
		const record = {}
		const paramList = Store.getNode('config')['campaignTracker'] || []
		const allParams = Array.from(new Set([
			'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', ...paramList
		]))
		console.log(allParams)
		allParams.forEach(i => getURLParams(i) && (record[i] = getURLParams(i)))
		Store.createNode('campaign', false, record)
	}
	return {start}
})()

export default CampaignTracker