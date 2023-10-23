type ZSet<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void

type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

type ArrayKeys<T, V> = {
  [K in keyof T]: T[K] extends Array<V> ? K : never;
}[keyof T];

function storeHelpers <T> (set: ZSet<T>) {

  return ({
    setValueOf: (propName: keyof T) => {
      return (arg: T[typeof propName]) => {
        set(() => ({ [propName]: arg }) as Partial<T>)
      }
    },
    pushValueTo: <F extends ArrayKeys<T, V>, V>(propName: F) => {
      return (args: V) => {
        set((store) => ({ [propName]: [...store[propName] as V[], args]}) as Partial<T>)
      }
    },
    pushValuesTo: <F extends ArrayKeys<T, V>, V>(propName: F) => {
      return (...args: V[]) => {
        set((store) => ({ [propName]: [...store[propName] as V[], ...args]}) as Partial<T>)
      }
    },
    toggleValueOf: <F extends BooleanKeys<T>>(propName: F) => {
      return () => {
        set(( store ) => ({ [propName]: !store[propName] }) as Partial<T>)
      }      
    }
  })
}

export default storeHelpers
