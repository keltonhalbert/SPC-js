
tor5 = [];
tor10 = [];
tor15 = [];
tor30 = [];
tor45 = [];
tor60 = [];
torSig = [];

hail5 = [];
hail15 = [];
hail30 = [];
hail45 = [];
hail60 = [];
hailSig = [];

wind5 = [];
wind15 = [];
wind30 = [];
wind45 = [];
wind60 = [];
windSig = [];



// create an object to keep track
// of the number of risk areas
// for a given threat percentage

// NOTE:: DOES NOT CORRESPOND TO
// TOTAL NUMBER OF AREAS. THESE
// VALUES WILL INCREASE MONOTONICALLY
// REGARDLESS OF EDITS TO PRESERVE UNIQUE AREAS
var trackedAreas = {

    // tornado percentages
    'tor-2%': 0,
    'tor-5%': 0,
    'tor-10%': 0,
    'tor-15%': 0,
    'tor-30%': 0,
    'tor-45%': 0,
    'tor-60%': 0,
    'tor-sig': 0,

    // hail percentages
    'hail-5%': 0,
    'hail-15%': 0,
    'hail-30%': 0,
    'hail-45%': 0,
    'hail-60%': 0,
    'hail-sig': 0,

    // wind percentages
    'wind-5%': 0,
    'wind-15%': 0,
    'wind-30%': 0,
    'wind-45%': 0,
    'wind-60%': 0,
    'wind-sig': 0,

};



for (idx = 0; idx < 501; idx += 1) {

    tor5[idx] = "tor-5%" + idx;
    tor10[idx] = "tor-10%" + idx;
    tor15[idx] = "tor-15%" + idx;
    tor30[idx] = "tor-30%" + idx;
    tor45[idx] = "tor-45%" + idx;
    tor60[idx] = "tor-60%" + idx;
    torSig[idx] = "tor-sig" + idx;

    hail5[idx] = "hail-5%" + idx;
    hail15[idx] = "hail-15%" + idx;
    hail30[idx] = "hail-30%" + idx;
    hail45[idx] = "hail-45%" + idx;
    hail60[idx] = "hail-60%" + idx;
    hailSig[idx] = "hail-sig" + idx;

    wind5[idx] = "wind-5%" + idx;
    wind15[idx] = "wind-15%" + idx;
    wind30[idx] = "wind-30%" + idx;
    wind45[idx] = "wind-45%" + idx;
    wind60[idx] = "wind-60%" + idx;
    windSig[idx] = "wind-sig" + idx;

};

createNewArea = function(activePolyType, activePolyPercent) {
    // get the random ID of the selected risk area
    selectedAreaId = draw.getSelectedIds();

    if (selectedAreaId.length == 0 ) { return };

    // create a polygon ID based on threat type
    // and risk percentage - combine with random int
    // ID to preserve separate polygons of same 
    // risk
    activePolyId = activePolyType + activePolyPercent;
    trackedAreas[activePolyId] += 1; 
    activePolyCount = trackedAreas[activePolyId];
    activePolyId += activePolyCount;
    
    // get all drawn areas
    allAreas = draw.getAll();

    // get the features from getAll
    features = allAreas['features'];
    
    // find the feature matching the selected ID
    // and replace its ID with the active polygon ID
    for (idx = 0; idx < features.length; idx += 1) {
        if (features[idx]['id'] == selectedAreaId) {
            features[idx]['id'] = activePolyId;
            features[idx]['percent'] = activePolyPercent;
        }
    }
    draw.set(allAreas);
};  


var outlookStyle =  [
  {
    'id': 'gl-draw-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ad7c2e',
      'fill-outline-color': '#ad7c2e',
      'fill-opacity': 0.15
    }
  },
  {
    'id': 'tor-5%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor5],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ad7c2e',
      'fill-outline-color': '#ad7c2e',
      'fill-opacity': 0.15
    }
  },
  {
    'id': 'tor-10%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor10],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#fffa00',
      'fill-outline-color': '#faff00',
      'fill-opacity': 0.15
    }
  },
  {
    'id': 'tor-15%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor15],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ff0000',
      'fill-outline-color': '#ff0000',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'tor-30%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor30],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ffb5fd',
      'fill-outline-color': '#ffb5fd',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'tor-45%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor45],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#d000ff',
      'fill-outline-color': '#d000ff',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'tor-60%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor60],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#042fdd',
      'fill-outline-color': '#042fdd',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'tor-sig-risk-polygon-fill-inactive',
    'sprite': 'mapbox://sprites/mapbox/bright-v8',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...torSig],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#000000',
      'fill-outline-color': '#000000',
      'fill-pattern': 'dot-11',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'hail-5%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail5],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ad7c2e',
      'fill-outline-color': '#ad7c2e',
      'fill-opacity': 0.15
    }
  },
  {
    'id': 'hail-15%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail15],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#fffa00',
      'fill-outline-color': '#fffa00',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'hail-30%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail30],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ff0000',
      'fill-outline-color': '#ff0000',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'hail-45%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail45],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ffb5fd',
      'fill-outline-color': '#ffb5fd',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'hail-60%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail60],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#d000ff',
      'fill-outline-color': '#d000ff',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'hail-sig-risk-polygon-fill-inactive',
    'sprite': 'mapbox://sprites/mapbox/bright-v8',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hailSig],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#000000',
      'fill-outline-color': '#000000',
      'fill-pattern': 'dot-11',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'wind-5%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind5],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ad7c2e',
      'fill-outline-color': '#ad7c2e',
      'fill-opacity': 0.15
    }
  },
  {
    'id': 'wind-15%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind15],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#fffa00',
      'fill-outline-color': '#fffa00',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'wind-30%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind30],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ff0000',
      'fill-outline-color': '#ff0000',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'wind-45%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind45],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#ffb5fd',
      'fill-outline-color': '#ffb5fd',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'wind-60%-risk-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind60],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#d000ff',
      'fill-outline-color': '#d000ff',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'wind-sig-risk-polygon-fill-inactive',
    'sprite': 'mapbox://sprites/mapbox/bright-v8',
    'type': 'fill',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...windSig],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'fill-color': '#000000',
      'fill-outline-color': '#000000',
      'fill-pattern': 'dot-11',
      'fill-opacity': 0.25
    }
  },
  {
    'id': 'gl-draw-polygon-fill-active',
    'type': 'fill',
    'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    'paint': {
      'fill-color': '#fbb03b',
      'fill-outline-color': '#fbb03b',
      'fill-opacity': 0.1
    }
  },
  {
    'id': 'gl-draw-polygon-midpoint',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'midpoint']],
    'paint': {
      'circle-radius': 3,
      'circle-color': '#fbb03b'
    }
  },
  {
    'id': 'tor-5%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor5],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ad7c2e',
      'line-width': 2
    }
  },
  {
    'id': 'tor-10%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor10],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#fffa00',
      'line-width': 2
    }
  },
  {
    'id': 'tor-15%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor15],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 2
    }
  },
  {
    'id': 'tor-30%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor30],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ffb5fd',
      'line-width': 2
    }
  },
  {
    'id': 'tor-45%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor45],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#d000ff',
      'line-width': 2
    }
  },
  {
    'id': 'tor-60%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...tor60],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#042fdd',
      'line-width': 2
    }
  },
  {
    'id': 'tor-sig-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...torSig],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#000000',
      'line-width': 2
    }
  },
  {
    'id': 'hail-5%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail5],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ad7c2e',
      'line-width': 2
    }
  },
  {
    'id': 'hail-15%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail15],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#fffa00',
      'line-width': 2
    }
  },
  {
    'id': 'hail-30%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail30],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 2
    }
  },
  {
    'id': 'hail-45%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail45],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ffb5fd',
      'line-width': 2
    }
  },
  {
    'id': 'hail-60%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hail60],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#d000ff',
      'line-width': 2
    }
  },
  {
    'id': 'hail-sig-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...hailSig],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#000000',
      'line-width': 2
    }
  },
  {
    'id': 'wind-5%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind5],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ad7c2e',
      'line-width': 2
    }
  },
  {
    'id': 'wind-15%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind15],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#fffa00',
      'line-width': 2
    }
  },
  {
    'id': 'wind-30%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind30],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 2
    }
  },
  {
    'id': 'wind-45%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind45],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ffb5fd',
      'line-width': 2
    }
  },
  {
    'id': 'wind-60%-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...wind60],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#d000ff',
      'line-width': 2
    }
  },
  {
    'id': 'wind-sig-risk-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['in', 'id', ...windSig],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#000000',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-active',
    'type': 'line',
    'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#fbb03b',
      'line-dasharray': [0.2, 2],
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-line-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString'],
      ['!=', 'mode', 'static']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#3bb2d0',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-line-active',
    'type': 'line',
    'filter': ['all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#fbb03b',
      'line-dasharray': [0.2, 2],
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#fff'
    }
  },
  {
    'id': 'gl-draw-polygon-and-line-vertex-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 3,
      'circle-color': '#fbb03b'
    }
  },
  {
    'id': 'gl-draw-point-point-stroke-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 5,
      'circle-opacity': 1,
      'circle-color': '#fff'
    }
  },
  {
    'id': 'gl-draw-point-inactive',
    'type': 'circle',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static']
    ],
    'paint': {
      'circle-radius': 3,
      'circle-color': '#3bb2d0'
    }
  },
  {
    'id': 'gl-draw-point-stroke-active',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['==', 'active', 'true'],
      ['!=', 'meta', 'midpoint']
    ],
    'paint': {
      'circle-radius': 7,
      'circle-color': '#fff'
    }
  },
  {
    'id': 'gl-draw-point-active',
    'type': 'circle',
    'filter': ['all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#fbb03b'
    }
  },
  {
    'id': 'gl-draw-polygon-fill-static',
    'type': 'fill',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    'paint': {
      'fill-color': '#404040',
      'fill-outline-color': '#404040',
      'fill-opacity': 0.1
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-static',
    'type': 'line',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#404040',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-line-static',
    'type': 'line',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#404040',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-point-static',
    'type': 'circle',
    'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#404040'
    }
  }
];
