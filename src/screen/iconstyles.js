import {SymbolLayerStyle} from '@rnmapbox/maps';
import {StyleProp} from 'react-native';

export const POI_IMAGE_SIZE = 120;

const SIZE_L = 124;

export const pinLargeStyle = {
  textField: ['get', 'title'],
  textSize: SIZE_L,
  textColor: 'black',
  textHaloColor: 'white',
  // iconImage: ['get', 'image'],
  iconImage: '{image}',
  iconSize: 1 / 2,
  textHaloWidth: 2,
  textHaloBlur: 0,
  textAnchor: 'top',
  iconAnchor: 'bottom',
  textMaxWidth: 10,
  iconAllowOverlap: true,
  textAllowOverlap: true,
  iconOptional: false,
  symbolSortKey: ['get', 'priority'],
};
