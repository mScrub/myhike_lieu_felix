// Write a function to read from our database.

function read_and_display_quote(){
    // console.log("inside the function.")
    // get into the right collection.  reference of database. 
    // This "quotes" has to be exactly the same as what we have in firebase console.
    // Reached our quotes 
    db.collection("quotes").doc("tuesday")
    // This is a listener, it's real time, constantly listening to DB.
    // tuesdayDoc is our callback function, to read all of the database values
    // tuesdayDoc is the input parameter, any var name '>=' arrow notation is like to push input.
    .onSnapshot(tuesdayDoc => {
        console.log(tuesdayDoc.data())
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote; 
    })
    
}
read_and_display_quote();

// Name of function doesn't really matter.  
function insertName(){
    // console.log("Testing the insert field.")
    // User has to be logged in.
    // Check for user login
    // function() user, is the parameter field down below. 'user => '
    // 15 is the way to grab the database info. 
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            // start something.
            console.log(user.uid) // let me know to who is the user that logged in to get the UID.
            currentUser = db.collection("users").doc(user.uid); // Goes into firestore, go to document of the users the main branch.
            // We're to get info of the current user.
            currentUser.get().then(userDoc =>{
                // get the user name
                var user_Name = userDoc.data().name; // gets the name of the 3rd right field. 
                console.log(user_Name);
                // .HTML and .text  
                document.getElementById("name-goes-here").innerHTML=user_Name;
                $('#name-goes-here').text(user_Name);
                // Alternate way. 
                // document.getElementByID("name-goes-here").innerText=user_Name;
            }) // input of the function. 
        }
    })

}
insertName();
