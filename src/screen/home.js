import React, {useState, useRef, useEffect} from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {SearchBar, Icon} from '@rneui/themed';
import Mapbox from '@rnmapbox/maps';
import MapAPi from '../core/api/MapAPI';
import GeneralStatusBar from '../config/generalStatusBar/GeneralStatusBar';
import polyline from '@mapbox/polyline';
import Markers from './Markers';

Mapbox.setAccessToken(
  'sk.eyJ1IjoibG9uZ25naGllbSIsImEiOiJjbHd1ZGY5eHQwYnVlMnBzYXdjMjI5NTVoIn0.NnEC1qTUG4xAWY_-yaPp6g',
);

const windowWidth = Dimensions.get('window').width;
const data = [
  {
    coordinates: [20.9660302, 105.7582699],
    id: 'id_0',
    name: 'Test 1',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/ba79604a-f385-4341-91db-0b6f77c1c6d1.jpeg',
  },
  {
    coordinates: [20.966202619000057, 105.75844821700008],
    id: 'id_1',
    name: 'Test 2',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/ba79604a-f385-4341-91db-0b6f77c1c6d1.jpeg',
  },
  {
    coordinates: [20.96191470102079, 105.7463345910046],
    id: 'id_2',
    name: 'Test 3',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/46a984af-ebf6-4dcc-9e36-8305b6dd7957.jpg',
  },
];
const loadMap =
  'https://tiles.goong.io/assets/goong_map_web.json?api_key=XkHP3n7xhiPP9CxudwDIgsZBS6iWnXPOucj4IqSx';
const HomeScreen = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState([
    105.7582699, 20.9660302,
  ]);

  const [search, setSearch] = useState('');
  const [isShowLocation, setIsShowLocation] = useState(true);
  const [zoomLevel, setZoomlevel] = useState(14);
  const [route, setRoute] = useState([]);

  const [description, setDescription] = useState([]);
  const [locations, setLocations] = useState([]);

  const getPlacesAutocomplete = async () => {
    let autoComplete = await MapAPi.getPlacesAutocomplete({
      search: encodeURIComponent(search),
    });
    setDescription(autoComplete.predictions);
  };

  const camera = useRef(null);

  const handleOnPress = event => {
    const loc = event.geometry.coordinates;
    camera.current?.moveTo(loc, 200);
  };
  const getDirections = async () => {
    const direction = await MapAPi.getDirections({
      vehicle: 'car',
      origin: currentLocation,
      destination: locations,
    });

    const decodePolyline = encoded => {
      const decoded = polyline.decode(encoded);

      return decoded.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
    };

    const coordinates = decodePolyline(
      direction.routes[0].overview_polyline.points,
    );
    setRoute(coordinates);
  };

  const updateSearch = search => {
    setSearch(search);
    setIsShowLocation(true);
    if (search.length >= 5) {
      getPlacesAutocomplete();
    }
  };

  const _handleSubmit = async item => {
    let placeDetail = await MapAPi.getPlaceDetail({
      place_id: item.item.place_id,
    });
    // setCurrentLocation([placeDetail.result.geometry.location.lng,placeDetail.result.geometry.location.lat])
    setLocations([
      placeDetail.result.geometry.location.lng,
      placeDetail.result.geometry.location.lat,
    ]);
    setZoomlevel(14);
  };

  const renderHeader = () => {
    return (
      <View style={{...styles.toolbar}}>
        <View></View>
        <Text style={{...styles.toolbarTitle}}>Home</Text>
        <View />
      </View>
    );
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearch(item.item.description);
          setIsShowLocation(false);
          _handleSubmit(item);
        }}
        style={{paddingLeft: 8}}>
        <View style={styles.itemSelect}>
          <Icon
            name="location-outline"
            type="ionicon"
            color={'#959498'}
            size={12}
          />
          <Text>{item.item.description}</Text>
          <View></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <>
          <GeneralStatusBar
            backgroundColor={'transparent'}
            barStyle="transparent"
          />
          <SafeAreaView
            style={{
              backgroundColor: '#0E4E9B',
              paddingTop: 0,
              paddingBottom: Platform.OS == 'ios' ? -48 : 0,
            }}>
            {renderHeader()}
          </SafeAreaView>

          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Mapbox.MapView
                styleURL={loadMap}
                onPress={handleOnPress}
                style={{flex: 1}}
                projection="globe"
                zoomEnabled={true}>
                <Mapbox.Camera
                  ref={camera}
                  zoomLevel={zoomLevel}
                  centerCoordinate={
                    locations.length > 0 ? locations : currentLocation
                  }
                />
                <Markers markers={data} />
                {route.length > 0 ? (
                  <Mapbox.ShapeSource
                    id="lineSource"
                    shape={{
                      type: 'Feature',
                      geometry: {
                        type: 'LineString',
                        coordinates: route.map(coord => [
                          coord.longitude,
                          coord.latitude,
                        ]),
                      },
                    }}>
                    <Mapbox.LineLayer
                      id="lineLayer"
                      style={{
                        lineColor: '#2E64FE',
                        lineWidth: 10,
                        lineCap: 'round', // Thêm thuộc tính lineCap
                        lineJoin: 'round', // Thêm thuộc tính lineJoin
                      }}
                    />
                  </Mapbox.ShapeSource>
                ) : null}
              </Mapbox.MapView>

              <View style={styles.containerInput}>
                <View>
                  <SearchBar
                    placeholder={'Nhập đia điểm'}
                    onChangeText={updateSearch}
                    lightTheme={true}
                    value={search}
                    inputContainerStyle={styles.searchInputContainer}
                    inputStyle={styles.textSearchInput}
                    containerStyle={styles.searchContainer}
                  />
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                }}>
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 48,
                    backgroundColor: 'blue',
                    alignItems: 'center',
                  }}
                  onPress={() => getDirections()}>
                  <Text style={{color: 'white', paddingVertical: 8}}>
                    Dẫn đường
                  </Text>
                </TouchableOpacity>
              </View>
              {isShowLocation ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 64,
                    left: 0,
                    width: windowWidth,
                    backgroundColor: '#FFFF',
                  }}>
                  <FlatList data={description} renderItem={renderItem} />
                </View>
              ) : null}
            </View>
          </View>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    position: 'absolute',
    top: 2,
    left: 0,
    width: windowWidth - 98,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: '#FFFF',
  },
  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  inputLng: {
    width: 74,
    height: 42,
    borderWidth: 1,
    borderColor: '#959498',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  inputLat: {
    width: 74,
    height: 42,
    borderWidth: 1,
    borderColor: '#959498',
    borderRadius: 8,
  },
  searchInputContainer: {
    backgroundColor: '#FFFF',
    borderColor: '#FFFF',
  },
  textSearchInput: {
    fontSize: 10,
  },
  searchContainer: {
    padding: 0,
    backgroundColor: '#FFFF',
  },
  toolbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#0E4E9B',
    height: 48,
    borderBottomColor: '#e2e1e1',
    borderBottomWidth: 1,
  },
  toolbarTitle: {
    flexDirection: 'row',
    fontSize: 18,
    color: '#FFF',
  },
  icondirect: {
    width: 24,
    height: 24,
  },
  hitSlop: {
    top: 16,
    bottom: 16,
    left: 16,
    right: 16,
  },
  itemSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
});

export default HomeScreen;
