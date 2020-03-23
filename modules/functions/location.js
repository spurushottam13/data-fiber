const Location = (function () {
   return {
      get: () =>  new Promise((resolve) => {
         fetch('https://api.ipify.org/?format=json')
            .then(r => r.json())
            .then(data => {
               fetch(`https://ipapi.co/${data.ip}/json/`)
                  .then(r => r.json())
                  .then(resolve)
                  .catch(_ => resolve('NA'))
            })
            .catch(_ => resolve('NA'))
      })
   }
})()

export default Location