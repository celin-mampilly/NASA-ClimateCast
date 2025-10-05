import React, { useState, useEffect } from 'react';
import ClimateChart from './ClimateChart';
import MapComponent from './MapComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

// Comprehensive, built-in data for all Indian States, UTs, and major cities
const indianLocations = {
    "Andhra Pradesh": { 
        "Visakhapatnam": [17.6868, 83.2185], 
        "Vijayawada": [16.5062, 80.6480], 
        "Anantapur": [14.6819, 77.6006],
        "Chittoor": [13.2000, 79.1167],
        "East Godavari": [16.9806, 82.2355],
        "Guntur": [16.3000, 80.4500],
        "Krishna": [16.1500, 80.9000],
        "Kurnool": [15.8281, 78.0375],
        "Nellore": [14.4447, 79.9864],
        "Prakasam": [15.5800, 80.2500],
        "Srikakulam": [18.3000, 84.0000],
        "Tirupati": [13.6288, 79.4192],
        "Vizianagaram": [18.1167, 83.4167],
        "West Godavari": [16.7115, 81.1098],
        "YSR Kadapa": [14.4667, 78.8256]
    },
    "Arunachal Pradesh": { 
        "Itanagar": [27.0922, 93.6053], 
        "Tawang": [27.5859, 91.8596],
        "Ziro": [27.5997, 93.8471],
        "Bomdila": [27.2500, 92.4000],
        "Anjaw": [28.0000, 96.5000],
        "Changlang": [27.3333, 96.0000],
        "Lower Subansiri": [27.5900, 93.8400],
        "Pasighat": [28.0667, 95.3333]
    },
    "Assam": { 
        "Guwahati": [26.1445, 91.7362], 
        "Dibrugarh": [27.4728, 94.9120],
        "Silchar": [24.8333, 92.7833],
        "Jorhat": [26.7587, 94.2045],
        "Tezpur": [26.6562, 92.7839],
        "Nagaon": [26.3400, 92.6800],
        "Bongaigaon": [26.4600, 90.5500],
        "Goalpara": [26.1500, 90.6200]
    },
    "Bihar": { 
        "Patna": [25.5941, 85.1376], 
        "Gaya": [24.7969, 84.9996],
        "Muzaffarpur": [26.1200, 85.3900],
        "Bhagalpur": [25.2427, 86.9859],
        "Darbhanga": [26.1756, 85.9048],
        "Purnia": [25.7800, 87.4800],
        "Bettiah": [26.8000, 83.9000]
    },
    "Chhattisgarh": { 
        "Raipur": [21.2514, 81.6296], 
        "Bhilai": [21.2124, 81.3477],
        "Bilaspur": [22.0917, 82.1539],
        "Durg": [21.1900, 81.2800],
        "Ambikapur": [23.1200, 83.2000],
        "Jagdalpur": [19.0700, 82.0300]
    },
    "Goa": { 
        "Panaji": [15.4909, 73.8278], 
        "Vasco da Gama": [15.3993, 73.8140],
        "Margao": [15.2500, 73.9600],
        "Ponda": [15.4000, 74.0100]
    },
    "Gujarat": { 
        "Ahmedabad": [23.0225, 72.5714], 
        "Surat": [21.1702, 72.8311], 
        "Vadodara": [22.3072, 73.1812],
        "Rajkot": [22.3019, 70.8021],
        "Gandhinagar": [23.2156, 72.6369],
        "Jamnagar": [22.4700, 70.0700],
        "Bhavnagar": [21.7600, 72.1500]
    },
    "Haryana": { 
        "Gurugram": [28.4595, 77.0266], 
        "Faridabad": [28.4089, 77.3178],
        "Panipat": [29.3900, 76.9600],
        "Rohtak": [28.8900, 76.6100],
        "Hisar": [29.1550, 75.7230],
        "Ambala": [30.3800, 76.7700]
    },
    "Himachal Pradesh": { 
        "Shimla": [31.1048, 77.1734], 
        "Manali": [32.2396, 77.1887],
        "Dharamshala": [32.2195, 76.3235],
        "Kullu": [31.9567, 77.1066],
        "Mandi": [31.7100, 76.9200]
    },
    "Jharkhand": { 
        "Ranchi": [23.3441, 85.3096], 
        "Jamshedpur": [22.8040, 86.2029],
        "Dhanbad": [23.7956, 86.4304],
        "Bokaro": [23.6698, 85.9525],
        "Hazaribagh": [24.0000, 85.3500]
    },
    "Karnataka": { 
        "Bengaluru": [12.9716, 77.5946], 
        "Mysuru": [12.2958, 76.6394], 
        "Hubballi": [15.3647, 75.1240],
        "Mangaluru": [12.9141, 74.8559],
        "Belagavi": [15.8497, 74.4977],
        "Kalaburagi": [17.3297, 76.8340],
        "Davangere": [14.4667, 75.9167]
    },
    "Kerala": { 
        "Kochi": [9.9312, 76.2673], 
        "Thiruvananthapuram": [8.5241, 76.9366], 
        "Kozhikode": [11.2588, 75.7804],
        "Thrissur": [10.5276, 76.2144],
        "Kannur": [11.8745, 75.3704],
        "Alappuzha": [9.4981, 76.3388],
        "Kottayam": [9.5916, 76.5222],
        "Malappuram": [11.0569, 76.0718],
        "Palakkad": [10.7867, 76.6548],
        "Kasaragod": [12.5000, 74.9800]
    },
    "Madhya Pradesh": { 
        "Bhopal": [23.2599, 77.4126], 
        "Indore": [22.7196, 75.8577], 
        "Jabalpur": [23.1815, 79.9864],
        "Gwalior": [26.2154, 78.1754],
        "Ujjain": [23.1795, 75.7853],
        "Sagar": [23.8300, 78.7300]
    },
    "Maharashtra": { 
        "Mumbai": [19.0760, 72.8777], 
        "Pune": [18.5204, 73.8567], 
        "Nagpur": [21.1458, 79.0882],
        "Nashik": [19.9975, 73.7898],
        "Aurangabad": [19.8762, 75.3433],
        "Thane": [19.2183, 72.9781],
        "Kolhapur": [16.7050, 74.2433],
        "Solapur": [17.6599, 75.9064]
    },
    "Manipur": { 
        "Imphal": [24.8170, 93.9368],
        "Churachandpur": [24.3333, 93.7500],
        "Thoubal": [24.6300, 93.9000]
    },
    "Meghalaya": { 
        "Shillong": [25.5788, 91.8933],
        "Tura": [25.5144, 90.2185],
        "Jowai": [25.4833, 92.1833]
    },
    "Mizoram": { 
        "Aizawl": [23.7271, 92.7176],
        "Lunglei": [22.8833, 92.7333],
        "Champhai": [23.4500, 93.3100]
    },
    "Nagaland": { 
        "Kohima": [25.6751, 94.1026], 
        "Dimapur": [25.9063, 93.7328],
        "Mokokchung": [26.3333, 94.5167],
        "Tuensang": [26.2700, 94.8300]
    },
    "Odisha": { 
        "Bhubaneswar": [20.2961, 85.8245], 
        "Cuttack": [20.4625, 85.8828],
        "Rourkela": [22.2583, 84.8433],
        "Sambalpur": [21.4667, 83.9833],
        "Puri": [19.8135, 85.8312]
    },
    "Punjab": { 
        "Ludhiana": [30.9010, 75.8573], 
        "Amritsar": [31.6340, 74.8723],
        "Jalandhar": [31.3260, 75.5762],
        "Patiala": [30.3398, 76.3869],
        "Bhatinda": [30.2000, 75.0000]
    },
    "Rajasthan": { 
        "Jaipur": [26.9124, 75.7873], 
        "Jodhpur": [26.2389, 73.0243], 
        "Udaipur": [24.5854, 73.7125],
        "Kota": [25.2138, 75.8648],
        "Ajmer": [26.4491, 74.6399],
        "Bikaner": [28.0182, 73.3119]
    },
    "Sikkim": { 
        "Gangtok": [27.3389, 88.6065],
        "Geyzing": [27.3375, 88.2618],
        "Mangan": [27.5250, 88.5333]
    },
    "Tamil Nadu": { 
        "Chennai": [13.0827, 80.2707], 
        "Coimbatore": [11.0168, 76.9558], 
        "Madurai": [9.9252, 78.1198],
        "Tiruchirappalli": [10.8050, 78.6856],
        "Salem": [11.6643, 78.1460],
        "Tirunelveli": [8.7139, 77.7567]
    },
    "Telangana": { 
        "Hyderabad": [17.3850, 78.4867], 
        "Warangal": [17.9689, 79.5941],
        "Karimnagar": [18.4343, 79.1309],
        "Nizamabad": [18.6700, 78.1600]
    },
    "Tripura": { 
        "Agartala": [23.8315, 91.2868],
        "Dharmanagar": [24.3750, 92.1667],
        "Udaipur": [23.5359, 91.4883]
    },
    "Uttar Pradesh": { 
        "Lucknow": [26.8467, 80.9462], 
        "Kanpur": [26.4499, 80.3319], 
        "Varanasi": [25.3176, 82.9739],
        "Agra": [27.1767, 78.0081],
        "Meerut": [28.9845, 77.7064],
        "Prayagraj": [25.4358, 81.8463]
    },
    "Uttarakhand": { 
        "Dehradun": [30.3165, 78.0322], 
        "Nainital": [29.3803, 79.4636],
        "Haridwar": [29.9457, 78.1642],
        "Rishikesh": [30.0869, 78.2676]
    },
    "West Bengal": { 
        "Kolkata": [22.5726, 88.3639], 
        "Darjeeling": [27.0360, 88.2627],
        "Asansol": [23.6850, 86.9547],
        "Siliguri": [26.7271, 88.3953],
        "Durgapur": [23.5200, 87.3100]
    },
    "Andaman and Nicobar Islands": { "Port Blair": [11.6234, 92.7265] },
    "Chandigarh": { "Chandigarh": [30.7333, 76.7794] },
    "Dadra and Nagar Haveli and Daman and Diu": { "Daman": [20.4283, 72.8397], "Silvassa": [20.2780, 73.0142] },
    "Delhi": { "New Delhi": [28.6139, 77.2090], "Gurgaon": [28.4595, 77.0266] },
    "Jammu and Kashmir": { 
        "Srinagar": [34.0837, 74.7973], 
        "Jammu": [32.7266, 74.8570],
        "Anantnag": [33.7299, 75.1471],
        "Rajouri": [33.3768, 74.3040]
    },
    "Ladakh": { "Leh": [34.1526, 77.5771], "Kargil": [34.5667, 76.1333] },
    "Lakshadweep": { "Kavaratti": [10.5667, 72.6417], "Andrott": [10.8266, 73.6800] },
    "Puducherry": { "Puducherry": [11.9416, 79.8083], "Karaikal": [10.9167, 79.8333], "Mahe": [11.7000, 75.5333] }
};

const getDayOfYear = (date) => {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
};

function App() {
  const [selectedState, setSelectedState] = useState("Kerala");
  const [selectedCity, setSelectedCity] = useState("Kochi");
  const [location, setLocation] = useState(indianLocations["Kerala"]["Kochi"]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const newLocation = indianLocations[selectedState][selectedCity];
    setLocation(newLocation);
  }, [selectedState, selectedCity]);
  
  const handleGenerateReport = () => {
    setLoading(true);
    setReportData(null);
    setError('');
    const dayOfYear = getDayOfYear(selectedDate);
    
    fetch('http://127.0.0.1:5000/api/get-weather?lat=${location[0]}&lon=${location[1]}&day=${dayOfYear}')
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => {
        // Add dummy data for new features for demonstration
        const enhancedData = {
          ...data,
          wind_speed: (Math.random() * 20 + 5).toFixed(1),
          air_quality: Math.floor(Math.random() * 100 + 20),
          humidity: Math.floor(Math.random() * 50 + 40),
          uv_index: Math.floor(Math.random() * 10 + 1),
        };
        setReportData(enhancedData); 
        setLoading(false); 
      })
      .catch(err => { console.error("Error fetching data:", err); setError('Failed to fetch data from backend.'); setLoading(false); });
  };

  const states = Object.keys(indianLocations);
  const cities = Object.keys(indianLocations[selectedState]);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-content">
            <h1>ClimateCast</h1>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem' }}>Select a location to see its historical climate data.</p>
            
            
            <div className="form-group">
                <label>Select State</label>
                <select className="location-select" value={selectedState} onChange={(e) => { const newState = e.target.value; setSelectedState(newState); setSelectedCity(Object.keys(indianLocations[newState])[0]); }}>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label>Select City</label>
                 <select className="location-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
             <div className="form-group">
                <label>Select Date</label>
                {/* The ineffective inline style has been removed for clarity */}
                <DatePicker 
                  selected={selectedDate} 
                  onChange={(date) => setSelectedDate(date)} 
                  dateFormat="MMMM d" 
                  className="date-picker"
                />
            </div>
        </div>
        <button className="generate-button" onClick={handleGenerateReport} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Climate Report'}
        </button>
      </div>

      <div className="main-content">
        <div className="map-display">
            <MapComponent location={location} />
        </div>
        {reportData && (
          <div className="dashboard-area">
            <h2>Climate Report Dashboard</h2>
            <div className="dashboard-grid">
              <div className="data-card"><h3>Average Temp</h3><p>{reportData.avg_temp}°C</p></div>
              <div className="data-card"><h3>Rain Chance</h3><p>{reportData.rain_chance}%</p></div>
              <div className="data-card"><h3>Wind Speed</h3><p>{reportData.wind_speed} km/h</p></div>
              <div className="data-card"><h3>Air Quality</h3><p>{reportData.air_quality} AQI</p></div>
              <div className="data-card"><h3>Humidity</h3><p>{reportData.humidity}%</p></div>
              <div className="data-card"><h3>UV Index</h3><p>{reportData.uv_index}</p></div>
              <div className="chart-container"><ClimateChart chartData={reportData} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;