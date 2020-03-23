const Test = {
   funnel(){
      const x = Fabric.createFunnel('x',{__init__:'init of x'})
      const y = Fabric.createFunnel('y',{__init__:'init of y'})
      x.add({a:1})
      y.add({z:8})
      y.add({y:9})
      x.add({b:2})
   }
}