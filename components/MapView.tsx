'use client';

import { useEffect, useRef } from 'react';
import type { Destination } from '@/app/maps/page';

interface MapViewProps {
  destinations: Destination[];
  selected: Destination | null;
  route: number[];
  onSelect: (dest: Destination) => void;
}

const typeColors: Record<string, string> = {
  landmark: '#8b5cf6',
  heritage: '#f59e0b',
  nature: '#10b981',
};

export default function MapView({ destinations, selected, route, onSelect }: MapViewProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<number, any>>(new Map());
  const routeLayerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    // Dynamically import leaflet (client-only)
    import('leaflet').then(L => {
      // Fix default marker icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: [30, 15],
        zoom: 3,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add markers
      destinations.forEach(dest => {
        const color = typeColors[dest.type] ?? '#8b5cf6';

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              width:36px;height:36px;border-radius:50%;
              background:${color};
              border:3px solid white;
              box-shadow:0 2px 8px rgba(0,0,0,0.4);
              display:flex;align-items:center;justify-content:center;
              cursor:pointer;
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -38],
        });

        const marker = L.marker([dest.lat, dest.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:160px;font-family:sans-serif">
              <img src="${dest.img}" style="width:100%;height:90px;object-fit:cover;border-radius:8px;margin-bottom:8px"/>
              <strong style="font-size:14px">${dest.name}</strong><br/>
              <span style="color:#9ca3af;font-size:12px">${dest.city}, ${dest.country}</span><br/>
              <span style="color:#fbbf24;font-size:12px">★ ${dest.rating}</span>
            </div>
          `, { maxWidth: 200 });

        marker.on('click', () => onSelect(dest));
        markersRef.current.set(dest.id, marker);
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected destination
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.flyTo([selected.lat, selected.lng], 10, { duration: 1.2 });
    markersRef.current.get(selected.id)?.openPopup();
  }, [selected]);

  // Draw route polyline
  useEffect(() => {
    if (!mapRef.current) return;
    import('leaflet').then(L => {
      routeLayerRef.current?.remove();
      if (route.length < 2) return;

      const points = route
        .map(id => destinations.find(d => d.id === id))
        .filter(Boolean)
        .map(d => [d!.lat, d!.lng] as [number, number]);

      routeLayerRef.current = L.polyline(points, {
        color: '#ec4899',
        weight: 3,
        dashArray: '8 6',
        opacity: 0.8,
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [40, 40] });
    });
  }, [route, destinations]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={containerRef} className="flex-1 z-10" style={{ minHeight: 0 }} />
    </>
  );
}
