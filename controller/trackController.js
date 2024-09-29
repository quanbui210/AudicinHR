const { heartRateData, tracks } = require("../data/data")

const purposes = ["Relax" , "Focus", "Creativity", "Deep Relaxation", "Work"]

const findTrackByPurpose = (purpose) => {
    let purposeTracks = [];
    if (purposes.includes(purpose)) {
        tracks.map(track => {
          if (track.purpose === purpose) {
            purposeTracks.push(track)
          }
        })
    }
    return purposeTracks
}

const getTrackRecommendation = (heartRate) => {
    if (heartRate < 60) {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Gamma" || track.binaural_beat === "Beta"
        )
    } else if (heartRate >= 60 && heartRate < 80) {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Alpha" &&
            track.frequency >= 8 &&
            track.frequency <= 12
        );
    } else if (heartRate >= 80 && heartRate < 100) {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Beta" && 
            track.frequency >= 12 &&
            track.frequency <= 30
        );
    } else {
        // >100bpm is Tachycardia heart rate -> needs calming
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Theta" || track.binaural_beat === "Alpha"
        );
    }
  return recommendations
}

const recommend = (req, res) => {
    const {purpose} = req.query
    if (!purpose) {
        const recommendations = heartRateData.map(data => {
            const recommendation = getTrackRecommendation(data.value);
            return {
              timestamp: data.sdate,
              heartRate: data.value,
              recommendation: recommendation
            };
          });
        return res.json({recommendations})
    } else {
        const recommendations = findTrackByPurpose(purpose)
        res.json({recommendations})
    }
}



module.exports = {
    recommend
}