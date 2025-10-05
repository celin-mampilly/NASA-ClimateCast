import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons not showing in Webpack/React environments
delete L.Icon.Default.prototype._getIconUrl;

// Custom red icon definition
const redIcon = new L.Icon({
  iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// MapComponent receives the current location as [latitude, longitude]
const MapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const isDragging = useRef(false); // New ref to prevent prop fight

  // Handler for drag end event
  const handleDragEnd = (e) => {
    isDragging.current = false;
    const newLatLng = e.target.getLatLng();
    // *** IMPORTANT: The new coordinates are logged here. 
    // *** You need to pass these back to App.js to update the dashboard.
    console.log(`NEW MARKER LOCATION: [${newLatLng.lat.toFixed(4)}, ${newLatLng.lng.toFixed(4)}]`);
  };
  
  // Effect for initial map setup
  useEffect(() => {
    // Check if the map container is available
    if (mapRef.current === null) {
      // 1. Initialize the map
      const map = L.map('map-container', {
        center: location,
        zoom: 10, // Good zoom level for a city
        minZoom: 2,
        maxZoom: 18,
      });

      // 2. Add the tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | NASA Earthdata',
      }).addTo(map);
      
      const marker = L.marker(location, { icon: redIcon, draggable: true }); // Enable Dragging
      marker.addTo(map);
      
      // Add event listeners for drag
      marker.on('dragstart', () => { isDragging.current = true; });
      marker.on('dragend', handleDragEnd);

      mapRef.current = map;
      markerRef.current = marker;
    }
    
    // Cleanup function: destroys the map instance on unmount
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []); // Run only once on mount

  // Effect for updating map and marker location when props change (from dropdowns)
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    // Only update if the user is NOT dragging it manually
    if (map && marker && location && location.length === 2 && !isDragging.current) {
      // Pan the map smoothly to the new location
      map.flyTo(location, map.getZoom());
      
      // Update the marker position
      marker.setLatLng(location);
    }
  }, [location]); // Rerun when 'location' prop changes

  return (
    <div 
      id="map-container" 
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
        {/* Leaflet map will render inside this div */}
    </div>
  );
};

export default MapComponent;
