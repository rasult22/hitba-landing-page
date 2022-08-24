export default async function landingOrder (phone) {
  const api = 'https://api.hitba.io/main/landing_order'
  const reqObj = {
    email: "none",
    name: "none",
    phone,
    solved: true
  }
  
  const rawResponse = await fetch(api, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObj)
  });
  const content = await rawResponse.json();
  console.log(content)
  return content
}