import {auth,provider,firebaseApp} from './firebase'


function quiz(){
    return new Promise((resolve,reject)=>{
        fetch("https://opentdb.com/api.php?amount=10")
        .then(res=> res.json())
        .then(value => resolve(value))
        .catch(err => reject(err.message));
    })
}

function loginWithFacebook(){
    return new Promise((resolve,reject)=>{
    provider.setCustomParameters({
        'display': 'popup'
      });

      firebaseApp.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        console.log(user);
        resolve(user)
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
      });
    })
}


// onauth

let authFunc =()=>{

  return new Promise((resolve,reject)=>{
firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
        resolve(user)
    
    } else {
     reject(false)
    }

  })
 
});
}

function logOut(){
    
  return new Promise((resolve,reject)=>{
      firebaseApp.auth().signOut().then(res => {
         resolve(res);
     }).catch(error => {
         var errorMessage = error.message;
         reject(errorMessage)
     })
  })

}

export {quiz , loginWithFacebook,authFunc,logOut}