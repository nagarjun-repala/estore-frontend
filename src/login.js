import { formDataToRawObj, submitUserData } from "../utils/util.js";
import { baseUrl, loginPath, userProfilePath } from "./constant.js";

const loginForm = document.querySelector('#userLoginForm')

const inputGroup = document.querySelectorAll(".input-group-login")

const testData = {
  username: "nagarjun45",
  password: "nagarjun123"
}
inputGroup.forEach(element => {
  
  element.value = testData[element.name];
  
});

loginForm.addEventListener('submit', async function(event){

  event.preventDefault();
  const userFormData = new FormData(event.target);
  let userDataRawObj = formDataToRawObj(userFormData);
  const result =  await submitUserData(userDataRawObj, baseUrl, loginPath);
  if(result.status !== 200){
    let statusCode = result.response.status
    let message = result.response.data
    console.log(message)
    console.log(statusCode);
    return
  }
    const jwtToken = result.headers.authorization;
    localStorage.setItem("jwtToken", jwtToken);
    window.location.href = "../pages/home.html"
    // console.log('hello', userHeader)
    // const scriptElement = document.createElement('script');
    // scriptElement.src = 'login.js';

    // window.document.body.append(scriptElement)
    
    // window.addEventListener("DOMContentLoaded", async (event) => {
      


    // });
    // window.location.href = "../pages/home.html"
    

    
    
})

