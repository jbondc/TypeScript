declare module Foo.Bar {
    class Hello {
        name(): string;
    }
}
declare module Foo.Bar {
    class World {
    }
}
declare module Foo.Bar {
    class Conflict {
    }
}
declare module Foo.Bar {
}
declare module Foo.Bar {
}
declare module Foo.Bar {
}
declare module Foo.Bar {
    module Good.Stuff {
        class Something {
        }
    }
}
declare module Foo.Bar {
    class a {
    }
    interface b {
    }
    function d(): void;
    enum e {
        test = 1,
    }
}
