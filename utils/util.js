export function formDataToRawObj(formData) {
  let rawObj = {}
  for (const [key, value] of formData.entries()) {
    rawObj[key] = value;
  };
  return rawObj;

}

export async function submitUserData(userDataRawObj, baseUrl, path){
  try{
    // console.log(userDataRawObj)
    const config = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post(`${baseUrl}${path}`, JSON.stringify(userDataRawObj), config)
    return response
    
  }catch(error){
    console.log("Error in submiting the data", error)
  } 
}