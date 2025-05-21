import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')

const jwksUrl = 'https://dev-5d2yfgfrcx72e2m3.us.auth0.com/.well-known/jwks.json'


const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJOBzy4DmUWnpqMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi01ZDJ5ZmdmcmN4NzJlMm0zLnVzLmF1dGgwLmNvbTAeFw0yNTA1MTUx
ODU0NDZaFw0zOTAxMjIxODU0NDZaMCwxKjAoBgNVBAMTIWRldi01ZDJ5ZmdmcmN4
NzJlMm0zLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAOXmA6zn6a/bGB0AeYx4NRhp/8owr4LbvoAWB3XB4PiWBRtq56wYbDVedf1u
RU3ENNRFnInK5IznzVds/hpVA5qzZoTp+BfiC5mxql6JjVPXCmJvaHlv/ZQEJx51
H6DLNYok+JRjqyjOcAbyI3rDhMK/nGN6rvLi3OJJXLbepCaRdgxekNVFPMten5Ld
UGy7vnNWST3Y04Gx6Harfhyt2XjxiOLqjo68jha3wjRape52PoVzzPnlZTGlPejf
/2iBLOPrRmJlim6wmt0zcoOPwfP/AL28I3YdgNYdb7J3Ue407/joUyGVZywU/isA
4XkCMwP7vS7ym+fP3nMMmfJ1VyMCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUXeM3QFEt1JVd0XZDAujIvqTQG8kwDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQBB0mSBIiGa5egG/hGE221K4N4JgdveHf6537Il+PHx
h/EUN6B9yo+BaLitsqQNXNfGZwLp60w+IHb5YZLFKgrwd3PF5HDkqtwOqBBKK1rr
n/rysMvqe6x7F8pWp8jeWwrJlIcLnnbIay5HBkxCloQhMZROJv7ACG2gZNIqi/lG
LwNAxmGe0BATEeLD2fX9FsLIlpPcvDJKBPIIf7dOPn51UQmwjMlnOrwFpvGgE146
J9il9Q8wfomLcXsHFqQTauOv+StzBz/2Lf80prYCAFrWKRcAZKR3f68AIdpi0ff1
fRrCRLJ6dhjT/x6DhtmeO9tf3yT1sARZGZ2IFvvbW5kz
-----END CERTIFICATE-----`

export async function handler(event) {
  try {
    
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader) {
  if (!authHeader) throw new Error('No authorization header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorization header')

  const split = authHeader.split(' ')
  const token = split[1]

  return jsonwebtoken.verify(token, certificate, { algorithms: ['RS256'] })
}

