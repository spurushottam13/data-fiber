const Socket = (function () {
   return ({url}) =>  new Promise((resolve, reject) => {
      const connection = new WebSocket(url)
      connection.onopen = () => {
         console.log("Socket Connected")
         resolve(connection)
      }
      connection.onerror = () => reject
   })
})()

export default Socket