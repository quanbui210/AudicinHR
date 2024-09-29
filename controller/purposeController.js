const purposes = {
    morning: ["Work", "Creativity", "Focus"],
    afternoon: ["Focus", "Creativity", "Work"],
    night: ["Relax", "Deep Relaxation", "Meditation", "Sleep"]
};


const getPurposesBasedOnTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      // Morning: 6 AM to 12 PM
      return purposes.morning;
    } else if (currentHour >= 12 && currentHour < 18) {
      // Afternoon: 12 PM to 6 PM
      return purposes.afternoon;
    } else {
      // Night: 6 PM to 6 AM
      return purposes.night;
    }
}



const getPurposes = (req, res) => {
    const currentTime = new Date();
    const suitablePurposes = getPurposesBasedOnTime();
    res.json({
      greeting: `Good ${currentTime.getHours() < 12 ? 'morning' : (currentTime.getHours() < 18 ? 'afternoon' : 'evening')}`,
      message: "What are you looking for?",
      purposes: suitablePurposes
    });
}


module.exports = {getPurposes}