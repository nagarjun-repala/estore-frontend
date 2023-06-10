const baseUrl = "http://localhost:8080/user/register"


const singnupButton = document.querySelector('#userForm')
singnupButton.addEventListener('submit', function(event){
  event.preventDefault();
  const userFormData = new FormData(event.target);
  let rawObj = {}
  for (const data of userFormData.entries()) {
    rawObj[data[0]] = data[1]
  }
  console.log(JSON.stringify(rawObj))


})