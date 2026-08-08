export class PersistentStorage {
  private storage: Storage;

  public constructor() {
    this.storage = localStorage;
  }

  public setData(key: string, data: any) {
    if (typeof data === 'string') {
      this.storage.setItem(key, data);
      return;
    }
    this.storage.setItem(key, JSON.stringify(data));
  }

  public getData<Type>(key: string): Type | null {
    const data = this.storage.getItem(key);
    if (data == null) {
      return null;
    }

    try {
      return JSON.parse(data) as Type;
    } catch (e) {
      return data as unknown as Type;
    }
  }

  public keyExist(key: string): boolean {
    const data = this.storage.getItem(key);
    return data !== null;
  }
}
