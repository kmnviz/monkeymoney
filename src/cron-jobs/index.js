// @ts-nocheck
const dotenv = require('dotenv');
dotenv.config();
const { CronJob } = require('cron');
const axios = require('axios');
const { DateTime } = require('luxon');

const API_URL = `${process.env.API_URL}`;
const generateSuggestions = async () => {
  const fullDate = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
  console.log(`generateSuggestions job trigged on ${fullDate}`);

  const date = DateTime.utc().toFormat('yyyy-MM-dd');
  const payload = {
    date: date,
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

    console.log(`generateSuggestionsJob on ${fullDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log('generateSuggestionsJob error: ', error);
    console.error(`generateSuggestionsJob on ${fullDate} failed`, error.message);
  }
};

const recapSuggestions = async () => {
  const fullDate = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd HH:mm:ss');
  console.log(`recapSuggestions job trigged on ${fullDate}`);

  const date = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd');
  const payload = {
    date: date,
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

    console.log(`recapSuggestionsJobs on ${fullDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log('recapSuggestionsJobs error: ', error);
    console.error(`recapSuggestionsJobs on ${fullDate} failed`, error.message);
  }
};

const postRecapSuggestions = async () => {
  const fullDate = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd HH:mm:ss');
  console.log(`postRecapSuggestions job trigged on ${fullDate}`);

  const date = DateTime.utc()
    .minus({ days: 1 }).toFormat('yyyy-MM-dd');
  const payload = {
    date: date,
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

    console.log(`postRecapSuggestionsJobs on ${fullDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log(`postRecapSuggestionsJobs.error: `, error);
    console.error(`postRecapSuggestionsJobs on ${fullDate} failed`, error.message);
  }
};

const postGenerateSuggestions = async () => {
  const fullDate = DateTime.utc().toFormat('yyyy-MM-dd HH:mm:ss');
  console.log(`fullDate job triggered on ${fullDate}`);

  const date = DateTime.utc().toFormat('yyyy-MM-dd');
  const payload = {
    date: date,
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

    console.log(`postGenerateSuggestionsJobs on ${fullDate} successfully triggered. response: `, response.data);
  } catch (error) {
    console.log(`postGenerateSuggestionsJobs.error: `, error);
    console.error(`postGenerateSuggestionsJobs on ${fullDate} failed`, error.message);
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
