
import { baseUrl, userProfilePath } from "./constant.js";


async function getUserProfile(){

  const {...tokenDetails} = getUserJwtTokenDetails();
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

const {...userProfileDetails} = await getUserProfile();
const userWelcomeHeader = document.querySelector('#userWelcome')

userWelcomeHeader.innerText = userWelcomeHeader.getInnerHTML() + ` ${userProfileDetails.firstName} ${userProfileDetails.lastName}`;




