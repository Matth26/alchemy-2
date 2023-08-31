import { useComponentValue } from '@dojoengine/react';
import { OverridableComponent } from '@latticexyz/recs';
import { getEntityIdFromKeys } from '../dojo/createSystemCalls';

interface ElementProps {
  component: OverridableComponent;
  address: string;
  id: number;
}

const elementsString = [
  'Water',
  'Fire',
  'Earth',
  'Air',
  'Pressure',
  'Energy',
  'Dust',
  'Lava',
  'Rain',
  'Mud',
  'Steam',
  'Sea',
  'Wind',
  'Stone',
  'Atmosphere',
  'Cloud',
  'Earthquake',
  'Gunpowder',
  'Salt',
  'Volcano',
  'Granite',
  'Obsidian',
  'Brick',
  'Plant',
  'Flood',
  'Ocean',
  'Geyser',
  'Sky',
  'Sand',
  'Wall',
  'Fog',
  'Mountain',
  'Storm',
  'Metal',
  'Explosion',
  'Swamp',
  'Tsunami',
  'Algae',
  'Isle',
  'Wave',
  'Cotton',
  'Grass',
  'Tobacco',
  'Seaweed',
  'Garden',
  'Moss',
  'Coal',
  'Ash',
  'Eruption',
  'Hurricane',
];

export const Element: React.FC<ElementProps> = ({ component, address, id }) => {
  const element = useComponentValue(
    component,
    getEntityIdFromKeys([BigInt(address), BigInt(id)])
  );

  console.log('element', id, element);

  return (
    element && <div>{elementsString[Number(element.element?.toString())]}</div>
  );
};
