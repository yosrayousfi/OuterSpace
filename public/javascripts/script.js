const signupButton = document.getElementById("signup-button"),
  loginButton = document.getElementById("login-button"),
  userForms = document.getElementById("user_options-forms");
unregistered = document.querySelectorAll(".childsign");
registered = document.querySelectorAll(".childlog");
registered.forEach((element) => {
  element.style.display = "none";
});
if (signupButton != undefined) {
  signupButton.addEventListener(
    "click",
    () => {
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
      registered.forEach((element) => {
        element.style.display = "block";
      });
      unregistered.forEach((element) => {
        element.style.display = "none";
      });
    },
    false
  );
}

/**
 * Add event listener to the "Login" button
 */
if (loginButton != undefined) {
  loginButton.addEventListener(
    "click",
    () => {
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
      registered.forEach((element) => {
        element.style.display = "none";
      });
      unregistered.forEach((element) => {
        element.style.display = "block";
      });
    },
    false
  );
}
