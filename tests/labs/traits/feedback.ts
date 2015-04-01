
trait tA {
    constructor() { }
    foo() {
        this.bar();
    }
    bar() { }
}


trait tB {
    constructor() { }
    foo() { }
    bar() { }
    baz() { }
}

trait tC {
    baz() { }
}


// traits can extend traits
trait tD extends tB {
  foo() {
    super.foo();
  }
}

// trait D extends B {} -- gets flattened to (no emit):

/*
trait_tD {
  foo() {
     super.foo();
  }

  -- extends tB
  constructor() {
     return this[trait_tB_proto].constructor();
  }
  bar() {
     return this[trait_tB_proto].bar();
  }
  baz() {
     return this[trait_tB_proto].baz();
  }

  [trait_tB_proto] = {
     constructor() {}
     foo() {}
     bar() {}
     baz() {}
   }
}
*/

trait tE extends tA {

}

/*
trait_tE {
  -- extends tA
  constructor() {
     this[trait_tA_proto].constructor();
  }
  bar() {
     return this[trait_tA_proto].bar();
  }
  foo() {
     return this[trait_tA_proto].foo();
  }

  [trait_tA_proto] = { 
     constructor() {}
     foo() {}
     bar(){}
  }
}
*/

class AB {
  // use only some properties
  import { constructor, foo } from tA;

  import { bar } from tB;
}

// Emits in ES5 
var AB = (function () {
    function AB() {
        this.trait_A_proto_constructor();
    }
    AB.prototype.foo = function () {
        return this.trait_A_proto_foo();
    };
    AB.prototype.bar = function () {
        return this.trait_B_proto_bar();
    };

    // Traits, make non enumerable, non writable?
    // TODO: Use Object .defineProperty()
    AB.prototype.trait_A_proto_constructor = function () {
    };
    AB.prototype.trait_A_proto_foo = function () {
        this.bar();
    };
    AB.prototype.trait_B_proto_bar = function () {
    };
    return AB;
})();

// Emits in ES6 (symbols), engine benefit(s) of symbols?
var AB = (function () {
    const tA_proto = Symbol('tA_proto'); // import tA;
    const tB_proto = Symbol('tB_proto'); // import tB;

    function AB() {
        this[tA_proto].constructor();
    }
    AB.prototype.foo = function () {
        return this[tA_proto].foo();
    };
    AB.prototype.bar = function () {
        return this[tB_proto].bar();
    };

    AB.prototype[tA_proto] = {
        constructor: function () { },
        foo: function () {
            this.bar();
        }
    }
    AB.prototype[tB_proto] = {
        bar: function () { }
    }
    return AB;
})();


class D {
  import tD;
}

class E {
    foo() {
        return 'E';
    }
}

class DT extends E {
  import {foo as foo2} from tD;
}

  // Emits
var DT = (function (_super) {
    const tD_proto = Symbol('tD_proto'); // import tD;

    function DT() {
        _super.apply(this, arguments);
    }
    __extends(DT, _super);

    // Aliasing renames the class property but calls same [trait_D_proto].foo()
    DT.prototype.foo2 = function () {
        return this[tD_proto].foo();
    };

    DT.prototype[tD_proto] = {
        foo() {
            return _super.foo();
        }
    }
    return DT;
})(E);
