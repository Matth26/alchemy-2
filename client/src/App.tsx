import { EntityIndex, setComponent } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import './App.css';
import { useDojo } from './DojoContext';
import { ElementList } from './ui/ElementList';
import { isValidArray } from './utils';
import { useElementStore } from './utils/store';

function App() {
  const {
    setup: {
      systemCalls: { init_user, merge_elements },
      components: { Elements },
      network: { graphSdk, call },
    },
    account: { create, list, select, account, isDeploying },
  } = useDojo();

  const [firstElement, setFirstElement] = useState(0);
  const [secondElement, setSecondElement] = useState(0);

  const { element_ids, add_element } = useElementStore((state) => state);

  // entity id - this example uses the account address as the entity id
  const entityId = account.address;

  useEffect(() => {
    if (!entityId) return;

    const fetchData = async () => {
      const { data } = await graphSdk.getEntities();
      console.log('entities', data);

      if (data) {
        console.log('data', data);
        const entities = data.entities?.edges;

        if (entities) {
          for (const entity of entities) {
            if (
              entity &&
              entity.node &&
              isValidArray(entity?.node.components)
            ) {
              const foundComponent = entity.node.components.find(
                (comp: any) => comp.__typename === 'Elements'
              );
              if (foundComponent) {
                console.log('setComponent', foundComponent.element);
                setComponent(
                  Elements,
                  parseInt(entityId.toString()) as EntityIndex,
                  {
                    element: foundComponent.element,
                  }
                );
              }
            }
          }
        }
      }
    };

    fetchData();
  }, [account.address]);

  return (
    <>
      <button onClick={create}>
        {isDeploying ? 'deploying burner' : 'create burner'}
      </button>
      <div className="card">
        select signer:{' '}
        <select onChange={(e) => select(e.target.value)}>
          {list().map((account, index) => {
            return (
              <option value={account.address} key={index}>
                {account.address}
              </option>
            );
          })}
        </select>
      </div>

      <div className="card">
        <button onClick={() => init_user(account, add_element)}>
          Init Player
        </button>
      </div>
      <ElementList />

      <div className="card">
        <input
          type="number"
          value={firstElement}
          onChange={(e) => setFirstElement(parseInt(e.target.value, 10))}
          placeholder="First Element"
        />
        <input
          type="number"
          value={secondElement}
          onChange={(e) => setSecondElement(parseInt(e.target.value, 10))}
          placeholder="Second Element"
        />
        <button
          onClick={() =>
            merge_elements(account, firstElement, secondElement, add_element)
          }
        >
          Merge
        </button>
      </div>
    </>
  );
}

export default App;
