﻿

namespace Foo.Bar {
    class Hello { 
        name(){
            return "hello";
        }
    }
}

namespace Foo.Bar {
    class World { }
}

namespace Foo.Bar {
    class Conflict { }
}

namespace Foo.Bar {
    class Conflict { } // TODO: checker should give an error
}

module Foo.Bar {
    class Conflict { } // ok
}

module Foo.Bar {
    export class Conflict { } // TODO: checker should give an error
}

module Foo.Bar {
    var privateStuff = 'a';

    namespace Good.Stuff {
        class Something { }
    }

	class Private { }
}


namespace Foo.Bar {
    class a {}

    interface b {}

    // type c = d;

    // function e() {}
    // enum f {}

    //function(){} // TODO: checker should give an error, or parser?
}

/*
var f = new Foo.Bar.Hello();

if(f instanceof Foo.Bar.Hello) {

}

module Test {
    import Foo.Bar; // import a namespace?

    console.log(Hello)
}
*/