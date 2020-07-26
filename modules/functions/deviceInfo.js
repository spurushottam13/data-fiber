const DeviceInfo = (function () {
   return {
      get: () => ({timeOpened: new Date(),
         timezone: (new Date()).getTimezoneOffset() / 60,
         pageon: window.location.pathname,
         connection: navigator.connection.effectiveType,
         memory: navigator.deviceMemory,
         referrer: document.referrer,
         previousSites: history.length,
         browserName: navigator.appName,
         browserEngine: navigator.product,
         browserVersion1a: navigator.appVersion,
         browserVersion1b: navigator.userAgent,
         browserLanguage: navigator.language,
         battery: navigator.battery,
         maxTouchPoints: navigator.maxTouchPoints,
         browserPlatform: navigator.platform,
         javaEnabled: navigator.javaEnabled(),
         dataCookiesEnabled: navigator.cookieEnabled,
         dataCookies1: document.cookie,
         dataCookies2: decodeURIComponent(document.cookie.split(";")),
         dataStorage: localStorage,
         sizeScreenW: screen.width,
         sizeScreenH: screen.height,
         sizeInW: innerWidth,
         sizeInH: innerHeight,
         sizeAvailW: screen.availWidth,
         sizeAvailH: screen.availHeight,
         scrColorDepth: screen.colorDepth,
         scrPixelDepth: screen.pixelDepth,})
   }
})()

export default DeviceInfo