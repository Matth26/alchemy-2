// cairo core imports
use array::ArrayTrait;

// dojo core imports
use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
use dojo::test_utils::spawn_test_world;

// project imports
use alchemy::components::{elements, Element, Elements};
use alchemy::systems::init_user_system;
use alchemy::systems::merge_elements_system;

/// Spawns a mock dojo world.
fn spawn_world() -> IWorldDispatcher {
    // components
    let mut components = array![elements::TEST_CLASS_HASH];

    // systems
    let mut systems = array![
        init_user_system::TEST_CLASS_HASH, merge_elements_system::TEST_CLASS_HASH
    ];

    // deploy executor, world and register components/systems
    spawn_test_world(components, systems)
}
