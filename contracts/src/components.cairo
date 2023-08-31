use starknet::ContractAddress;

#[cfg(test)]
use debug::PrintTrait;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Elements {
    #[key]
    player: ContractAddress,
    #[key]
    id: u32,
    // torii cannot indexed enum for now
    // element: Element,

    element: u32
}

// 00 - Water,
// 01 - Fire,
// 02 - Earth,
// 03 - Air,
// 04 - Pressure, // Air + Air
// 05 - Energy, // Air + Fire
// 06 - Dust, // Earth + Air
// 07 - Lava, // Earth + Fire
// 08 - Rain, // Water + Air
// 09 - Mud, // Water + Earth
// 10 - Steam, // Water + Fire
// 11 - Sea, // Water + Water
// 12 - Wind, // Air + Energy
// 13 - Stone, // Air + Lava
// 14 - Atmosphere, // Air + Pressure
// 15 - Cloud, // Air + Steam
// 16 - Earthquake, // Earth + Energy
// 17 - Gunpowder, // Fire + Dust
// 18 - Salt, // Fire + Sea
// 19 - Volcano, // Lava + Earth
// 20 - Granite, // Lava + Pressure
// 21 - Obsidian, // Lava + Water
// 22 - Brick, // Mud + Fire
// 23 - Plant, // Rain + Earth
// 24 - Flood, // Rain + Rain
// 25 - Ocean, // Sea + Sea
// 26 - Geyser, // Steam + Earth
// 27 - Sky, // Air + Cloud
// 28 - Sand, // Air + Stone
// 29 - Wall, // Brick + Brick
// 30 - Fog, // Earth + Cloud
// 31 - Mountain, // Earthquake + Earth
// 32 - Storm, // Energy + Cloud
// 33 - Metal, // Fire + Stone
// 34 - Explosion, // Gunpowder + Fire
// 35 - Swamp, // Mud + Plant
// 36 - Tsunami, // Ocean + Earthquake
// 37 - Algae, // Ocean + Plant
// 38 - Isle, // Ocean + Volcano
// 39 - Wave, // Ocean + Wind
// 40 - Cotton, // Plant + Cloud
// 41 - Grass, // Plant + Earth
// 42 - Tobacco, // Plant + Fire
// 43 - Seaweed, // Plant + Ocean
// 44 - Garden, // Plant + Plant
// 45 - Moss, // Plant + Stone
// 46 - Coal, // Pressure + Plant
// 47 - Ash, // Volcano + Energy
// 48 - Eruption, // Volcano + Energy
// 49 - Hurricane, // Wind + Energy

#[derive(Copy, PartialEq, PartialOrd, Drop, Serde)]
enum Element {
    Water,
    Fire,
    Earth,
    Air,
    Pressure, // Air + Air
    Energy, // Air + Fire
    Dust, // Earth + Air
    Lava, // Earth + Fire
    Rain, // Water + Air
    Mud, // Water + Earth
    Steam, // Water + Fire
    Sea, // Water + Water
    Wind, // Air + Energy
    Stone, // Air + Lava
    Atmosphere, // Air + Pressure
    Cloud, // Air + Steam
    Earthquake, // Earth + Energy
    Gunpowder, // Fire + Dust
    Salt, // Fire + Sea
    Volcano, // Lava + Earth
    Granite, // Lava + Pressure
    Obsidian, // Lava + Water
    Brick, // Mud + Fire
    Plant, // Rain + Earth
    Flood, // Rain + Rain
    Ocean, // Sea + Sea
    Geyser, // Steam + Earth
    Sky, // Air + Cloud
    Sand, // Air + Stone
    Wall, // Brick + Brick
    Fog, // Earth + Cloud
    Mountain, // Earthquake + Earth
    Storm, // Energy + Cloud
    Metal, // Fire + Stone
    Explosion, // Gunpowder + Fire
    Swamp, // Mud + Plant
    Tsunami, // Ocean + Earthquake
    Algae, // Ocean + Plant
    Isle, // Ocean + Volcano
    Wave, // Ocean + Wind
    Cotton, // Plant + Cloud
    Grass, // Plant + Earth
    Tobacco, // Plant + Fire
    Seaweed, // Plant + Ocean
    Garden, // Plant + Plant
    Moss, // Plant + Stone
    Coal, // Pressure + Plant
    Ash, // Volcano + Energy
    Eruption, // Volcano + Energy
    Hurricane, // Wind + Energy
}

impl ElementSerdeLen of dojo::SerdeLen<Element> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}

#[cfg(test)]
impl ElementPrint of debug::PrintTrait<Element> {
    fn print(self: Element) {
        match self {
            Element::Water => 'Water'.print(),
            Element::Fire => 'Fire'.print(),
            Element::Earth => 'Earth'.print(),
            Element::Air => 'Air'.print(),
            Element::Pressure => 'Pressure'.print(),
            Element::Energy => 'Energy'.print(),
            Element::Dust => 'Dust'.print(),
            Element::Lava => 'Lava'.print(),
            Element::Rain => 'Rain'.print(),
            Element::Mud => 'Mud'.print(),
            Element::Steam => 'Steam'.print(),
            Element::Sea => 'Sea'.print(),
            Element::Wind => 'Wind'.print(),
            Element::Stone => 'Stone'.print(),
            Element::Atmosphere => 'Atmosphere'.print(),
            Element::Cloud => 'Cloud'.print(),
            Element::Earthquake => 'Earthquake'.print(),
            Element::Gunpowder => 'Gunpowder'.print(),
            Element::Salt => 'Salt'.print(),
            Element::Volcano => 'Volcano'.print(),
            Element::Granite => 'Granite'.print(),
            Element::Obsidian => 'Obsidian'.print(),
            Element::Brick => 'Brick'.print(),
            Element::Plant => 'Plant'.print(),
            Element::Flood => 'Flood'.print(),
            Element::Ocean => 'Ocean'.print(),
            Element::Geyser => 'Geyser'.print(),
            Element::Sky => 'Sky'.print(),
            Element::Sand => 'Sand'.print(),
            Element::Wall => 'Wall'.print(),
            Element::Fog => 'Fog'.print(),
            Element::Mountain => 'Mountain'.print(),
            Element::Storm => 'Storm'.print(),
            Element::Metal => 'Metal'.print(),
            Element::Explosion => 'Explosion'.print(),
            Element::Swamp => 'Swamp'.print(),
            Element::Tsunami => 'Tsunami'.print(),
            Element::Algae => 'Algae'.print(),
            Element::Isle => 'Isle'.print(),
            Element::Wave => 'Wave'.print(),
            Element::Cotton => 'Cotton'.print(),
            Element::Grass => 'Grass'.print(),
            Element::Tobacco => 'Tobacco'.print(),
            Element::Seaweed => 'Seaweed'.print(),
            Element::Garden => 'Garden'.print(),
            Element::Moss => 'Moss'.print(),
            Element::Coal => 'Coal'.print(),
            Element::Ash => 'Ash'.print(),
            Element::Eruption => 'Eruption'.print(),
            Element::Hurricane => 'Hurricane'.print(),
        }
    }
}

