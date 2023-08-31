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

    let caller = starknet::contract_address_const::<0x0>();

    let call_data = array![0, 0]; // Water + Water = Sea ()
    world.execute('merge_elements_system', call_data);

    // call data for entity - it is just the caller
    let caller = starknet::contract_address_const::<0x0>();

    let call_data = array![caller.into(), 4].span();
    let element = world.entity('Elements', call_data, 0, dojo::SerdeLen::<Elements>::len());
    assert(*element[0] == 11, 'sea not good');
}

