import {
  Components,
  EntityIndex,
  Schema,
  setComponent,
} from '@latticexyz/recs';
import { uuid } from '@latticexyz/utils';
import { poseidonHashMany } from 'micro-starknet';
import {
  Account,
  Event,
  InvokeTransactionReceiptResponse,
  shortString,
} from 'starknet';
import { ClientComponents } from './createClientComponents';
import { SetupNetworkResult } from './setupNetwork';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { execute, contractComponents }: SetupNetworkResult,
  { Elements }: ClientComponents
) {
  const init_user = async (
    signer: Account,
    add_element: (id: number) => void
  ) => {
    const firstElemId = uuid();
    const entityId0 = getEntityIdFromKeys([BigInt(signer.address), BigInt(0)]);
    Elements.addOverride(firstElemId, {
      entity: entityId0,
      value: { element: 0 },
    });

    const secondElemId = uuid();
    const entityId1 = getEntityIdFromKeys([BigInt(signer.address), BigInt(1)]);
    Elements.addOverride(secondElemId, {
      entity: entityId1,
      value: { element: 1 },
    });

    const thirdElemId = uuid();
    const entityId2 = getEntityIdFromKeys([BigInt(signer.address), BigInt(2)]);
    Elements.addOverride(thirdElemId, {
      entity: entityId2,
      value: { element: 2 },
    });

    const forthElemId = uuid();
    const entityId3 = getEntityIdFromKeys([BigInt(signer.address), BigInt(3)]);
    Elements.addOverride(forthElemId, {
      entity: entityId3,
      value: { element: 3 },
    });

    try {
      const tx = await execute(signer, 'init_user_system', []);
      console.log('tx', tx);

      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;

      const events = receipt.events;

      if (events) {
        events.map((e) => add_element(Number(e.data[3])));
        setComponentsFromEvents(contractComponents, events);
      }
    } catch (e) {
      console.log(e);
      Elements.removeOverride(firstElemId);
      Elements.removeOverride(secondElemId);
      Elements.removeOverride(thirdElemId);
      Elements.removeOverride(forthElemId);
    } finally {
      Elements.removeOverride(firstElemId);
      Elements.removeOverride(secondElemId);
      Elements.removeOverride(thirdElemId);
      Elements.removeOverride(forthElemId);
    }
  };

  const merge_elements = async (
    signer: Account,
    elem1: number,
    elem2: number,
    add_element: (id: number) => void
  ) => {
    try {
      const tx = await execute(signer, 'merge_elements_system', [elem1, elem2]);

      const receipt = (await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      })) as InvokeTransactionReceiptResponse;

      const events = receipt.events;

      if (events) {
        events.map((e) => add_element(Number(e.data[3])));
        setComponentsFromEvents(contractComponents, events);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('e');
    }
  };

  return {
    init_user,
    merge_elements,
  };
}

export enum ComponentEvents {
  Elements = 'Elements',
}

export interface BaseEvent {
  type: ComponentEvents;
  entity: string;
}

export interface Elements extends BaseEvent {
  element: number;
}

export const parseEvent = (
  receipt: InvokeTransactionReceiptResponse
): Array<Elements> => {
  if (!receipt.events) {
    throw new Error(`No events found`);
  }

  const events: Array<Elements> = [];

  for (const raw of receipt.events) {
    const decodedEventType = shortString.decodeShortString(raw.data[0]);

    console.log('decodedEventType', raw);
    switch (decodedEventType) {
      case ComponentEvents.Elements:
        console.log('raw', raw.data);
        if (raw.data.length < 6) {
          throw new Error('Insufficient data for Elements event.');
        }

        events.push({
          type: ComponentEvents.Elements,
          entity: raw.data[2],
          element: Number(raw.data[6]),
        });
        break;

      default:
        throw new Error('Unsupported event type.');
    }
  }

  return events;
};

export function getEvents(receipt: any): any[] {
  return receipt.events.filter((event: any) => {
    return (
      event.keys.length === 1 &&
      event.keys[0] === import.meta.env.VITE_EVENT_KEY
    );
  });
}

export function setComponentsFromEvents(
  components: Components,
  events: Event[]
) {
  events.forEach((event) => setComponentFromEvent(components, event.data));
}

export function setComponentFromEvent(
  components: Components,
  eventData: string[]
) {
  // retrieve the component name
  const componentName = hexToAscii(eventData[0]);

  // retrieve the component from name
  const component = components[componentName];

  // get keys
  const keysNumber = parseInt(eventData[1]);
  let index = 2 + keysNumber + 1;

  const keys = eventData.slice(2, 2 + keysNumber).map((key) => BigInt(key));
  console.log('keys', keys);

  // get entityIndex from keys
  const entityIndex = getEntityIdFromKeys(keys);

  // get values
  const numberOfValues = parseInt(eventData[index++]);

  // get values
  const values = eventData.slice(index, index + numberOfValues);

  // create component object from values with schema
  const componentValues = Object.keys(component.schema).reduce(
    (acc: Schema, key, index) => {
      const value = values[index];
      acc[key] = Number(value);
      return acc;
    },
    {}
  );

  // set component
  setComponent(component, entityIndex, componentValues);
}

// DISCUSSION: MUD expects Numbers, but entities in Starknet are BigInts (from poseidon hash)
// so I am converting them to Numbers here, but it means that there is a bigger risk of collisions
export function getEntityIdFromKeys(keys: bigint[]): EntityIndex {
  if (keys.length === 1) {
    return parseInt(keys[0].toString()) as EntityIndex;
  }
  // calculate the poseidon hash of the keys
  const poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
  return parseInt(poseidon.toString()) as EntityIndex;
}

function hexToAscii(hex: string) {
  let str = '';
  for (let n = 2; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

function asciiToHex(ascii: string) {
  let hex = '';
  for (let i = 0; i < ascii.length; i++) {
    const charCode = ascii.charCodeAt(i);
    hex += charCode.toString(16).padStart(2, '0');
  }
  return `0x${hex}`;
}

function getEntityIdFromEvents(events: Event[], componentName: string): number {
  let entityId = 0;
  const event = events.find((event) => {
    return event.data[0] === asciiToHex(componentName);
  });
  if (event) {
    entityId = parseInt(event.data[2]);
  }
  return entityId;
}
