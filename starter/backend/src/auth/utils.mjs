import jsonwebtoken from 'jsonwebtoken'


 export function parseUserId(authorizationHeader) {
    const split = authorizationHeader.split(' ')
    const jwtToken = split[1]
    console.log("jwtToken",jwtToken)
    const decodedJwt = jsonwebtoken.decode(jwtToken)
    console.log("decodedJwt",decodedJwt)
    console.log("decodedJwt.sub",decodedJwt.sub)
    return decodedJwt.sub
  }