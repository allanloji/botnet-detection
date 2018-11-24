import firebase from 'firebase'

const config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    storageBucket: ''
};
const Fire = firebase.initializeApp(config);

export default Fire;