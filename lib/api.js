const axios = require('axios');

const HOST = 'https://home.palmetto.com';

/**
 * Authenicates and returns a bearer token for future requests
 */
async function authenticate(email, password) {
    let url = '/api/v1/login'
    let query = {
        email: email,
        password: password
    };

    try {
        let response = await axios.post(HOST + url, query);
        let token = response.data.token || '';

        return token.trim() || false;

    } catch (e) {
        return false
    }
}

/**
 * Returns information about the user
 */
async function user(token) {
    let url = '/api/v1/user';

    try {
        let response = await axios.get(HOST + url, getHeaders(token));

        return response.data;
    } catch(e) {
        return false;
    }

}

/**
 * Returns the status for each site in the form of an object array
 */
async function siteStatus(token) {
    let url = '/api/v1/sites/status';

    try {
        let response = await axios.get(HOST + url, getHeaders(token));

        return response.data;
    } catch(e) {
        return false;
    }
}

async function notifications(token) {
    let url = '/api/v1/notifications';

    try {
        let response = await axios.get(HOST + url, getHeaders(token));

        return response.data;
    } catch(e) {
        return false;
    }
}


/**
 * Returns the results of the energy consumption for a day, week, month, year
 * Date should be formatted as YYYY-MM-DD for day and week, YYYY-MM for month, and YYYY for year.
 */
async function energy(token, date, interval = intervals.day, value = values.default) {
    let url = '/api/v1/energy/';
    try {
        url += `${interval}/${date}/${value}`;

        let response = await axios.get(HOST + url, getHeaders(token));

        return response.data;
    } catch(e) {
        return false;
    }
}

/**
 * Forms the headers object used to query the api
 */
function getHeaders(token) {
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}

/**
 * Enum for time period energy results should be returned
 */
const intervals = {
    day: 'day',
    week: 'week',
    month: 'month'
};

/**
 * Enum for how the results should be returned
 */
const values = {
    default: '',
    total: 'total',
    average: 'average'
}

module.exports = {
    energy,
    authenticate,
    siteStatus,
    user,
    notifications,
    intervals,
    values
};