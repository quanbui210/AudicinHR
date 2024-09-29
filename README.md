# Tracks API

URL:
-  https://audicinhr.onrender.com/docs
- https://audicinhr.onrender.com/api/v1/recommend
- https://audicinhr.onrender.com/api/v2/recommend
- https://audicinhr.onrender.com/api/v2/recommend-time
- https://audicinhr.onrender.com/api/v2/purposes

## Overview

The Tracks API assignment is designed for retrieving track recommendations based on heart rate data. This API consists of two versions: v1 and v2.

### Folder Structures
- ```app.js``: Setup port, initialise Express app, configure Swagger UI
- ```/controller```
	- Handling the business logic, includes algorithm and recommendation logic for all endpoints
	- Divided into 3 files
		- ```trackController.js``` : v1 implementation
		- ```purposeController.js``` :  implementation of ```/api/v2/purposes``` endpoint
		- ```trackControllerAdvanced.js``` : implementing the recommendation endpoints of v2 and Swagger UI logic
			- ```/api/v2/recommend```
			- ```/api/v2/recommend-time```
- ```/router```
	- Configure the routes for endpoints
		- ```trackRouter.js``` : configure ```/api/v1/recommend``` endpoint
		- ```trackAdvancedRouter.js```: configure other endpoints (v2)
- ```/data```
	- ```data.js```: Given data from the assignment, for v1 implementation
	- ```dataHrv.js```: Modified and extended data, to includes HRV and purposes, for v2 implementation
- ```swaggerv2.js```: Swagger API integration for v2 endpoints.


The Rest API is built using NodeJs and ExpressJs, deployed and hosted on [Render](https://render.com/)

### V1
Based on the given data set, stored in ```data.js```, I created an endpoint for get track recommendations. 
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


### V2
After doing some research on the available data that could be collected from the [HealthKit API](https://developer.apple.com/documentation/healthkit/data_types), I decided to create a version 2 of the REST API endpoints, which can utilises the ```# heartRateVariabilitySDNN``` (heart rate variability .data). 

**Why HRV is Important for Track Recommendations:**

HRV refers to the variation in time between each heartbeat. It is a key indicator of the body's ability to respond to stress and maintain balance. Higher HRV means the body's nervous system is flexible and can handle stress well, showing that body is in a healthier and more relaxed state. On the other hand, lower HRV often means the body is stressed or tired and not well, which can lead to feelings of anxiety or other negative effects.

In HealthKit API, ```# heartRateVariabilitySDNN``` refers to *a quantity sample type that measures the standard deviation of heartbeat intervals.*

Using HRV measurement into track recommendations could be useful because:

-   **High HRV** indicates a state of relaxation, creativity, or well-being. Tracks that enhance focus or creativity (e.g., Gamma or Beta waves) can help the user maintain this positive state.
    
-   **Low HRV** often signals stress or fatigue. In this case, tracks that promote deep relaxation (e.g., Theta or Alpha waves) can help reduce anxiety and support recovery.
    

Using both **heart rate** and **HRV** in the recommendation logic provides a more comprehensive understanding of the user's physiological state, allowing for more personalised and effective music suggestions.


To implement, I have created a new version of data set, that includes hrv property and more available tracks, which can be found in ```dataHrv.js``` file


#### Endpoints
```
/api/v2/recommend
/api/v2/recommend-time
/api/v2/purposes
```

#### Ideas:

```/api/v2/recommend```
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
  




```/api/v2/recommend-time``` 

#### Ideas
In case there is no heart rate or hrv data, I implemented this simple endpoint to provide track recommendations based on the time of day. The idea is that users may need different types of tracks for different times. 

-   **Morning (6 AM - 12 PM)**: Tracks for productivity, creativity, and focus.
-   **Afternoon (12 PM - 6 PM)**: Tracks to maintain focus and creativity while working.
-   **Night (6 PM - 6 AM)**: Tracks for relaxation, deep relaxation, meditation, and sleep.

#### Logic:
-  Get the current time, check whether it's morning, afternoon or night.
- Filter the tracks based on the ```purposes``` array, and return the suitable tracks based on time of the day for user. 

```
const purposes = { 
	morning: ["Work", "Creativity", "Focus"], 
	afternoon: ["Focus", "Creativity", "Work"], 
	night: ["Relax", "Deep Relaxation", "Meditation", "Sleep"] 
};
```
*Not only limited to purpose, the logic could be further implemented to also suggest the categories, which includes by purpose, by tone, binaural beat as well.*

```/api/v2/purposes```
Example response:
```
api call at 09:10:37 (morning)
{
	"greeting": "Good morning {{username}}",
	"message": "What are you looking for?",
	"purposes": ["Focus","Creativity","Work"]
}
api call at 16:29:23 (afternoon)
{
	"greeting": "Good afternoon {{username}}",
	"message": "What are you looking for?",
	"purposes": ["Focus","Creativity","Work"]
}

 api call at 22:10:37 (night)
{
	"greeting": "Good evening {{username}}",
	"message": "What are you looking for?",
	"purposes": ["Relax", "Deep Relaxation", "Meditation", "Sleep"]
}
```

### Ideas
When implementing the ```recommend-time``` endpoint, I also create an idea of display the suitable purposes for users based on the time of the day.
- In the Audicin app, when user first enter the app, by knowing the time (for example morning), we could give a prompt like "*Good morning, what are you looking for?*"
- Then based on the logic of the ```/api/v2/purposes``` we could display a list of categories (purposes) that match with the time of the day as specified:
	-   **Morning (6 AM - 12 PM)**: Tracks for productivity, creativity, and focus.
	-   **Afternoon (12 PM - 6 PM)**: Tracks to maintain focus and creativity while working.
	-   **Night (6 PM - 6 AM)**: Tracks for relaxation, deep relaxation, meditation, and sleep.
- User can still have a search bar for typing their desired category, or showing a "*All Categories*" option for them to select. 












Sources:
 - https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/bradycardia--slow-heart-rate
- https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/tachycardia--fast-heart-rate
- https://my.clevelandclinic.org/health/symptoms/21773-heart-rate-variability-hrv
- https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/2881127-heartratevariabilitysdnn