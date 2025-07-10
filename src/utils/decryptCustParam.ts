import crypto from 'crypto'

const algorithm = 'aes-256-gcm'

/**
 * Decrypts AES-256-GCM encrypted data
 * @param cipherPassword - The encryption key (must be 32 bytes for AES-256)
 * @param encryptedData - Encrypted string in the format: iv-encrypted-authTag
 * @returns Decrypted string
 */
export function decryptCustParam(cipherPassword: string, encryptedData: string): string {
  const parts = encryptedData.split('-')
  // if (parts.length !== 3) {
  //   throw new Error('Invalid encrypted data format')
  // }

  const [ivHex, encryptedHex, authTagHex] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(encryptedHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')

  const key = Buffer.from(cipherPassword, 'utf8')
  // if (key.length !== 32) {
  //   throw new Error('Invalid key length for AES-256. Must be 32 bytes.')
  // }

  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encryptedText, undefined, 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
