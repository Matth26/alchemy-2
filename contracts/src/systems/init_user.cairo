#[system]
mod init_user_system {
    use dojo::world::Context;
    use alchemy::components::{Element, Elements};

    fn execute(ctx: Context) {
        let user = ctx.origin;

        let id = ctx.world.uuid();
        // set!(ctx.world, Elements { player: user, id: id, element: Element::Water });
        // let id = ctx.world.uuid();
        // set!(ctx.world, Elements { player: user, id: id, element: Element::Fire });
        // let id = ctx.world.uuid();
        // set!(ctx.world, Elements { player: user, id: id, element: Element::Earth });
        // let id = ctx.world.uuid();
        // set!(ctx.world, Elements { player: user, id: id, element: Element::Air });

        set!(ctx.world, Elements { player: user, id: id, element: 0 });
        let id = ctx.world.uuid();
        set!(ctx.world, Elements { player: user, id: id, element: 1 });
        let id = ctx.world.uuid();
        set!(ctx.world, Elements { player: user, id: id, element: 2 });
        let id = ctx.world.uuid();
        set!(ctx.world, Elements { player: user, id: id, element: 3 });

        return ();
    }
}
