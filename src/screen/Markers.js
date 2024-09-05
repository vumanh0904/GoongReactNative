import Mapbox from '@rnmapbox/maps';
import React, {useCallback, useEffect, useMemo} from 'react';
import {pinLargeStyle} from './iconstyles';
const Markers = props => {
  const onFeaturePress = useCallback(e => {
    const [feature] = e.features;
    console.log('onPress:', feature.id);
  }, []);

  const featuresCollection = useMemo(() => {
    const features = props.markers.map((m, i) => {
      return {
        type: 'Feature',
        id: m.id,
        properties: {
          title: m.name,
          image: m.id,
          priority: i,
        },
        geometry: {
          type: 'Point',
          coordinates: [m.coordinates[1], m.coordinates[0]],
        },
      };
    });

    const collection = {
      type: 'FeatureCollection',
      features,
    };

    return collection;
  }, [props.markers]);

  const images = useMemo(() => {
    const result = {};

    props.markers.forEach(m => {
      result[m.id] = {
        uri: m.url,
        width: 500,
        height: 500,
      };
    });

    // Log the images for debugging
    console.log('images:', JSON.stringify(result, null, 2));

    return result;
  }, [props.markers]);

  const pinLargeStyle = {
    iconImage: '{image}',
    iconAllowOverlap: true,
    iconSize: 1,
  };

  return (
    <>
      <Mapbox.Images images={images} />
      <Mapbox.ShapeSource
        id="ShapeSource_1"
        shape={featuresCollection}
        onPress={onFeaturePress}
        hitbox={useMemo(() => ({width: 32, height: 32}), [])}>
        <Mapbox.SymbolLayer
          id="SymbolLayer_1"
          style={pinLargeStyle}
          aboveLayerID="boundary-land-type-0"
        />
      </Mapbox.ShapeSource>
    </>
  );
};

export default React.memo(Markers);
