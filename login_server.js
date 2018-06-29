// capture data from form. compare it to username and password saved in database. 
// Firebase or MySQL? Use Firebase for authentication and storing user credentials. 
// Write firebase code here. 

// 1. Initialize Firebase
const fb = firebase.initializeApp({
    apiKey: keys.firebase_api,
    authDomain: "bitcoin-2-e029a.firebaseapp.com",
    databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
    projectId: "bitcoin-2-e029a",
    storageBucket: "",
    messagingSenderId: "195092768796"
});

firebase.initializeApp(fb);
var database = firebase.database();

firebase.auth().signOut();


$(document).ready(function () {

    // User profile that is loaded
    var currentUser;
    var userDisplayName;
    $('#logoutButton').hide();



    $("#loginButton").on("click", function () {
        event.preventDefault();

        // Capturing user email and password and saving to local temporary object
        var userCredentials = {
            email: $("#loginID").val().trim(),
            password: $("#loginPassword").val().trim()
        }

        // // Adding Firebase Auth
        // const auth = firebase.auth();
        // // Sign in with email and password
        // const promise = auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
        // // This logs an error if above sign in is unsuccessful
        // promise.catch(e => console.log(e.message));
        // console.log('logged in');
        // console.log('user is ');

        // $('#loggedInUser').text('Welcome ' + userCredentials.username);


        // This whole things works even without a post request. Is a post request necessary? 
        // Send the POST request.
        if (userCredentials.email && userCredentials.password) {
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                console.log("POST response: ", response);
                // console.log("response.email: ", response.email);
                // console.log("response.password: ", response.password);

                // check the database for matching email/password pairs
                database.ref('/users').on("value", function (snapshot) {
                    data = snapshot.val();
                    // console.log("DATA: ", data);
                    // console.log("==========================");
                    var keys = Object.keys(data);
                    console.log('login keys', keys);
                    for (var i = 0; i < keys.length; i++) {
                        // console.log("data[keys[i]].email", data[keys[i]].email);
                        if (response.email === data[keys[i]].email && response.password === data[keys[i]].password) {
                            console.log("username and password combinations EXISTS");
                            currentUser = {
                                id: [keys[i]],
                                email: data[keys[i]].email,
                                username: data[keys[i]].username
                            }

                            // we can go ahead and redirect to another view here using data from currentUser.
                            console.log('currentUser: ', currentUser);
                            console.log(data[keys[i]]);

                            // $('#logoutButton').show();
                            // $('#loginModal').modal('hide');
                            // $('#signupModal').modal('hide');
                            // $('#loginModalButton').hide();
                            // $('#signupModalButton').hide();
                            // $('#jumbotron').removeClass('d-none');
                            // $('#loggedInUser').text('Welcome ' + data[keys[i]].username);
                        }
                    }
                });

            });


        }

    });

    // Sign Up is via username, email and password
    $("#signupButton").on("click", function () {
        event.preventDefault();

        // Capturing user email and password and saving to local temporary object
        var userCredentials = {
            username: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#userPassword").val().trim()
        }

        // // Adding Firebase Auth
        // const auth = firebase.auth();
        // // Sign in with email and password
        // const promise = auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
        // // This logs an error if above sign in is unsuccessful
        // promise.catch(e => console.log(e.message));

        // Send the POST request if sign up is via username, email and password
        if (userCredentials.username && userCredentials.email && userCredentials.password) {
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                userDisplayName = response.username;
                console.log("POST response: ", response);
                console.log('We have a new user');
                console.log("response.username", response.username);
                console.log("response.email: ", response.email);
                console.log("response.password: ", response.password);
                database.ref('/users').push(response);
                // $('#logoutButton').show();
                // $('#loggedInUser').text('Welcome ' + userDisplayName);
                // $('#loginModal').modal('hide');
                // $('#signupModal').modal('hide');
                // $('#loginModalButton').hide();
                // $('#signupModalButton').hide();
                // $('#jumbotron').removeClass('d-none');
                // Put the object into local storage
                localStorage.setItem('currentUser', JSON.stringify(userCredentials));
                console.log('localstorage: ', localStorage);
                if(localStorage.currentUser) {
                    console.log('currentUser in localStorage :', localStorage);
                }
                
                window.location.replace('/userDashboard');

            });
        }

    });

    // Add a realtime listener for auth state change
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

            displayName = firebaseUser.displayName;
            var email = firebaseUser.email;
            var emailVerified = firebaseUser.emailVerified;
            var photoURL = firebaseUser.photoURL;
            var isAnonymous = firebaseUser.isAnonymous;
            var uid = firebaseUser.uid;
            var providerData = firebaseUser.providerData;

            // Capturing user email and password and saving to local temporary object
            var userCredentials = {
                username: displayName,
                email: email,
                password: uid
            }

            //Send POST request to save user information in firebase database
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                console.log("POST response: ", response);
                console.log('We have a new user');
                console.log("response.username", response.username);
                console.log("response.email: ", response.email);
                console.log("response.password: ", response.password);
                database.ref('/users').push(response);
                
                currentUser = response;
                console.log('currentUser: ', currentUser);

                
                console.log('stringify:', JSON.stringify(currentUser));
                // Put the object into local storage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log('localstorage: ', localStorage);
                if(localStorage.currentUser) {
                    console.log('localStorige :', localStorage);
                }
                
                window.location.replace('/userDashboard');
                
            });

        } else {
            console.log('no user logged in');
            $('#logoutButton').hide();
            $('#loginModalButton').show();
            $('#signupModalButton').show();
            $('#loggedInUser').empty();
        }
    });

    // LOGOUT BUTTON
    $('#logoutButton').on('click', e => {
        firebase.auth().signOut();
    });