import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Vite asset bundling for default Leaflet markers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom camp marker pin icon
const campIcon = L.divIcon({
  className: 'custom-camp-pin',
  html: `
    <div style="
      background-color: #0284C7;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <div style="transform: rotate(45deg); font-size: 13px; font-weight: bold;">🏕️</div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

export default function DashboardMap({ areas = [], camps = [] }) {
  // Center coordinates around Karachi / seed scenario
  const defaultCenter = [24.88, 67.05];
  const defaultZoom = 12;

  const getAreaColor = (area) => {
    if (area.assessment?.isDarkZone) {
      return { stroke: '#7C3AED', fill: '#8B5CF6', label: 'Dark Zone (Silent Risk)' }; // Purple
    }
    if ((area.hazardSeverity || 0) >= 0.7 || (area.actualReports || 0) > 6) {
      return { stroke: '#DC2626', fill: '#EF4444', label: 'High Risk' }; // Red
    }
    return { stroke: '#059669', fill: '#10B981', label: 'Monitored / Stable' }; // Green
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
      {/* Map Header & Legend */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] p-4 bg-slate-50/60">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">Disaster Sector & Camp Map</h3>
          <p className="text-[11px] text-slate-500">Live geographic distribution of impact zones and relief camps</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-600 border border-purple-800" />
            <span>Dark Zone (Purple)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 border border-rose-700" />
            <span>High Risk (Red)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border border-emerald-700" />
            <span>Stable (Green)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🏕️</span>
            <span>Relief Camp</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[440px] w-full z-10">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Area Circles (Green / Red / Purple) */}
          {areas.map((area) => {
            const colors = getAreaColor(area);
            const radius = 1800 + (area.population || 800) * 0.8;

            return (
              <Circle
                key={area.id}
                center={[area.lat, area.lng]}
                radius={radius}
                pathOptions={{
                  color: colors.stroke,
                  fillColor: colors.fill,
                  fillOpacity: 0.28,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 text-slate-900 font-sans">
                    <div className="flex items-center gap-1.5 mb-1">
                      <strong className="text-sm font-bold text-slate-950">{area.name}</strong>
                      <span className="rounded bg-slate-100 px-1 py-0.2 text-[10px] font-mono text-slate-600">
                        {area.id}
                      </span>
                    </div>
                    <div className="text-xs space-y-0.5 text-slate-600">
                      <div>Status: <span className="font-semibold" style={{ color: colors.stroke }}>{colors.label}</span></div>
                      <div>Population: <strong>{area.population}</strong></div>
                      <div>Reports: <strong>{area.actualReports}</strong> (Hazard: {area.hazardSeverity})</div>
                    </div>
                    <div className="mt-2.5 border-t border-slate-200 pt-2">
                      <Link
                        to={`/areas/${area.id}`}
                        className="inline-block w-full text-center rounded bg-sky-600 hover:bg-sky-500 px-2.5 py-1 text-xs font-bold text-white shadow-2xs transition-colors"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Circle>
            );
          })}

          {/* Camp Pins */}
          {camps.map((camp) => (
            <Marker
              key={camp.id}
              position={[camp.lat, camp.lng]}
              icon={campIcon}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans">
                  <div className="font-bold text-sm text-slate-950">{camp.name}</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Occupancy: <strong>{camp.occupancy} / {camp.capacity}</strong>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Water: <strong>{(camp.stock || {}).water || 0}</strong> | Food: <strong>{(camp.stock || {}).food || 0}</strong>
                  </div>
                  <div className="mt-2 border-t border-slate-200 pt-1.5">
                    <Link
                      to="/resources"
                      className="text-xs font-semibold text-sky-700 hover:underline"
                    >
                      View camp stock →
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
