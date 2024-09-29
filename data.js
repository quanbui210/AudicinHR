const heartRateData = [
  { "unit": "count/min", "sdate": 1695542400000, "value": 72 },
  { "unit": "count/min", "sdate": 1695542700000, "value": 68 },
  { "unit": "count/min", "sdate": 1695543000000, "value": 65 },
  { "unit": "count/min", "sdate": 1695543300000, "value": 95 },
  { "unit": "count/min", "sdate": 1695543600000, "value": 110 },
  { "unit": "count/min", "sdate": 1695543900000, "value": 125 }
];
const tracks = [
  { id: 1, track_name: "Calm Waters", binaural_beat: "Alpha", frequency: 10, tone: "Relaxing", purpose: "Relax" },
  { id: 2, track_name: "Deep Focus", binaural_beat: "Beta", frequency: 20, tone: "Intense", purpose: "Focus" },
  { id: 3, track_name: "Inspiring Heights", binaural_beat: "Gamma", frequency: 40, tone: "Inspiring", purpose: "Creativity" },
  { id: 4, track_name: "Tranquil Waves", binaural_beat: "Theta", frequency: 6, tone: "Calming", purpose: "Deep Relaxation" },
  { id: 5, track_name: "Energetic Pulse", binaural_beat: "Beta", frequency: 18, tone: "Uplifting", purpose: "Work" },
  { id: 6, track_name: "Heightened Awareness", binaural_beat: "Gamma", frequency: 45, tone: "Intense", purpose: "Focus" }
];

module.exports = { heartRateData, tracks, heartRateMapping };