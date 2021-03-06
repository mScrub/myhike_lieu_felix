// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Obtained from firebase documentation. 

var uiConfig = {
  // This function is going to be called only the moment when we create a new user.
  // The username and the name will get stored in database. 
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // return true;
        // Get username and email and password of the user.
        var user = authResult.user; // get the user object info. 
        if (authResult.additionalUserInfo.isNewUser){
          // create a collection with name "users"
          db.collection("users")
          // define a document for a user with UID as a document ID
          // Users -> UID -> name from firestore database route of info.
          .doc(user.uid).set({
            // Document ID is needed to be able to write into the specific data set
            // user is the same variable, displayName is in the firebase.
            name: user.displayName,
            email: user.email
          }).then(function(){
            // Wrote into the users document ID name and email in the fields.
            // Then what we'll do is test 
            console.log("New User added to firestore");
            window.location.assign("main.html");
            // window.localStorage.assign("main.html");
          })
          .catch(function(error){
            // for if there any errors. 
            console.log(error);
          })

        }else{
          return true; 
        }
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

ui.start('#firebaseui-auth-container', uiConfig); 