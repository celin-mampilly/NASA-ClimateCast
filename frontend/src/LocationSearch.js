import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// FIX: Importing the local copy of the correct CSS file
import './style.css';

const LocationSearch = ({ onLocationChange }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { x, y, label } = result.location;
      onLocationChange(y, x, label);
    });

    return () => map.removeControl(searchControl);
  }, [map, onLocationChange]);

  return null;
};

export default LocationSearch;