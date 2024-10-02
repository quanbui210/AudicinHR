const request = require('supertest');
const express = require('express');
const trackRouter = require('../router/trackAdvancedRouter')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v2', trackRouter);


describe('Track recommendation', () => {
    describe('POST /api/v2/recommend', () => {
        const testCases = [
            {
                description: 'Low HR (<60) and High HRV (>50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 55,
                        hrv: 55,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Gamma', 'Beta']
            },
            {
                description: 'Low HR (<60) and Low HRV (≤50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 55,
                        hrv: 45,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Theta']
            },
            {
                description: 'Normal HR (60-79) and High HRV (>50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 70,
                        hrv: 55,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Alpha']
            },
            {
                description: 'Normal HR (60-79) and Low HRV (≤50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 70,
                        hrv: 45,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Alpha', 'Theta']
            },
            {
                description: 'High HR (80-100) and High HRV (>50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 85,
                        hrv: 55,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Beta']
            },
            {
                description: 'High HR (80-100) and Low HRV (≤50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 85,
                        hrv: 45,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Alpha', 'Beta']
            },
            {
                description: 'High HR (>100) and High HRV (>50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 105,
                        hrv: 55,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Theta', 'Gamma']
            },
            {
                description: 'High HR (>100) and Low HRV (≤50)',
                data: {
                    heartRateData: [{
                        unit: "count/min",
                        value: 105,
                        hrv: 45,
                        sdate: 1695542400000
                    }]
                },
                expectedBeats: ['Theta', 'Alpha']
            },
        ];

  
      testCases.forEach(({ description, data, expectedBeats }) => {
        it(`should recommend correct tracks for ${description}`, async () => {
          const response = await request(app)
            .post('/api/v2/recommend')
            .send(data)
            .expect(200);
  
          expect(response.body).toHaveProperty('recommendations');
          expect(Array.isArray(response.body.recommendations)).toBeTruthy();
          
          const recommendation = response.body.recommendations[0];
          expect(recommendation).toHaveProperty('timestamp', data.heartRateData[0].sdate);
          expect(recommendation).toHaveProperty('heartRate', data.heartRateData[0].value);
          expect(recommendation).toHaveProperty('hrv', data.heartRateData[0].hrv);
          expect(Array.isArray(recommendation.recommendation)).toBeTruthy();
          
          // Verify recommended tracks have expected binaural beats
          recommendation.recommendation.forEach(track => {
            expect(expectedBeats).toContain(track.binaural_beat);
          });
        });
      });
  
      it('should handle multiple heart rate data points', async () => {
        const data = {
          heartRateData: [
            { unit: "count/min", value: 55, hrv: 55, sdate: 1695542400000 },
            { unit: "count/min", value: 70, hrv: 45, sdate: 1695542700000 },
            { unit: "count/min", value: 90, hrv: 35, sdate: 1695543000000 }
          ]
        };
  
        const response = await request(app)
          .post('/api/v2/recommend')
          .send(data)
          .expect(200);
  
        expect(response.body.recommendations).toHaveLength(3);
        response.body.recommendations.forEach((rec, index) => {
          expect(rec).toHaveProperty('timestamp', data.heartRateData[index].sdate);
          expect(rec).toHaveProperty('heartRate', data.heartRateData[index].value);
          expect(rec).toHaveProperty('hrv', data.heartRateData[index].hrv);
          expect(Array.isArray(rec.recommendation)).toBeTruthy();
        });
      });
  
      // Error cases
      it('should return 400 when heart rate data is missing', async () => {
        await request(app)
          .post('/api/v2/recommend')
          .send({})
          .expect(400);
      });
  
      it('should return 400 when heart rate data array is empty', async () => {
        await request(app)
          .post('/api/v2/recommend')
          .send({ heartRateData: [] })
          .expect(400);
      });
    });
  
    describe('GET /api/v2/recommend-time', () => {
      const originalDate = global.Date;
      
      afterEach(() => {
        global.Date = originalDate;
      });
  
      const timeTestCases = [
        {
          time: '08:00',
          period: 'morning',
          hours: 8
        },
        {
          time: '14:00',
          period: 'afternoon',
          hours: 14
        },
        {
          time: '20:00',
          period: 'night',
          hours: 20
        }
      ];
  
      timeTestCases.forEach(({ time, period, hours }) => {
        it(`should recommend appropriate tracks for ${period} (${time})`, async () => {
          // Mock the current time
          const mockDate = new Date();
          mockDate.setHours(hours, 0, 0, 0);
          global.Date = class extends Date {
            constructor() {
              super();
              return mockDate;
            }
          };
  
          const response = await request(app)
            .get('/api/v2/recommend-time')
            .expect(200);
  
          expect(response.body).toHaveProperty('recommendations');
          expect(Array.isArray(response.body.recommendations)).toBeTruthy();
          expect(response.body.recommendations.length).toBeGreaterThan(0);
  
          // Verify recommended tracks have appropriate purposes
          response.body.recommendations.forEach(track => {
            expect(track).toHaveProperty('id');
            expect(track).toHaveProperty('track_name');
            expect(track).toHaveProperty('binaural_beat');
            expect(track).toHaveProperty('frequency');
            expect(track).toHaveProperty('tone');
            expect(track).toHaveProperty('purpose');
          });
        });
      });
    });
  
    describe('GET /api/v2/purposes', () => {
      it('should return list of purposes with correct structure', async () => {
        const response = await request(app)
          .get('/api/v2/purposes')
          .expect(200);
  
        expect(response.body).toHaveProperty('greeting');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('purposes');
        expect(Array.isArray(response.body.purposes)).toBeTruthy();
      });
  
      it('should return appropriate purposes based on time of day', async () => {
        // Mock morning time
        const mockDate = new Date();
        mockDate.setHours(9, 0, 0, 0);
        const originalDate = global.Date;
        global.Date = class extends Date {
          constructor() {
            super();
            return mockDate;
          }
        };
  
        const response = await request(app)
          .get('/api/v2/purposes')
          .expect(200);
  
        expect(response.body.purposes).toBeTruthy();
        expect(response.body.purposes.length).toBeGreaterThan(0);
  
        // Restore original Date
        global.Date = originalDate;
      });
    });
  });