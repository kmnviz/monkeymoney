// @ts-nocheck
const dotenv = require('dotenv');
dotenv.config();
const { CronJob } = require('cron');
const axios = require('axios');
const { DateTime } = require('luxon');

const API_URL = `${process.env.API_URL}`;
const generateSuggestions = async () => {
  const nowDate = DateTime.utc()
    .toFormat('yyyy-MM-dd HH:mm:ss');
  const tomorrowDate = DateTime.utc()
    .plus({ days: 1 }).toFormat('yyyy-MM-dd');
  console.log(`generateSuggestions job trigged on ${nowDate} for ${tomorrowDate}`);

  const payload = {
    date: tomorrowDate,
    bookmakerId: '2',
    suggestionsCount: '30',
    mainModel: 'gpt-4-turbo',
  };

  try {
    const start = DateTime.now();
    const path = '/api/generate-suggestions';
    const response = await axios.post(`${API_URL}${path}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    const end = DateTime.now();
    const executionTime = end.diff(start, 'milliseconds').toObject();
    console.log(`Request generate-suggestions execution time: ${executionTime.milliseconds} ms`);

    console.log(`generateSuggestionsJob on ${nowDate} for ${tomorrowDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log('generateSuggestionsJob error: ', error);
    console.error(`generateSuggestionsJob on ${nowDate} for ${tomorrowDate} failed`, error.message);
  }
};

const recapSuggestions = async () => {
  const nowDate = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
  const yesterdayDate = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd');
  console.log(`recapSuggestions job trigged on ${nowDate}`);

  const payload = {
    date: yesterdayDate,
  };

  try {
    const start = DateTime.now();
    const path = '/api/recap-suggestions';
    const response = await axios.post(`${API_URL}${path}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    const end = DateTime.now();
    const executionTime = end.diff(start, 'milliseconds').toObject();
    console.log(`Request recap-suggestions execution time: ${executionTime.milliseconds} ms`);

    console.log(`recapSuggestionsJobs on ${nowDate} for ${yesterdayDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log('recapSuggestionsJobs error: ', error);
    console.error(`recapSuggestionsJobs on ${nowDate} for ${yesterdayDate} failed`, error.message);
  }
};

const postRecapSuggestions = async () => {
  const nowDate = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
  const yesterdayDate = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd');
  console.log(`postRecapSuggestions job trigged on ${nowDate} for ${yesterdayDate}`);

  const payload = {
    date: yesterdayDate,
  };

  try {
    const start = DateTime.now();
    const path = '/api/post-recap-suggestions';
    const response = await axios.post(`${API_URL}${path}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    const end = DateTime.now();
    const executionTime = end.diff(start, 'milliseconds').toObject();
    console.log(`Request post-recap-suggestions execution time: ${executionTime.milliseconds} ms`);

    console.log(`postRecapSuggestionsJobs on ${nowDate} for ${yesterdayDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log(`postRecapSuggestionsJobs.error: `, error);
    console.error(`postRecapSuggestionsJobs on ${nowDate} for ${yesterdayDate} failed`, error.message);
  }
};

const postGenerateSuggestions = async () => {
  const nowDate = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
  const todayDate = DateTime.utc().toFormat('yyyy-MM-dd');
  console.log(`fullDate job triggered on ${nowDate} for ${todayDate}`);

  const payload = {
    date: todayDate,
    suggestionsCount: 12,
  };

  try {
    const start = DateTime.now();
    const path = '/api/post-generate-suggestions';
    const response = await axios.post(`${API_URL}${path}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    const end = DateTime.now();
    const executionTime = end.diff(start, 'milliseconds').toObject();
    console.log(`Request post-generate-suggestions execution time: ${executionTime.milliseconds} ms`);

    console.log(`postGenerateSuggestionsJobs on ${nowDate} for ${todayDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log(`postGenerateSuggestionsJobs.error: `, error);
    console.error(`postGenerateSuggestionsJobs on ${nowDate} for ${todayDate} failed`, error.message);
  }
};

const generateSuggestionsJobs = CronJob.from({
  cronTime: '0 0 18 * * *',
  onTick: generateSuggestions,
  timeZone: 'UTC',
  start: true,
});
const recapSuggestionsJobs = CronJob.from({
  cronTime: '0 0 5 * * *',
  onTick: recapSuggestions,
  timeZone: 'UTC',
  start: true,
});
const postRecapSuggestionsJobs = CronJob.from({
  cronTime: '0 30 5 * * *',
  onTick: postRecapSuggestions,
  timeZone: 'UTC',
  start: true,
});
const postGenerateSuggestionsJobs = CronJob.from({
  cronTime: '0 0 6 * * *',
  onTick: postGenerateSuggestions,
  timeZone: 'UTC',
  start: true,
});
