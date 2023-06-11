import { formDataToRawObj, submitUserData } from "../utils/util.js";
import { baseUrl, loginPath } from "./constant.js";

const loginForm = document.querySelector('#userLoginForm')



loginForm.addEventListener('submit', async function(event){

  event.preventDefault();
  const userFormData = new FormData(event.target);
  let userDataRawObj = formDataToRawObj(userFormData);
  const response =  await submitUserData(userDataRawObj, baseUrl, loginPath);
  if(response.headers.authorization){
    const jwt = response.headers.authorization.split(" ")[1];
    console.log(jwt);
  }


})

