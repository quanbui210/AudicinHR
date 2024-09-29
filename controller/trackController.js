const { heartRateData, tracks } = require("../data")

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
            track.binaural_beat === "Theta" //frequency
        )
    } else if (heartRate >= 60 && heartRate < 80) {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Alpha"
        );
    } else if (heartRate >= 80 && heartRate < 100) {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Beta"
        );
    } else {
        recommendations = tracks.filter(track => 
            track.binaural_beat === "Gamma"
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