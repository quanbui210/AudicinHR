const {tracks, heartRateData, purposes} = require("../dataHrv")

// I read from the HealthKitAPI, one useful data that could be collected is the HRV
// HRV measures the standard deviation of heartbeat intervals
// https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/2881127-heartratevariabilitysdnn

const getTrackRecommendationWithHRV = (heartRate, hrv) => {
    let recommendations;
    if (heartRate < 60 && hrv > 50) {
        // Low HR, High HRV -> Deep Relaxation (Theta) or Creativity (Gamma)
        recommendations = tracks.filter(track =>
            track.binaural_beat === "Theta" || track.binaural_beat === "Gamma"
        );
    } else if (heartRate >= 60 && heartRate < 80 && hrv > 50) {
        // Moderate HR, High HRV -> Focus (Beta) or Creativity (Gamma)
        recommendations = tracks.filter(track =>
            track.binaural_beat === "Beta" || track.binaural_beat === "Gamma"
        );
    } else if (heartRate >= 80 && heartRate < 100 && hrv < 30) {
        // High HR, Low HRV -> Recommend Relaxing Tracks (Alpha, Theta)
        recommendations = tracks.filter(track =>
            track.binaural_beat === "Alpha" || track.binaural_beat === "Theta"
        );
    } else if (heartRate >= 100 && hrv > 50) {
        // High HR, High HRV -> Energizing Tracks (Gamma)
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Gamma"
        );
    } else {
        recommendations = tracks.filter(track =>
            track.binaural_beat === "Alpha"
        );
    }
    return recommendations;
}


// In case there is no hear rate data or value
const getTrackRecommendationBasedOnTime = () => {
    const currentHour = new Date().getHours();
    let recommendations;
    if (currentHour >= 6 && currentHour < 12) {
        recommendations = tracks.filter(track => 
            purposes.morning.includes(track.purpose)
        )
      } else if (currentHour >= 12 && currentHour < 18) {
        recommendations = tracks.filter(track => 
            purposes.afternoon.includes(track.purpose)
        )
      } else {
        recommendations = tracks.filter(track => 
            purposes.night.includes(track.purpose)
        )
    }
    return recommendations
}




const recommendBasedOnTime = (req, res) => {
    const recommendations = getTrackRecommendationBasedOnTime()
    res.json({recommendations})
}

const recommendBasedOnHRV = (req, res) => {
    const recommendations = heartRateData.map(data => {
        const recommendation = getTrackRecommendationWithHRV(data.value, data.hrv);
        return {
          timestamp: data.sdate,
          heartRate: data.value,
          hrv: data.hrv,
          recommendation: recommendation
        };
      });
    res.json({recommendations})
}  

module.exports = {
    recommendBasedOnHRV,
    recommendBasedOnTime
}