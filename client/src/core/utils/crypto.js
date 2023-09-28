import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8';
import SHA256 from 'crypto-js/sha256';

export const encrypt = (data, key) => {
  const hashedKey = SHA256(key).toString();
  return AES.encrypt(JSON.stringify(data), hashedKey).toString();
};

export const decrypt = (encryptedData, key) => {
  if (!encryptedData) {
    return null;
  }
  try {
    const hashedKey = SHA256(key).toString();
    const decryptedValues = AES.decrypt(encryptedData, hashedKey).toString(EncUtf8);
    return JSON.parse(decryptedValues);
  } catch (err) {
    return null;
  }
};
