import qs from 'query-string';
import moment from 'moment';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
const setToken = (token) => cookies.set('token', token, { path: '/'})
const setAuthorizationHeader = () => `Bearer: ${cookies.get('token')}`;
const clearToken = () => cookies.remove("token");

const formatProfileSearchQuery = (queryOpts) => {
  let queryString = {};
  for(let key in queryOpts) {
    queryString[`profile[${key}]`] = queryOpts[key]; 
  };

  return qs.stringify(queryString);
}

const formatViewedDate = (timeStr) => {
	let temp = timeStr.split("T")[0].split("-").reverse();
	let newFormat;

	temp[0] = temp.splice(1, 1, temp[0])[0];
	newFormat = temp.join("/");
	if (newFormat.charAt(0) === "0") {
		newFormat = newFormat.slice(1);
	}
	return newFormat
}

const extractFieldValues = (fields) => {
  let newFields = {};
  for(let key in fields) {
    // TODO: Fix the issue of primary photo from API
    newFields[key] = key !== 'primary_photo' && fields[key] && fields[key].value;
  }

  return newFields;
}

/* Add fromNowOrNow function to moment.
  We would rather use 'Just now' for new comments instead of 'a few seconds ago'
*/
moment.fn.fromNowOrNow = function (a) {
  if (Math.abs(moment().diff(this)) < 25000) { // 25 seconds before or after now
      return 'Just now';
  }
  return this.fromNow(a);
}

export { 
  setToken, 
  setAuthorizationHeader, 
  formatProfileSearchQuery,
	formatViewedDate,
  extractFieldValues,
  clearToken
}
