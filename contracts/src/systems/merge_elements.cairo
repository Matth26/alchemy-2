#[system]
mod merge_elements_system {
    use dojo::world::Context;
    use alchemy::components::{Element, Elements};

    fn execute(ctx: Context, elem_id_1: u32, elem_id_2: u32) {
        let elem1 = get!(ctx.world, (ctx.origin, elem_id_1), (Elements));
        let elem2 = get!(ctx.world, (ctx.origin, elem_id_2), (Elements));

        let elem3 = merge_elements(elem1.element, elem2.element);
        match elem3 {
            Option::Some(new_elem) => {
                let id = ctx.world.uuid();
                set!(ctx.world, Elements { player: ctx.origin, id: id, element: new_elem });
            },
            Option::None(_) => (),
        }

        return ();
    }
    // fn merge_elements(elem1: Element, elem2: Element) -> Option<Element> {
    //     let mut e1 = elem1;
    //     let mut e2 = elem2;
    //     //if elem1. > elem2 {
    //     //    e1 = elem2;
    //     //    e2 = elem1;
    //     //}
    //     if e1 == Element::Water {
    //         if e2 == Element::Air { // Rain = Water + Air
    //             Option::Some(Element::Rain)
    //         } else if e2 == Element::Earth { // Mud = Water + Earth
    //             Option::Some(Element::Mud)
    //         } else if e2 == Element::Fire { // Steam = Water + Fire
    //             Option::Some(Element::Steam)
    //         } else if e2 == Element::Water { // Sea = Water + Water
    //             Option::Some(Element::Sea)
    //         } else if e2 == Element::Lava { // Obsidian = Lava + Water
    //             Option::Some(Element::Obsidian)
    //         } else {
    //             Option::None
    //         }
    //     } else {
    //         Option::None
    //     }
    // }

    fn merge_elements(elem1: u32, elem2: u32) -> Option<u32> {
        let mut e1 = elem1;
        let mut e2 = elem2;
        if elem1 > elem2 {
            e1 = elem2;
            e2 = elem1;
        }
        if e1 == 0 { // Water
            if e2 == 3 {
                Option::Some(8) // Rain = Water + Air
            } else if e2 == 2 {
                Option::Some(9) // Mud = Water + Earth
            } else if e2 == 1 {
                Option::Some(10) // Steam = Water + Fire
            } else if e2 == 0 {
                Option::Some(11) // Sea = Water + Water
            } else if e2 == 7 {
                Option::Some(21) // Obsidian = Lava + Water
            } else {
                Option::None
            }
        } else if e1 == 1 { // Fire
            if e2 == 3 {
                Option::Some(5) // Energy = Air + Fire
            } else if e2 == 2 {
                Option::Some(7) // Lava = Earth + Fire
            } else if e2 == 6 {
                Option::Some(17) // Gunpowder = Fire + Dust
            } else if e2 == 11 {
                Option::Some(18) // Salt = Fire + Sea
            } else if e2 == 28 {
                Option::Some(33) // Metal = Fire + Stone
            } else if e2 == 17 {
                Option::Some(34) // Explosion = Gunpowder + Fire
            } else if e2 == 13 {
                Option::Some(42) // Tobacco = Plant + Fire
            } else {
                Option::None
            }
        } else if e1 == 2 { // Earth
            if e2 == 3 {
                Option::Some(6) // Dust = Earth + Air
            } else if e2 == 1 {
                Option::Some(7) // Lava = Earth + Fire
            } else if e2 == 5 {
                Option::Some(16) // Earthquake = Earth + Energy
            } else if e2 == 10 {
                Option::Some(26) // Geyser = Steam + Earth
            } else if e2 == 15 {
                Option::Some(30) // Fog = Earth + Cloud
            } else if e2 == 31 {
                Option::Some(36) // Tsunami = Ocean + Earthquake
            } else if e2 == 41 {
                Option::Some(41) // Grass = Plant + Earth
            } else {
                Option::None
            }
        } else if e1 == 3 { // Air
            if e2 == 3 {
                Option::Some(4) // Pressure = Air + Air
            } else if e2 == 1 {
                Option::Some(5) // Energy = Air + Fire
            } else if e2 == 2 {
                Option::Some(6) // Dust = Earth + Air
            } else if e2 == 5 {
                Option::Some(12) // Wind = Air + Energy
            } else if e2 == 7 {
                Option::Some(13) // Stone = Air + Lava
            } else if e2 == 4 {
                Option::Some(14) // Atmosphere = Air + Pressure
            } else if e2 == 10 {
                Option::Some(15) // Cloud = Air + Steam
            } else if e2 == 27 {
                Option::Some(27) // Sky = Air + Cloud
            } else if e2 == 13 {
                Option::Some(28) // Sand = Air + Stone
            } else if e2 == 40 {
                Option::Some(40) // Cotton = Plant + Cloud
            } else {
                Option::None
            }
        } else {
            Option::None
        }
    }
}
