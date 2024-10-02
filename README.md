
# Tracks API

  

URL:

- https://audicinhr.onrender.com/docs

- https://audicinhr.onrender.com/api/v1/recommend

- https://audicinhr.onrender.com/api/v2/recommend

- https://audicinhr.onrender.com/api/v2/recommend-time

- https://audicinhr.onrender.com/api/v2/purposes

  

## Overview

  

The Tracks API assignment is designed for retrieving track recommendations based on heart rate data. This API consists of two versions: v1 and v2, basically just different logic and approach handle the assignment. Both are for recommend suitable audio tracks that would help the Audicin app to be more personalised, while V1 uses the given data set from the assignment to recommend tracks based on heart rate and frequency, V2 utilises more data, including the heart rate variability (HRV), heart rat value and time of day to suggest appropriate tracks for users.

  

To run the project:

- Clone the project ```git clone git@github.com:quanbui210/AudicinHR.git```

- Navigate to the project folder: ```cd AudicinHR```

- Install all the dependencies: ```npm install```

- Start the application: ```npm start```


Trying the endpoints on Postman / Insomnia
- In the root directory of the folder, I have attached an `Audicin.json` file, there are 2 environment which is local and production that you can selects
	- Open Insomnia (or Postman)
	- Create a new project
	- Click "import" button, then select a file
	- Select `Audicin.json`. 

Testing with Jest
- Run `npm test`
  
## Folder Structures

-  ```app.js```: Setup port, initialise Express app, configure Swagger UI
- `Audicin.json`: JSON file for API documentation testing

-  ```/controller```

- Handling the business logic, includes algorithm and recommendation logic for all endpoints

	- Divided into 3 files

		-  ```trackController.js``` : v1 implementation

		-  ```purposeController.js``` : implementation of ```/api/v2/purposes``` endpoint

		-  ```trackControllerAdvanced.js``` : implementing the recommendation endpoints of v2 and Swagger UI logic

			-  ```/api/v2/recommend```

			-  ```/api/v2/recommend-time```

-  ```/router```

	- Configure the routes for endpoints
		
		-  ```trackRouter.js``` : configure ```/api/v1/recommend``` endpoint

		-  ```trackAdvancedRouter.js```: configure other endpoints (v2)

-  ```/data```

	-  ```data.js```: Given data from the assignment, for v1 implementation

	-  ```dataHrv.js```: Modified and extended data, to includes HRV and purposes, for v2 implementation

-  ```swaggerv2.js```: Swagger API integration for v2 endpoints.

- `/test`: 
	- `trackv2.test.js`: Test cases for v2 endpoints with Jest
  

The Rest API is built using NodeJs and ExpressJs, deployed and hosted on [Render](https://render.com/)

  

## V1

Based on the given data set, stored in ```data.js```, I created an endpoint for get track recommendations.

#### Endpoint

```api/v1/recommend```

  

-  **Purpose Query**:

-  **User Input**: The user can input a purpose using a search bar or by selecting from a list of available purposes.

-  **API Request**: When the user specifies a purpose, the API request is formed as follows:

`GET /api/v1/recommend?purpose={purpose}`

-  **Response**: The API will return a list of tracks that match the specified purpose.

```JSON
Example response: GET /api/v1/recommend?purpose=Relax

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

-  **No Purpose Query**:

	- If the user does not provide a purpose in the query, the API will use an internal recommendation algorithm based on the user’s heart rate data.

	- In this case, the API request looks like:

`POST /api/v1/recommend`

```JSON
Request body:
{
	"heartRateData": [
		{ "unit": "count/min", "sdate": 1695542400000, "value": 72 },
		{ "unit": "count/min", "sdate": 1695542700000, "value": 68 },
		{ "unit": "count/min", "sdate": 1695543000000, "value": 65 },
		{ "unit": "count/min", "sdate": 1695543300000, "value": 95 },
		{ "unit": "count/min", "sdate": 1695543600000, "value": 110 },
		{ "unit": "count/min", "sdate": 1695543900000, "value": 125 }
	]
}
```


-  **Response**: The API will return tracks based on the heart rate algorithm

  

#### Ideas:

- Heart rate < 60 ( bradycardia heart rate)

	-  **Suitable Tracks**: Tracks with Gamma Waves or Beta Waves: "*Linked to higher cognition, improved memory, and better concentration. Often associated with intense focus or creativity.*" and ""*Associated with active thinking, movement, and self-control. Found during alert, engaged states, and during REM sleep.*"

	-  **Logic**: When a user's heart rate is below 60, which is considered too low. Provide tracks that could boost their functioning and performance.

  

- Heart rate: 60 - 80 ( normal heart rate)

	-  **Suitable Tracks**: Tracks with Alpha Waves: "*Related to relaxation and calmness, often linked to creativity and reduced anxiety.*"

	-  **Logic**: When a user's heart rate is between 60 and 80, which is considered normal. Alpha tracks are recommended as they can help maintain relaxation while promoting focus and awareness.

  

- Heart rate: 80 - 100 ( normal heart rate)

	-  **Suitable Tracks**: Tracks with Beta Waves: "*Associated with active thinking, movement, and self-control. Found during alert, engaged states, and during REM sleep.*"

	-  **Logic**: When a user's heart rate is between 80 and 100, which is considered normal, indicates a more engaged state of mind, often related to stress, anxiety, or focused cognitive tasks. Beta tracks are recommended for those with higher normal heart rates, as they can help enhance concentration and cognitive function.

  

- Heart rate > 100 ( tachycardia heart rate)

	-  **Suitable Tracks**: Tracks with Theta Waves and Alpha Waves: "*Linked to higher cognition, improved memory, and better concentration. Often associated with intense focus or creativity.*", and " Related to relaxation and calmness, often linked to creativity and reduced anxiety."

	- **Logic**: When a user's heart rate is above, which is considered too high, might indicates anxiety or stress. Provide tracks that could calm reduce stress.

  
  

## V2

After doing some research on the available data that could be collected from the [HealthKit API](https://developer.apple.com/documentation/healthkit/data_types), I decided to create a version 2 of the REST API endpoints, which can utilises the ```# heartRateVariabilitySDNN``` (heart rate variability .data).

  

**Why HRV is Important for Track Recommendations:**

  

HRV refers to the variation in time between each heartbeat. It is a key indicator of the body's ability to respond to stress and maintain balance. Higher HRV means the body's nervous system is flexible and can handle stress well, showing that body is in a healthier and more relaxed state. On the other hand, lower HRV often means the body is stressed or tired and not well, which can lead to feelings of anxiety or other negative effects.

  

In HealthKit API, ```# heartRateVariabilitySDNN``` refers to *a quantity sample type that measures the standard deviation of heartbeat intervals.*

  

Using HRV measurement into track recommendations could be useful because:

-  **High HRV** indicates a state of relaxation, creativity, or well-being. Tracks that enhance focus or creativity (e.g., Gamma or Beta waves) can help the user maintain this positive state.

-  **Low HRV** often signals stress or fatigue. In this case, tracks that promote deep relaxation (e.g., Theta or Alpha waves) can help reduce anxiety and support recovery.

  

Using both **heart rate** and **HRV** in the recommendation logic provides a more comprehensive understanding of the user's physiological state, allowing for more personalised and effective music suggestions.

  
  

To implement, I have created a new version of data set, that that extends the given data set, to includes hrv data and more tracks, which can be found in ```dataHrv.js``` file

  
  

#### Endpoints

```

/api/v2/recommend

/api/v2/recommend-time

/api/v2/purposes

```

---

  

```POST /api/v2/recommend```

```JSON
Request body:
{
	"heartRateData": [
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
	]
}
```

#### Ideas:

- Heart Rate < 60 (bradycardia heart rate)

	-  **HRV > 50**

		- Suitable Tracks: Tracks with **Gamma Waves** or **Beta Waves**.

		- Explanation:

		-  **Gamma**: Linked to higher cognition, improved memory, and better concentration. Associated with intense focus and creativity.

		-  **Beta**: Associated with active thinking, movement, and self-control. Found during alert, engaged states and REM sleep.

		- Logic: When a user’s heart rate is below 60 with high HRV, they may be in a state of relaxation but still need a boost to function effectively.

	-  **HRV ≤ 50**

		- Suitable Tracks: Tracks with **Theta Waves**.

		- Explanation: Theta waves promote deep relaxation and can help with creativity.

		- Logic: In this case, a low heart rate combined with low HRV indicates potential stress or fatigue. Theta tracks can help facilitate relaxation and support recovery.

  

- Heart Rate: 60 - 80 (normal heart rate)

	-  **HRV > 50**

		- Suitable Tracks: Tracks with **Alpha Waves**.

		- Explanation: Alpha waves are related to relaxation and calmness, often linked to creativity and reduced anxiety.

		- Logic: With a normal heart rate and high HRV, users can maintain a relaxed state while promoting focus and awareness.

	-  **HRV ≤ 50**

		- Suitable Tracks: Tracks with **Alpha Waves** and **Theta Waves**.

		- Explanation: Alpha for relaxation, and Theta for deeper relaxation.

		- Logic: A normal heart rate with low HRV suggests some underlying stress or anxiety. A combination of Alpha and Theta tracks can help stabilize their mood while promoting relaxation.

  

- Heart Rate: 80 - 100 (normal heart rate)

	-  **HRV > 50**

		- Suitable Tracks: Tracks with **Beta Waves**.

		- Explanation: Associated with active thinking, movement, and self-control. Found during alert, engaged states and REM sleep.

		- Logic: This range indicates a more engaged state of mind. Beta tracks can enhance concentration and cognitive function.

	-  **HRV ≤ 50**

		- Suitable Tracks: Tracks with **Alpha Waves** and **Beta Waves.**

		- Explanation: Alpha tracks promote calmness while Beta tracks enhance focus.

		- Logic: A high heart rate combined with low HRV may indicate stress or anxiety. This combination can help users manage their anxiety while still promoting cognitive engagement.

  

- Heart Rate > 100 (tachycardia heart rate)

	-  **HRV > 50**

		- Suitable Tracks: Tracks with **Theta Waves** and **Gamma Waves.**

		- Explanation: Theta for deep relaxation and Gamma for cognitive enhancement.

		- Logic: When a user’s heart rate is elevated but HRV is still high, it might indicate excitement or engagement. Theta and Gamma tracks can help bring the user back to a calmer state while promoting creativity.

	-  **HRV ≤ 50**

		- Suitable Tracks: Tracks with **Theta Waves** and **Alpha Waves.**

		- Explanation: Theta for deep relaxation and Alpha for calmness.

		- Logic: A high heart rate and low HRV may suggest anxiety or stress. Providing tracks that promote relaxation can help the user manage their stress and regain a sense of calm.

  
  

---

  

```/api/v2/recommend-time```

  

*Not only limited to purpose, the logic could be further implemented to also suggest the categories, which includes by purpose, by tone, binaural beat as well.*

  

#### Ideas

In case there is no heart rate or hrv data, I implemented this simple endpoint to provide track recommendations based on the time of day. The idea is that users may need different types of tracks for different times.

  

-  **Morning (6 AM - 12 PM)**: Tracks for productivity, creativity, and focus.

-  **Afternoon (12 PM - 6 PM)**: Tracks to maintain focus and creativity while working.

-  **Night (6 PM - 6 AM)**: Tracks for relaxation, deep relaxation, meditation, and sleep.

  

#### Logic:

- Get the current time, check whether it's morning, afternoon or night.

- Filter the tracks based on the ```purposes``` array, and return the suitable tracks based on time of the day for user.

  

#### Use cases

- At 8 AM, user opens the app to start their day. Audicin recommends tracks that promote focus and creativity, with a productive mindset -> Recommend tracks with purposes like “Work,” “Creativity,” and “Focus.”

- At 2 PM, user wants to stay productive during their workday. Audicin suggests similar tracks that can help the user stay engaged and focused on their tasks. -> Recommend tracks that continue to improve “Focus” and “Work” (or "Creativity).

- At 9PM, Audicin app recommend tracks aimed at relaxation and mediation for user to relax and prepare for a good sleep -> Recommend tracks with "Relax, Deep Relaxation, Meditation and Sleep"

---

```/api/v2/purposes```

  

*Not only limited to purpose, the logic could be further implemented to also suggest the categories, which includes by purpose, by tone, binaural beat as well.*

  

```

const purposes = {

morning: ["Work", "Creativity", "Focus"],

afternoon: ["Focus", "Creativity", "Work"],

night: ["Relax", "Deep Relaxation", "Meditation", "Sleep"]

};

```

  

Example response: GET /api/v2/purposes

```

GET /api/v2/purposes

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

	-  **Morning (6 AM - 12 PM)**: Tracks for productivity, creativity, and focus.

	-  **Afternoon (12 PM - 6 PM)**: Tracks to maintain focus and creativity while working.

	-  **Night (6 PM - 6 AM)**: Tracks for relaxation, deep relaxation, meditation, and sleep.

- User can still have a search bar for typing their desired category, or showing a "*All Categories*" option for them to select.

  
  
  
  
  
  
  
  
  
  
  
  

Sources:

- https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/bradycardia--slow-heart-rate

- https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/tachycardia--fast-heart-rate

- https://my.clevelandclinic.org/health/symptoms/21773-heart-rate-variability-hrv

- https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/2881127-heartratevariabilitysdnn