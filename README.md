# Tracks API

URL:
-  https://audicinhr.onrender.com/docs
- https://audicinhr.onrender.com/api/v1/recommend
- https://audicinhr.onrender.com/api/v2/recommend
- https://audicinhr.onrender.com/api/v2/recommend-time
- https://audicinhr.onrender.com/api/v2/purposes

## Overview

The Tracks API assignment is designed for retrieving track recommendations based on heart rate data. This API consists of two versions: v1 and v2.

The Rest API is built using NodeJs and ExpressJs, deployed and hosted on [Render](https://render.com/)


### V1

#### Endpoint
```api/v1/recommend```

-   **Purpose Query**:
    -   **User Input**: The user can input a purpose using a search bar or by selecting from a list of available purposes.
    -   **API Request**: When the user specifies a purpose, the API request is formed as follows:
        `GET /api/v1/recommend?purpose={purpose}` 
    -   **Response**: The API will return a list of tracks that match the specified purpose.
		Example response:
```
Example response:
{
	"recommendations": [
		{
			"timestamp": 1695542400000,
			"heartRate": 72,
			"recommendation": [
				{
					"id": 1,
					"track_name": "Calm Waters",
					"binaural_beat": "Alpha",
					"frequency": 10,
					"tone": "Relaxing",
					"purpose": "Relax"
				}
			]
		},
		{
			"timestamp": 1695542700000,
			"heartRate": 68,
			"recommendation": [
				{
					"id": 1,
					"track_name": "Calm Waters",
					"binaural_beat": "Alpha",
					"frequency": 10,
					"tone": "Relaxing",
					"purpose": "Relax"
				}
			]
		},
	]
}
```
		
				
-   **No Purpose Query**:
    -   If the user does not provide a purpose in the query, the API will use an internal recommendation algorithm based on the user’s heart rate data.
    -   In this case, the API request looks like:
        `GET /api/v1/recommend` 
    -   **Response**: The API will return tracks based on the heart rate algorithm

#### Ideas:
- Heart rate < 60 ( bradycardia heart rate)
	 - **Suitable Tracks**: Tracks with Gamma Waves or Beta Waves:  "*Linked to higher cognition, improved memory, and better concentration. Often associated with intense focus or creativity.*" and ""*Associated with active thinking, movement, and self-control. Found during alert, engaged states, and during REM sleep.*"
	- **Logic**: When a user's heart rate is below 60, which is considered too low. Provide tracks that could boost their functioning and performance.

- Heart rate:  60 - 80 ( normal heart rate)
	 - **Suitable Tracks**: Tracks with Alpha Waves: "*Related to relaxation and calmness, often linked to creativity and reduced anxiety.*"
	- **Logic**: When a user's heart rate is between 60 and 80, which is considered normal. Alpha tracks are recommended as they can help maintain relaxation while promoting focus and awareness.

- Heart rate:  80 - 100 ( normal heart rate)
	 - **Suitable Tracks**: Tracks with Beta Waves: "*Associated with active thinking, movement, and self-control. Found during alert, engaged states, and during REM sleep.*"
	- **Logic**: When a user's heart rate is between 80 and 100, which is considered normal, indicates a more engaged state of mind, often related to stress, anxiety, or focused cognitive tasks. Beta tracks are recommended for those with higher normal heart rates, as they can help enhance concentration and cognitive function.

- Heart rate > 100 ( tachycardia heart rate)
	 - **Suitable Tracks**: Tracks with Theta Waves and Alpha Waves:  "*Linked to higher cognition, improved memory, and better concentration. Often associated with intense focus or creativity.*", and " Related to relaxation and calmness, often linked to creativity
and reduced anxiety." 
	- **Logic**: When a user's heart rate is above, which is considered too high, might indicates anxiety or stress. Provide tracks that could calm reduce stress.


Sources:
 - https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/bradycardia--slow-heart-rate
- https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/tachycardia--fast-heart-rate



### V2
Based on the 
#### Endpoints

```
/api/v2/recommend
/api/v2/recommend-time
/api/v2/purposes
```

#### Ideas:

- Heart Rate < 60 (bradycardia heart rate)
    - **HRV > 50**  
        - Suitable Tracks: Tracks with **Gamma Waves** or **Beta Waves**.  
        - Explanation:  
          - **Gamma**: Linked to higher cognition, improved memory, and better concentration. Associated with intense focus and creativity.  
          - **Beta**: Associated with active thinking, movement, and self-control. Found during alert, engaged states and REM sleep.  
        - Logic: When a user’s heart rate is below 60 with high HRV, they may be in a state of relaxation but still need a boost to function effectively.
        
    - **HRV ≤ 50 **
        - Suitable Tracks: Tracks with **Theta Waves**.  
        - Explanation: Theta waves promote deep relaxation and can help with creativity.  
        - Logic: In this case, a low heart rate combined with low HRV indicates potential stress or fatigue. Theta tracks can help facilitate relaxation and support recovery.  

- Heart Rate: 60 - 80 (normal heart rate)  
    - **HRV > 50**  
        - Suitable Tracks: Tracks with **Alpha Waves**.  
        - Explanation: Alpha waves are related to relaxation and calmness, often linked to creativity and reduced anxiety.  
        - Logic: With a normal heart rate and high HRV, users can maintain a relaxed state while promoting focus and awareness.  
        
    - **HRV ≤ 50**  
        - Suitable Tracks: Tracks with **Alpha Waves** and **Theta Waves**.  
        - Explanation: Alpha for relaxation, and Theta for deeper relaxation.  
        - Logic: A normal heart rate with low HRV suggests some underlying stress or anxiety. A combination of Alpha and Theta tracks can help stabilize their mood while promoting relaxation.  

- Heart Rate: 80 - 100 (normal heart rate) 
    - **HRV > 50**  
        - Suitable Tracks: Tracks with **Beta Waves**.  
        - Explanation: Associated with active thinking, movement, and self-control. Found during alert, engaged states and REM sleep.  
        - Logic: This range indicates a more engaged state of mind. Beta tracks can enhance concentration and cognitive function.  
        
    - **HRV ≤ 50**  
        - Suitable Tracks: Tracks with **Alpha Waves** and **Beta Waves.**  
        - Explanation: Alpha tracks promote calmness while Beta tracks enhance focus.  
        - Logic: A high heart rate combined with low HRV may indicate stress or anxiety. This combination can help users manage their anxiety while still promoting cognitive engagement.  

- Heart Rate > 100 (tachycardia heart rate) 
    - **HRV > 50**  
        - Suitable Tracks: Tracks with **Theta Waves** and **Gamma Waves.**  
        - Explanation: Theta for deep relaxation and Gamma for cognitive enhancement.  
        - Logic: When a user’s heart rate is elevated but HRV is still high, it might indicate excitement or engagement. Theta and Gamma tracks can help bring the user back to a calmer state while promoting creativity.  
        
    - **HRV ≤ 50**
    - Suitable Tracks: Tracks with **Theta Waves** and **Alpha Waves.** 
    - Explanation: Theta for deep relaxation and Alpha for calmness. 
    - Logic: A high heart rate and low HRV may suggest anxiety or stress. Providing tracks that promote relaxation can help the user manage their stress and regain a sense of calm.
  

