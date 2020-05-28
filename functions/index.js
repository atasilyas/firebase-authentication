const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(); // allow admi specs

exports.addAdminRole = functions.https.onCall((data, context) => { // data buraya gonderdigimiz data fakat context ise o an sessiondaki user hakkındaki bilgileri tutar.Onemli
    //get user and add admin spec
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true // make related user admin
            });
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made as a admin`
            }
        }).catch(err => {
            return err;
        });
});
