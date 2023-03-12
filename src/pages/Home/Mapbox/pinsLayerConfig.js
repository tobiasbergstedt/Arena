export const pinsLayerConfig = {
  id: 'places-markers',
  type: 'symbol',
  source: 'activePlaces',
  minzoom: 7,
  generateId: true,
  layout: {
    'icon-image': 'default-marker',
    'icon-size': 0.7,
    'icon-anchor': 'bottom',
    'icon-offset': [0, 10],
    'icon-allow-overlap': true,
  },
  paint: {
    'icon-opacity': {
      default: 0,
      stops: [
        [9, 0],
        [10, 1],
      ],
    },
  },
};
