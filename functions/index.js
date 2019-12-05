const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");

    let query = db.collection("Rooms").where('occupied', '==', 'true');

    let observer = query.onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
            if(change.type === 'modified'){
                response.send(change.doc.data());
            }
        });
    });
   });
exports.getOccupiedRoom = functions.https.onRequest((request,response) => {
    admin.firestore().collection('Rooms').doc('mpr2VYubREvNknWA47e2').get().then(function(doc){
            var roomOccupied = doc.data().occupied
            response.send(roomOccupied)
          })
});

exports.increaseCurrentTemperature = functions.https.onRequest((request,response) => {
    var currentTemp = 25;
    admin.firestore().collection('Rooms').doc('mpr2VYubREvNknWA47e2').get().then(function(doc){
         currentTemp= doc.data().currentTemp
         admin.firestore().collection('Rooms').doc('mpr2VYubREvNknWA47e2').update({
            currentTemp: currentTemp+1
              })
      })
          response.send(`${currentTemp}`)

});