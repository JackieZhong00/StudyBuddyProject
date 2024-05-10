import crypto from 'crypto'

const SECRET = 'JACKIE-RESTAPI'
//used to hash password + salt
export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex')
}
//used to generate random salt for cookie
export const random = () => crypto.randomBytes(128).toString('base64')
