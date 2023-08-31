import { useDojo } from '../DojoContext';
import { useElementStore } from '../utils/store';
import { Element } from './Element';

export const ElementList = () => {
  const {
    setup: {
      components: { Elements },
    },
    account: { account },
  } = useDojo();

  const ids = useElementStore((state) => state.element_ids);
  console.log('ids', ids);

  return (
    <div>
      {ids.map((e) => (
        <Element component={Elements} address={account.address} id={e} />
      ))}
    </div>
  );
};
