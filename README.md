<div class="breakCrumb">
<a class="path-breakCrumb main-path" href="../jsdoc/tutorial-Javascript-Api.html">Goong Documents</a>
<div class="icon-path">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
</div>
<a class="path-breakCrumb">React Native</a>
</div>

<div id="Using"></div>

## Sử dụng Goong Maps với Goong React Native

Phiên bản hiện tại: `v1.0.9`

- Tuỳ chỉnh kiểu bản đồ
- Tải map nhanh
- Tương thích với các công cụ khác của Goong

<svg class="icon-logo" viewBox="0 0 1790 1790" class="shell-icon shell-icon--s shell-inline"><path d="M704 1216q0 40-12.5 82t-43 76-72.5 34-72.5-34-43-76-12.5-82 12.5-82 43-76 72.5-34 72.5 34 43 76 12.5 82zm640 0q0 40-12.5 82t-43 76-72.5 34-72.5-34-43-76-12.5-82 12.5-82 43-76 72.5-34 72.5 34 43 76 12.5 82zm160 0q0-120-69-204t-187-84q-41 0-195 21-71 11-157 11t-157-11q-152-21-195-21-118 0-187 84t-69 204q0 88 32 153.5t81 103 122 60 140 29.5 149 7h168q82 0 149-7t140-29.5 122-60 81-103 32-153.5zm224-176q0 207-61 331-38 77-105.5 133t-141 86-170 47.5-171.5 22-167 4.5q-78 0-142-3t-147.5-12.5-152.5-30-137-51.5-121-81-86-115q-62-123-62-331 0-237 136-396-27-82-27-170 0-116 51-218 108 0 190 39.5t189 123.5q147-35 309-35 148 0 280 32 105-82 187-121t189-39q51 102 51 218 0 87-27 168 136 160 136 398z"></path></svg>
<a style="text-decoration:none" href="https://github.com/react-native-mapbox-gl/maps/">Đóng góp trên GitHub</a>

<hr class="bl-hr">

#####

Goong React native sử dụng các thư viện mobile dựa trên Mapbox để cung cấp các yếu tố bản đồ cho các ứng dụng của bạn. Nó là một phần của [hệ sinh thái Goong GL](https://github.com/goong-io).
Để bắt đầu với Goong React Native hoặc bất kỳ nền tảng nào khác của chúng tôi, [hãy tự tạo cho bạn một API key](https://account.goong.io/).

#####

<hr class="bl-hr">

### Bắt đầu ngay

###

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

</head>
<body>
<div id="map"></div>

</body>
</html>

<input type="radio" class="check1" name="CDN" checked id="check1" hidden>
<input type="radio" class="check2" name="CDN" id="check2" hidden>

<div class="CDN-content1">

Đầu tiên bạn phải làm là cài đặt thư viện rnmapbox/maps bằng lệnh sau :

Sử dụng yarn

```html
yarn add @rnmapbox/maps
```

Sử dụng npm

```html
npm install --save @rnmapbox/maps
```

**Cài đặt accessToken**

```Javascript
import MapboxGL from "@rnmapbox/maps";
MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");</YOUR_ACCESSTOKEN>
```

Cài đặt trạng thái kết nối(áp dụng cho Android)

```Javascript
import MapboxGL from "@rnmapbox/maps";
MapboxGL.setConnected(true);
```

**Hiển thị bản đồ**

Ví dụ:

```Javascript
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import MapAPi from '../core/api/MapAPI';

MapboxGL.setConnected(true); // áp dụng cho android
MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");

const App = () => {
  const [loadMap] = useState();
  /*sử dụng Load Map*/ // kiểu URL cho bản đồ
  const [coordinates] = useState([105.83991, 21.028]); // Vị trí mà bản đồ nên căn giữa. [lng, lat]


  const camera = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        styleURL={loadMap}
        onPress={handleOnPress}
        style={{ flex: 1 }}
        projection="globe" //Phép chiếu được sử dụng khi hiển thị bản đồ
        zoomEnabled={true}
      >
        <MapboxGL.Camera
          ref={camera}
          zoomLevel={6} // Mức thu phóng của bản đồ
          centerCoordinate={coordinates}
        />
      </MapboxGL.MapView>
    </View>
  );
};

export default App;
```

</div>

<!-- <div class="CDN-content2"> -->

**Đánh dấu**

1. Khởi tạo bản đồ (Hiển thị bản đồ)
2. Lấy dữ liệu từ goongApi
3. Gán PointAnnotation vào bản đồ
   ví dụ :

```Javascript
import MapboxGL from "@rnmapbox/maps";

...
const App = () => {
const [locations, setLocations] = useState([]);
...
// sử dụng goong Api để lấy setlocation
const getPlacesAutocomplete = async () => {
        let autoComplete = await MapAPi.getPlacesAutocomplete({
            search: encodeURIComponent(search),
        });
    };

return (
     <MapboxGL.MapView
     ... >
     {locations.map((item, index) => (
        <MapboxGL.PointAnnotation
            id=`pointID-${index}`
            key=`pointKey-${index}`
            coordinate={item.coord} // điểm hiển thị
            draggable={true}>
        </MapboxGL.PointAnnotation>
    ))}
     </MapboxGL.MapView>
)}
export default App;
```

constant.js

```Javascript

  export const SERVER = {
  API_key: ['API_key'],
  API_Url: ['https://url']
};

```

MapAPI.js

```Javascript
import * as APICONST from './constant';
...
getPlacesAutocomplete = body => {
    return authorizedRequest.get(
      API_LIST.PlacesAutocomplete + PREFIX + '&input=' + body.search,); // đường dẫn url
  };
```

_body.search: tham số truyền vào_

**_lưu ý:_**
_Nếu bạn muốn hiển thị title cho điểm bạn vừa đánh dấu bằng cách click double vào điểm hãy sử dụng_

**_<MapboxGL.Callout title={item.key} />_**

_Bạn có thể thay đổi ảnh mặc đinh của PointAnnotation bằng hình ảnh của bạn vào trong :_

**_MapboxGL.PointAnnotation_**

**Dẫn đường**

1. Khởi tạo bản đồ (Hiển thị bản đồ)
2. Lấy dữ liệu từ goongApi
3. Gán dẫn đường vào bản đồ bằng cách sử dụng MapboxGL.ShapeSource và MapboxGL.LineLayer
   ví dụ :

```Javascript
import MapboxGL from "@rnmapbox/maps";
...
const App = () => {
    const [locations, setLocations] = useState([]);
    const [route, setRoute] = useState([]);
    ...
const getDirections = async () => {
    /* sử dụng goong Api để lấy dữ liẹu*/

    const direction = await MapAPi.getDirections({
        vehicle: vehicle,
        origin: locations[0].coord,
        destination: originText,
    });

    ...
    const colors = ['#00b0ff', '#bbbdbf'];
    const featureCollection = {
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: coordinates // mảng các điểm bao gôm lng và lat
                },
                pain: color,
            }
        ]
    };
    setRoute(featureCollections)

    const geoJsonData = {
        type: 'FeatureCollection',
        features: [],
    };
    route.forEach((item) => {
        geoJsonData.features.push(...item.features);
    });
}
return (
     <MapboxGL.MapView
     ... >
     ...
     {geoJsonData.features.map((item, index) => {
        const lineColor = `${item.pain}`
        const layerId = `linelayer-${index}`
        const lineID = `line-${index}`
        const markerID = `marker-${index}`
        return (
            <View>
                <MapboxGL.ShapeSource
                    id={lineID}
                    shape={item}
                    clusterRadius={8}
                    cluster={true}
                >
                    <MapboxGL.LineLayer
                        id={layerId}
                        key={layerId}
                        style={{
                            lineColor: lineColor,
                            lineWidth: 7
                        }}
                    />

                </MapboxGL.ShapeSource>
            </View>
        );
    })}
     </MapboxGL.MapView>
    /* thêm ô tìm kiếm và gọi hàm getDirections */
)}
export default App;
```

MapAPI.js

```Javascript

import * as APICONST from './constant';
...

  getDirections = body => {
    return authorizedRequest.get(
      URL + API_LIST.Directions + body.vehicle + '&api_key=' + PREFIX + '&origin=' +
       encodeURIComponent(body.origin[1] + ',' + body.origin[0]) + '&destination=' +
       encodeURIComponent(body.destination[1] + ',' + body.destination[0]) + '&lternatives=true'
      ,
    );
  };

```

### Sử dụng Goong API

**Load Map**

```html
https://tiles.goong.io/assets/goong_map_web.json?api_key={{goong_maptiles_key}}
```

**Autocomplete**

Sử dụng Api do Goong cung cấp với đường dẫn Api:

```html
{{goong_api_url}}/Place/AutoComplete?api_key={{goong_api_key}}&input=
```

_lưu ý :_

- goong_api_url:dường dẫn url
- goong*api_key:mã Api*
- input: nội dung khi nhập vào search\_

**Directions**

```html
{{goong_api_url}}/Direction?vehicle=car&api_key={{goong_api_key}}&origin=21.01503750200004%2C105.79491335100005&destination=21.017693335000047%2C105.79068762200006&alternatives=true
```

**_lưu ý:_**

- vehicle sử dụng bao gồm 'car', 'bike', 'truck', 'taxi', 'hd';
- origin: điểm bắt đầu
- destination:điểm kết thúc

**Geocoding**

```html
{{goong_api_url}}/Geocode?address=143%20Trung%20K%C3%ADnh%2C%20Y%C3%AAn%20H%C3%B2a%2C%20C%E1%BA%A7u%20Gi%E1%BA%A5y%2C%20H%C3%A0%20N%E1%BB%99i&api_key={{goong_api_key}}
```

**_lưu ý:_**

- address: địa chỉ tìm kiếm(cần được chuyển đổi về **_encodeURIComponent_** )

### Tài Liệu

Hãy truy cập [ví dụ](https://git.goong.io/outsource/goong-sample/tree/master/goong-sample-reactnative)

<!-- </div> -->
