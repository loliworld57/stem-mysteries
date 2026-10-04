export type StorageStatus = "saved" | "unavailable" | "invalid";
export type BrowserStorageAccess = Pick<Storage, "getItem" | "setItem">;
export interface StorageResult<T> {
  state: T;
  status: StorageStatus;
}

interface BrowserStateStorageOptions<T> {
  key: string;
  createInitialState: () => T;
  decode: (raw: string | null) => StorageResult<T>;
  encode: (state: T) => string;
  getStorage?: () => BrowserStorageAccess;
}

// Storage access is lazy, including access to the localStorage property itself.
export function createBrowserStateStorage<T>({
  key,
  createInitialState,
  decode,
  encode,
  getStorage = () => window.localStorage,
}: BrowserStateStorageOptions<T>) {
  function load(): StorageResult<T> {
    try {
      return decode(getStorage().getItem(key));
    } catch {
      return { state: createInitialState(), status: "unavailable" };
    }
  }
  function save(state: T): boolean {
    try {
      getStorage().setItem(key, encode(state));
      return true;
    } catch {
      return false;
    }
  }
  return { load, save, clear: () => save(createInitialState()) };
}
