use traits::{Into, Default};
use array::{ArrayTrait, SpanTrait};

use dojo::world::IWorldDispatcherTrait;

use alchemy::components::{Element, Elements};
use alchemy::tests::utils::spawn_world;

#[test]
#[available_gas(30000000)]
fn test_init_user() {
    let world = spawn_world();

    world.execute('init_user_system', array![]);

    // call data for entity - it is just the caller
    let caller = starknet::contract_address_const::<0x0>();

    let call_data = array![caller.into(), 0].span();
    let element = world.entity('Elements', call_data, 0, dojo::SerdeLen::<Elements>::len());
    assert(*element[0] == 0, 'water not good');

    let call_data = array![caller.into(), 1].span();
    let element = world.entity('Elements', call_data, 0, dojo::SerdeLen::<Elements>::len());
    assert(*element[0] == 1, 'fire not good');

    let call_data = array![caller.into(), 2].span();
    let element = world.entity('Elements', call_data, 0, dojo::SerdeLen::<Elements>::len());
    assert(*element[0] == 2, 'earth not good');

    let call_data = array![caller.into(), 3].span();
    let element = world.entity('Elements', call_data, 0, dojo::SerdeLen::<Elements>::len());
    assert(*element[0] == 3, 'air not good');
// not yet managed
//let (entity_ids, entities) = world.entity('Elements', 0, dojo::SerdeLen::<Elements>::len());
//assert(entity_ids.len() == 4, 'should have 4 elements at start');
}

