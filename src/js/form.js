export default async function landingOrder (phone) {
  if (!phone) return


  var phoneArr = String(phone).split('')

  var removed = phoneArr.filter(x => {
    const yes  = /[\d]/g.test(x)
    return yes
  })
  var formattedPhone = removed.join('')

  var api = 'https://api.hitba.io/main/landing_order'
  var reqObj = {
    email: "none",
    name: "none",
    phone: formattedPhone,
    solved: true
  }
  
  var rawResponse = await fetch(api, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObj)
  });
  var content = await rawResponse.json();
  return content
}