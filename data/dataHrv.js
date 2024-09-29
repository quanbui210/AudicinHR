const tracks = [
    { id: 1, track_name: "Calm Waters", binaural_beat: "Alpha", frequency: 10, tone: "Relaxing", purpose: "Relax" },
    { id: 2, track_name: "Deep Focus", binaural_beat: "Beta", frequency: 20, tone: "Intense", purpose: "Focus" },
    { id: 3, track_name: "Inspiring Heights", binaural_beat: "Gamma", frequency: 40, tone: "Inspiring", purpose: "Creativity" },
    { id: 4, track_name: "Tranquil Waves", binaural_beat: "Theta", frequency: 6, tone: "Calming", purpose: "Deep Relaxation" },
    { id: 5, track_name: "Energetic Pulse", binaural_beat: "Beta", frequency: 18, tone: "Uplifting", purpose: "Work" },
    { id: 6, track_name: "Heightened Awareness", binaural_beat: "Gamma", frequency: 45, tone: "Intense", purpose: "Focus" },
    { id: 7, track_name: "Peaceful Mind", binaural_beat: "Theta", frequency: 7, tone: "Soothing", purpose: "Sleep" },
    { id: 8, track_name: "Morning Motivation", binaural_beat: "Beta", frequency: 18, tone: "Energizing", purpose: "Work" },
    { id: 9, track_name: "Creative Burst", binaural_beat: "Gamma", frequency: 42, tone: "Inspiring", purpose: "Creativity" },
    { id: 10, track_name: "Meditative Bliss", binaural_beat: "Theta", frequency: 5, tone: "Calming", purpose: "Meditation" },
    { id: 11, track_name: "Focused Flow", binaural_beat: "Beta", frequency: 22, tone: "Intense", purpose: "Focus" },
    { id: 12, track_name: "Night Serenity", binaural_beat: "Delta", frequency: 2, tone: "Tranquil", purpose: "Sleep" },
    { id: 13, track_name: "Creative Mind", binaural_beat: "Gamma", frequency: 38, tone: "Uplifting", purpose: "Creativity" },
    { id: 14, track_name: "Mindful Moments", binaural_beat: "Alpha", frequency: 12, tone: "Relaxing", purpose: "Relax" },
    { id: 15, track_name: "Deep Sleep", binaural_beat: "Delta", frequency: 1, tone: "Serene", purpose: "Sleep" },
    { id: 16, track_name: "Productive Vibes", binaural_beat: "Beta", frequency: 25, tone: "Intense", purpose: "Work" },
    { id: 17, track_name: "Chill Mode", binaural_beat: "Alpha", frequency: 9, tone: "Relaxing", purpose: "Relax" },
    { id: 18, track_name: "Focused Drive", binaural_beat: "Beta", frequency: 24, tone: "Energizing", purpose: "Focus" },
    { id: 19, track_name: "Serene Spaces", binaural_beat: "Theta", frequency: 6, tone: "Calming", purpose: "Meditation" },
    { id: 20, track_name: "Morning Energy", binaural_beat: "Beta", frequency: 18, tone: "Uplifting", purpose: "Work" },
];
  

const heartRateData = [
    { "unit": "count/min", "sdate": 1695542400000, "value": 72, "hrv": 50 },
    { "unit": "count/min", "sdate": 1695542700000, "value": 68, "hrv": 55 },
    { "unit": "count/min", "sdate": 1695543000000, "value": 65, "hrv": 60 },
    { "unit": "count/min", "sdate": 1695543300000, "value": 95, "hrv": 35 },
    { "unit": "count/min", "sdate": 1695543600000, "value": 110, "hrv": 25 },
    { "unit": "count/min", "sdate": 1695543900000, "value": 125, "hrv": 18 },
    { "unit": "count/min", "sdate": 1695544200000, "value": 80, "hrv": 45 },
    { "unit": "count/min", "sdate": 1695544500000, "value": 85, "hrv": 40 },
    { "unit": "count/min", "sdate": 1695544800000, "value": 90, "hrv": 38 },
    { "unit": "count/min", "sdate": 1695545100000, "value": 98, "hrv": 30 },
    { "unit": "count/min", "sdate": 1695545400000, "value": 102, "hrv": 28 },
    { "unit": "count/min", "sdate": 1695545700000, "value": 120, "hrv": 22 },
    { "unit": "count/min", "sdate": 1695546000000, "value": 55, "hrv": 65 },
    { "unit": "count/min", "sdate": 1695546300000, "value": 60, "hrv": 62 },
    { "unit": "count/min", "sdate": 1695546600000, "value": 58, "hrv": 63 },
    { "unit": "count/min", "sdate": 1695546900000, "value": 78, "hrv": 48 },
    { "unit": "count/min", "sdate": 1695547200000, "value": 115, "hrv": 20 },
    { "unit": "count/min", "sdate": 1695547500000, "value": 105, "hrv": 24 },
    { "unit": "count/min", "sdate": 1695547800000, "value": 50, "hrv": 70 },
    { "unit": "count/min", "sdate": 1695548100000, "value": 75, "hrv": 52 },
    { "unit": "count/min", "sdate": 1695548400000, "value": 108, "hrv": 26 },
    { "unit": "count/min", "sdate": 1695548700000, "value": 118, "hrv": 21 }
];


const purposes = {
    morning: ["Work", "Creativity", "Focus"],
    afternoon: ["Focus", "Creativity", "Work"],
    night: ["Relax", "Deep Relaxation", "Meditation", "Sleep"]
};


module.exports = {
    tracks, heartRateData, purposes
}