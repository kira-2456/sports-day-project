import to from 'core/utils/await-to';
import { decrypt, encrypt } from 'core/utils/crypto';
import PreferenceStorage from 'core/modules/storage/PreferenceStorage';

const getEncryptionKey = () => 'sha256';

export const Preferences = {
  LoggedInUser: '@userStore:user',
};

const safeDecrypt = (encryptedData, encKey) => {
  try {
    const result = decrypt(encryptedData, encKey);
    return result;
  } catch (e) {
    return EMPTY_OBJECT;
  }
};

let instance = null;
export default class PreferenceController {
  static Preferences = Preferences;

  static getInstance() {
    return instance || new PreferenceController();
  }

  constructor() {
    if (instance) {
      return instance;
    }

    this.preferences = {};
    instance = this;
  }

  setPreferences = async (preferenceKey, preferenceValue) => {
    await PreferenceStorage.set(preferenceKey, encrypt(preferenceValue, getEncryptionKey()));
    this.preferences[preferenceKey] = preferenceValue;
  };

  getPreferences = async preferenceKey => {
    const cachedPreference = this.getCachedPreference(preferenceKey);
    if (cachedPreference) {
      return cachedPreference;
    }

    const [encryptedPreference, error] = await to(PreferenceStorage.get(preferenceKey));

    if (error) {
      return EMPTY_OBJECT;
    }

    const decryptedPreference = safeDecrypt(encryptedPreference, getEncryptionKey());
    if (decryptedPreference) {
      this.preferences[preferenceKey] = decryptedPreference;
    }
    return decryptedPreference;
  };

  clearPreference = async preferenceKey => {
    await PreferenceStorage.remove(preferenceKey);
    delete this.preferences[preferenceKey];
  };

  clearAllPreferences = async () => {
    await PreferenceStorage.clean();
    this.preferences = {};
  };

  getCachedPreference = preferenceKey => this.preferences[preferenceKey];
}
