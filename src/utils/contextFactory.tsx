/* eslint-disable react/display-name */
import React, {
  createContext, useMemo, useState, useContext,
  useEffect,
} from 'react';
import { IPropChild, IStore } from './types';
import { useLocalStorage } from '@/hooks/useLocalStorage';



export function getCxtProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
) {

  return ({ children }: IPropChild) => {
    const { getLocal, setLocal } = useLocalStorage();
    const [store, setStore] = useState(defaultValue);

    const [storageData, setStorageData] = useState({});
    useEffect(() => {
      setStorageData(getLocal(key))
    }, [])
    const value = useMemo(() => {
      return ({
        key,
        store: { ...store, ...storageData },
        setStore: (payload = {}) => setStore((state) => {
          const data = { ...state, ...payload }
          setLocal(key, data as Record<string, unknown> | string)
          return ({
            ...data
          })
        })
        ,
      })
    }
      , [setLocal, store, storageData]);

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
}

const cxtCache: Record<string, Cxt> = {};

export class Cxt<T = any> {
  defaultStore: IStore<T>;

  AppContext: React.Context<IStore<T>>;

  Provider: ({ children }: IPropChild) => JSX.Element;

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => { },
    };
    this.AppContext = createContext(this.defaultStore);
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
    cxtCache[key] = this;
  }
}

export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>;
  const app = useContext(cxt.AppContext);
  // const { getLocal } = useLocalStorage()

  // let storageData: Record<string, unknown> = {}
  // useEffect(() => {
  //   window.onload = () => {
  //     storageData = getLocal(key)
  //   }
  // }, [])
  // console.log(storageData)
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

export function connectFactory<T>(
  key: string,
  defaultValue: T,
) {
  const cxt = cxtCache[key];
  let CurCxt: Cxt<T>;
  if (cxt) {
    CurCxt = cxt;
  } else {
    CurCxt = new Cxt<T>(key, defaultValue);
  }

  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
}

