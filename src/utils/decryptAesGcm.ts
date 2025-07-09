export async function decryptAesGcm(cipherPassword: string, encryptedData: string): Promise<string> {
  const dashIndex = encryptedData.indexOf('-')
  if (dashIndex === -1) {
    throw new Error('Invalid encrypted data format (missing dash)')
  }

  const ivHex = encryptedData.substring(0, dashIndex)
  const combinedHex = encryptedData.substring(dashIndex + 1)

  const iv = hexToBuffer(ivHex)
  const combined = hexToBuffer(combinedHex)

  // Pisahkan ciphertext dan authTag (AES-GCM authTag = 16 byte)
  const ciphertext = combined.slice(0, combined.length - 16)
  const authTag = combined.slice(combined.length - 16)

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(cipherPassword),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array([]),
      iterations: 1,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, additionalData: undefined, tagLength: 128 },
    key,
    new Uint8Array([...ciphertext, ...authTag])
  )

  return new TextDecoder().decode(decrypted)
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16))
  }
  return new Uint8Array(bytes)
}
