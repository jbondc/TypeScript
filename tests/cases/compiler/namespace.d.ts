declare module Foo.Bar {
    export class Hello {
        name(): string;
    }
}
declare module Foo.Bar {
    export class World {
    }
}
declare module Foo.Bar {
    export class Conflict {
    }
}
declare module Foo.Bar {
    export class Conflict {
    }
}
declare module Foo.Bar {
}
declare module Foo.Bar {
    class Conflict {
    }
}
declare module Foo.Bar {
    module Good.Stuff {
        export class Something {
        }
    }
}
declare module Foo.Bar {
    export class a {
    }
    export interface b {
    }
}
