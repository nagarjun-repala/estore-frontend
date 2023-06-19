export function formDataToRawObj(formData) {
  let rawObj = {}
  for (const [key, value] of formData.entries()) {
    rawObj[key] = value;
  };
  return rawObj;

}

export async function submitUserData(userDataRawObj, baseUrl, path){
  try{
    const config = {headers: {'Content-Type': 'application/json'}};
    const response = await axios.post(`${baseUrl}${path}`, JSON.stringify(userDataRawObj), config)
    return response
  }catch(error){
    return error;
  } 
}

export function createDynamicElement(tagName, textContent, classNames = [], attributes = {}){
  const element = document.createElement(tagName);
  element.textContent = textContent;
  classNames.forEach(className => element.classList.add(className));
  for(const [attr, value] of Object.entries(attributes)){
    element.setAttribute(attr, value);
  }
  return element;
}