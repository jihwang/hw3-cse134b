
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location = "/wireframes-vanilla/home.html";
    }
  });
}

/* SIGNUP */
function registerWithEmail() {
  var email = $("#registerEmail").val();
  var password = $("#registerPassword").val();
  var password2= $("#registerPassword2").val();

  if(!validateRegistrationFields(password, password2, email)) {
    return;
  }

  console.log(password + password2 + email)
  var success = true;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    window.location = "/wireframes-vanilla/home.html";
  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage);
  });

  if(success == false) {
    return;
  }
}

/* VALIDATION */
function validateRegistrationFields(password, password2, email) {
  var errors = ""
  errors += validatePassword(password, password2);
  errors += validateEmail(password, password2);

  if(errors != "") {
    alert(errors);
    return false;
  }
  return true;
}

function validatePassword(password, password2) {
  if(password.length < 5) {
    $("#registerPassword").animate({border: '2px red'}, "fast");
    return "Password must be greater than 5 characters\n";
  }
  if(password != password2) {
    $("#registerPassword2").animate({border: '2px red'}, "fast");
    return "Passwords do not match\n";
  }
  return "";
}
function validateEmail(email) {
  var re = /\S+@\S+/
  //re.test(email)
  if(true) {
    return "";
  } else {
    return "Enter a valid email";
  }
}

/* SIGNIN */
function signIn() {
  if (firebase.auth().currentUser) {
    // Already logged in, redirect to home
    window.location = "/wireframes-vanilla/home.html";
  } else {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
    console.log(password)
    validateRegistrationFields(password, password, email);

    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      window.location = "/wireframes-vanilla/home.html";
    }), function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    };
  }
}
