const {tracks, purposes} = require("../data/dataHrv")

// I read from the HealthKitAPI, one useful data that could be collected is the HRV
// HRV measures the standard deviation of heartbeat intervals
// https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/2881127-heartratevariabilitysdnn

const getTrackRecommendationWithHRV = (heartRate, hrv) => {
    let recommendations;

    if (heartRate < 60) {
        // Low HR, High HRV
        if (hrv > 50) {
            // Suitable Tracks: Gamma or Beta
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Gamma" || track.binaural_beat === "Beta"
            );
        } else {
            // Low HR, Low HRV -> Recommend Theta
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Theta"
            );
        }
    } else if (heartRate >= 60 && heartRate < 80) {
        // Normal HR, High HRV
        if (hrv > 50) {
            // Suitable Tracks: Alpha
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Alpha"
            );
        } else {
            // Normal HR, Low HRV -> Recommend Alpha and Theta
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Alpha" || track.binaural_beat === "Theta"
            );
        }
    } else if (heartRate >= 80 && heartRate < 100) {
        // Normal HR, High HRV
        if (hrv > 50) {
            // Suitable Tracks: Beta
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Beta"
            );
        } else {
            // High HR, Low HRV -> Recommend Alpha and Beta
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Alpha" || track.binaural_beat === "Beta"
            );
        }
    } else {
        // High HR, check HRV
        if (hrv > 50) {
            // Suitable Tracks: Theta and Gamma
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Theta" || track.binaural_beat === "Gamma"
            );
        } else {
            // High HR, Low HRV -> Recommend Theta and Alpha
            recommendations = tracks.filter(track =>
                track.binaural_beat === "Theta" || track.binaural_beat === "Alpha"
            );
        }
    }
    
    return recommendations;
};



// In case there is no hear rate data or value
const getTrackRecommendationBasedOnTime = () => {
    const currentHour = new Date().getHours();
    let timeOfDay;
    console
    if (currentHour >= 6 && currentHour < 12) {
        timeOfDay = 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = 'afternoon';
    } else {
        timeOfDay = 'night';
    }

    const recommendations = tracks.filter(track => 
        purposes[timeOfDay].includes(track.purpose)
    );

    return recommendations;
}




const recommendBasedOnTime = (req, res) => {
    const recommendations = getTrackRecommendationBasedOnTime()
    res.json({recommendations})
}

const recommendBasedOnHRV = (req, res) => {
    const {heartRateData} = req.body
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