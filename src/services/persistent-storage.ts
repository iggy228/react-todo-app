export class PersistentStorage {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  setData(key: string, data: any) {
    if (typeof data === 'string') {
      this.storage.setItem(key, data);
      return;
    }
    this.storage.setItem(key, JSON.stringify(data));
  }

  getData<Type>(key: string): Type | null {
    const data = this.storage.getItem(key);
    if (data == null) {
      return null;
    }

    try {
      return JSON.parse(data) as Type;
    } catch (e) {
      console.error("Couldn't parse data in storage.");
      return null;
    }
  }

  keyExist(key: string): boolean {
    const data = this.storage.getItem(key);
    return data !== null;
  }
}
