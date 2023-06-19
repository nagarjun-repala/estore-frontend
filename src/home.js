import { createDynamicElement } from "../utils/util.js";
import { baseUrl, userProfilePath, verifyUserPath } from "./constant.js";

let loggedIn = false;
const tokenDetails = getUserJwtTokenDetails();

async function getUserProfile(tokenDetails){
  if(!tokenDetails) return;
  const bearerToken = `Bearer ${tokenDetails.token}`
  const config = {headers: {'Authorization': bearerToken, 'Content-Type': 'application/json'}};
  const res = await axios.get(`${baseUrl}${userProfilePath}`, config)
  const firstName = res.data.firstName
  const lastName = res.data.lastName
  return {
    firstName, lastName
  }
}

function getUserJwtTokenDetails(){

  if (!localStorage.getItem("jwtToken")) {
    console.error("JWT token not found in local storage");
    return;
  }
  let token = localStorage.getItem("jwtToken").split(' ')[1]
  let rawHeader = token.split('.')[0];
  let rawPayload = token.split('.')[1]
  let payload = JSON.parse(atob(rawPayload));
  let header = JSON.parse(atob(rawHeader));
  return{
    header, payload, token
  };
}

async function isLoggedIn(tokenDetails){

  if(!tokenDetails) return false;
    const bearerToken = `Bearer ${tokenDetails.token}`
    const config = {headers: {'Authorization': bearerToken, 'Content-Type': 'application/json'}};
    const res = await axios.get(`${baseUrl}${verifyUserPath}`, config)
  if(res.status === 200) return true;

}

loggedIn = await isLoggedIn(tokenDetails);

if(!loggedIn){
  window.location.href = "../pages/login.html"
}

const userProfileDetails = await getUserProfile(tokenDetails);
const userWelcomeBody = document.querySelector('#userWelcome');
const userHeading = `Welcome ${userProfileDetails.firstName} ${userProfileDetails.lastName}`;


const welcomeHeader = createDynamicElement('h1', userHeading, [], {id: 'welcomeHeader', style: 'display: inline-block;'})
const logoutDiv = createDynamicElement('div', '', ['logout-btn-div'], {});
const logoutButton = createDynamicElement('button', 'Logout', ['mainButtons', 'btnClass'], {id: 'logoutButton'});


logoutDiv.appendChild(logoutButton);
userWelcomeBody.appendChild(welcomeHeader);
userWelcomeBody.appendChild(logoutDiv);


const selectLogoutButton = document.querySelector(`#${logoutButton.id}`);
selectLogoutButton.addEventListener('click', function(event){
  localStorage.clear();
  window.location.href = "../pages/login.html"
})

// when the user loses focus
window.addEventListener("blur", () => {
  document.title = "Breakup";
});

// when the user's focus is back to your tab (website) again
window.addEventListener("focus", () => {
  document.title = "Patch Up";
});
