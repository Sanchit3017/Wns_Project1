// Bangalore Transport Zones (from WNS Policy)
export const BANGALORE_ZONES = {
  "East": {
    areas: [
      "Yelahanka", "Whitefield", "Hoskote", "Kadugodi", "Channasandra", 
      "TC Palya", "Kithaganur", "MS Palya", "Hennur Bagalur", 
      "K Channasandra", "Varthur", "Gunjur", "Chikka Bellandur"
    ],
    coverage: "IT corridor, tech parks",
    color: "#3b82f6"
  },
  "West": {
    areas: [
      "Kengeri", "Nagarbhavi", "Raja-Rajeshwari Nagar", "Bangalore University", 
      "Janapriya Township", "Jnanabharathi", "Malathalli", "Chandra Layout", 
      "Attiguppe", "RPC Layout", "Annapoorneshwari Nagar", "Kottigepalya", 
      "Kamakshipalya", "Sundkadakatte", "Kadabgere"
    ],
    coverage: "Residential areas, universities",
    color: "#10b981"
  },
  "North": {
    areas: [
      "Laggere", "Hesarghatta Main Road", "8th Mile Signal", "T. Dasarahalli", 
      "Abiigere", "Kammagonadahalli", "Mathikere", "Yeshwathpur"
    ],
    coverage: "Industrial areas, airport route",
    color: "#f59e0b"
  },
  "South": {
    areas: [
      "JP Nagar 9th Phase", "Electronic City", "Hulimavu", "Konanakunte", 
      "Uttarahalli", "Chikkakalasandra", "Ittamadu", "Girinagar", "Meenakshi Nagar"
    ],
    coverage: "IT hubs, Electronic City",
    color: "#ef4444"
  },
  "Central": {
    areas: [
      "Hebbagodi Police Station", "Central Jail", "Hosar Road", "Surjapur Road", 
      "Choodsandra Circle", "Kaikindrahalli", "Hosapalya"
    ],
    coverage: "City center, transport hubs",
    color: "#8b5cf6"
  },
  "Non_Hiring": {
    areas: ["Binny Pete", "Cotton Pete", "Chickpet"],
    coverage: "Restricted zones",
    color: "#6b7280"
  }
};

// WNS Vuram Office Location (Whitefield)
export const WNS_OFFICE = {
  name: "WNS Vuram Global Services",
  address: "Whitefield, Bangalore",
  coordinates: { lat: 12.9698, lng: 77.7500 },
  zone: "East",
  landmark: "ITPL Main Road"
};

// Transport Timings for Bangalore (from WNS Policy)
export const TRANSPORT_TIMINGS = {
  sociable_hours: {
    start: "06:30",
    end: "20:30",
    description: "All employees"
  },
  unsociable_hours: {
    start: "20:30",
    end: "06:30",
    description: "All employees"
  },
  eta_before_login: 15, // minutes
  eta_after_logout: 20, // minutes
};

// Travel Time Matrix (Distance-based from WNS Policy)
export const TRAVEL_TIME_MATRIX = {
  "0-10km": { time_range: "0-60 mins", base_time: 30 },
  "11-20km": { time_range: "60-90 mins", base_time: 75 },
  "21-30km": { time_range: "90-120 mins", base_time: 105 },
  "30km+": { time_range: "120-150 mins", base_time: 135 }
};

// Utility functions
export const getZoneForLocation = (location) => {
  const locationLower = location.toLowerCase();
  
  for (const [zoneName, zoneData] of Object.entries(BANGALORE_ZONES)) {
    if (zoneData.areas.some(area => 
      locationLower.includes(area.toLowerCase()) || 
      area.toLowerCase().includes(locationLower)
    )) {
      return zoneName;
    }
  }
  return 'Unknown';
};

export const getAllLocations = () => {
  return Object.values(BANGALORE_ZONES).flatMap(zone => zone.areas).sort();
};

export const getZoneColor = (zoneName) => {
  return BANGALORE_ZONES[zoneName]?.color || '#6b7280';
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;
  
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

export const estimateTravelTime = (distanceKm, trafficFactor = 1.0) => {
  let baseTime;
  let range;
  
  if (distanceKm <= 10) {
    baseTime = TRAVEL_TIME_MATRIX["0-10km"].base_time;
    range = TRAVEL_TIME_MATRIX["0-10km"].time_range;
  } else if (distanceKm <= 20) {
    baseTime = TRAVEL_TIME_MATRIX["11-20km"].base_time;
    range = TRAVEL_TIME_MATRIX["11-20km"].time_range;
  } else if (distanceKm <= 30) {
    baseTime = TRAVEL_TIME_MATRIX["21-30km"].base_time;
    range = TRAVEL_TIME_MATRIX["21-30km"].time_range;
  } else {
    baseTime = TRAVEL_TIME_MATRIX["30km+"].base_time;
    range = TRAVEL_TIME_MATRIX["30km+"].time_range;
  }
  
  return {
    estimated_time: Math.round(baseTime * trafficFactor),
    time_range: range,
    distance_km: distanceKm
  };
};

export const getTrafficFactor = (hour) => {
  // Peak hours have higher traffic
  if ((hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 20)) {
    return 1.5; // 50% more time during peak hours
  } else if ((hour >= 11 && hour <= 16) || (hour >= 21 && hour <= 23)) {
    return 1.2; // 20% more time during moderate traffic
  } else {
    return 1.0; // Normal traffic during off-peak hours
  }
};

export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }
};

export const isWithinOperatingHours = (time) => {
  const hour = new Date(time).getHours();
  const minute = new Date(time).getMinutes();
  const timeInMinutes = hour * 60 + minute;
  
  const sociableStart = 6 * 60 + 30; // 06:30
  const sociableEnd = 20 * 60 + 30;  // 20:30
  
  return timeInMinutes >= sociableStart && timeInMinutes <= sociableEnd;
};