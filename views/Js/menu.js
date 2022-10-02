// function openSlideMenu(){
//   document.getElementById("menu").style.width = "250px" ;
//   document.getElementById("main").style.marginLeft="250px";
//   document.getElementById("footer").style.marginLeft="250px";
// }
// function closeSlideMenu(){
//   document.getElementById("menu").style.width = "0px";
//   document.getElementById("content").style.marginLeft="0px";
//     document.getElementById("main").style.marginLeft="0px";
//   document.getElementById("footer").style.marginLeft="0px";
// }

function mostrar(){
  document.getElementById("checkbtn2").style.display="block";
  document.getElementById("checkbtn1").style.display="none";
  document.getElementById("login").style.display= "none";

}
function ocultar(){
  document.getElementById("checkbtn1").style.display="block";
  document.getElementById("checkbtn2").style.display="none";
  document.getElementById("login").style.display= "block";
}

const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); //preventing form submit
 forms.classList.toggle("show-signup");
})
})