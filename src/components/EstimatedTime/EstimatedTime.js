import Geolocation from 'react-native-geolocation-service';

export const fetchDistanceBetweenPoints = async (fromLocation, tolocation) => {

  console.log({fromLocation}, {tolocation})
  var urlToFetchDistance =
    'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +
    fromLocation[1] +
    ',' +
    fromLocation[0] +
    '&destinations=' +
    tolocation[1] +
    '%2C' +
    tolocation[0] +
    '&key=' +
    'AIzaSyBd6cxRaM91fdbrWxOyVotopPGZO2PyxOI';

    var data = ''

 await fetch(urlToFetchDistance)
    .then(res => {
      return res.json();
    })
    .then(res => {
      data = res?.rows[0]?.elements[0]?.duration?.text

    })
    .catch(error => {
      console.log('Problem occurred', error);
    });

    return data
};

export const GetLiveLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
                console
                resolve(cords);
            },
            error => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    })
