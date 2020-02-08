const Test = {
   trackStructEvent() {
      const list = [
         {
            selector: 'body > h2',
            type: 'mouseover',
            label: 'Hover over H2 heading'
         },
         {
            selector: 'body > p:nth-child(8) > b:nth-child(1)',
            type: 'click',
            label: 'Click on This is new para'
         }
      ]
      Fabric.trackStructEvent(list)
   },
   funnel(){
      const x = Fabric.createFunnel('x',{__init__:'init of x'})
      const y = Fabric.createFunnel('y',{__init__:'init of y'})
      x.add({a:1})
      y.add({z:2})
      y.add({y:3})
      x.add({x:1})
   }
}