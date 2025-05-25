type ZustandSet<StoreType> = (partial: StoreType | Partial<StoreType> | ((state: StoreType) => StoreType | Partial<StoreType>), replace?: boolean | undefined) => void

type BooleanKey<StoreType> = {
  [K in keyof StoreType]: StoreType[K] extends boolean ? K : never;
}[keyof StoreType];

type ArrayKeys<StoreType, V> = {
  [K in keyof StoreType]: StoreType[K] extends Array<V> ? K : never;
}[keyof StoreType];

function storeSetters <StoreType> (set: ZustandSet<StoreType>) {

  return ({
    setValueOf: (propName: keyof StoreType) => {
      return (arg: StoreType[typeof propName]) => {
        set(() => ({ [propName]: arg }) as Partial<StoreType>)
      }
    },
    setValueUsing: <StoreKeyName extends keyof StoreType>(propName: StoreKeyName, fn: () => StoreType[StoreKeyName]) => {
      return () => {
        set(() => ({ [propName]: fn() }) as unknown as Partial<StoreType>)
      }
    },
    pushValueTo: <StoreKeyName extends ArrayKeys<StoreType, ValueType>, ValueType>(propName: StoreKeyName) => {
      return (args: ValueType) => {
        set((store) => ({ [propName]: [...store[propName] as ValueType[], args]}) as Partial<StoreType>)
      }
    },
    pushValuesTo: <StoreKeyName extends ArrayKeys<StoreType, ValueType>, ValueType>(propName: StoreKeyName) => {
      return (...args: ValueType[]) => {
        set((store) => ({ [propName]: [...store[propName] as ValueType[], ...args]}) as Partial<StoreType>)
      }
    },
    popValueFrom: <StoreKeyName extends ArrayKeys<StoreType, ValueType>, ValueType>(propName: StoreKeyName) => {
      return () => {
        let poppedValue: ValueType | undefined = undefined
        set((store) =>  {
          const newArray = [...(store[propName] as ValueType[])]
          poppedValue = newArray.pop()
          return { [propName]: newArray } as Partial<StoreType>
        })
        return poppedValue
      }
    },
    toggleValueOf: (propName: BooleanKey<StoreType>) => {
      return () => {
        set(( store ) => ({ [propName]: !store[propName] }) as Partial<StoreType>)
      }      
    },

  })
}

export default storeSetters
