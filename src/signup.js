import { formDataToRawObj, submitUserData } from '../utils/util.js'
import { baseUrl, registerPath } from './constant.js'

const signupForm = document.querySelector('#userSignupForm')
const signupDisplay = document.querySelectorAll('.signupDisplay')
const successSignup = document.querySelectorAll('.successSignup')
const inputGroup = document.querySelectorAll(".input-group-signup")

const testData = {
  firstName : "Nagarjun",
  lastName : "Repala",
  username: "nagarjun45",
  email: "rnagarjun45@gmail.com",
  password: "nagarjun123"
}
inputGroup.forEach(element => {
  
  element.value = testData[element.name];
  
});



signupForm.addEventListener('submit', async function(event){

  event.preventDefault();
  const userFormData = new FormData(event.target);
  let userDataRawObj = formDataToRawObj(userFormData);
  const response = submitUserData(userDataRawObj, baseUrl, registerPath)
  console.log(response);
  signupDisplay.forEach(element => {
    console.log(element)
    element.style.display = 'none';
    
  });
  successSignup.forEach(element => {
    element.style.display = 'block'
  });

})

