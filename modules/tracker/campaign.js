import Store from "../store/store.js"

const CampaignTracker = (function () {
	const getURLParams = (query) => new URL(window.location.href).searchParams.get(query)
	return {
		get: ()  => {
			const record = {}
			const paramList = Store.getNode('config')['campaignTracker'] || []
			const allParams = Array.from(new Set([
				'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', ...paramList
			]))
			allParams.forEach(i => getURLParams(i) && (record[i] = getURLParams(i)))
			return record
		}
	}
})()

export default CampaignTracker