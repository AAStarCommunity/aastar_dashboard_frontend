/* eslint-disable react/display-name */
import React, {
  createContext, useMemo, useState, useContext,
  useEffect,
} from 'react';
import { IPropChild, IStore } from './types';
import { getLocal, setLocal } from '@/utils/localStorage';



export function getCxtProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
  storage: boolean = true
) {

  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);

    useEffect(() => {
      storage && setStore(getLocal(key))
    }, [])
    const value = useMemo(() => {
      return ({
        key,
        store: { ...store },
        storage,
        setStore: (payload: any) => setStore((state) => {
          const data = payload ? { ...state, ...payload } : {}
          storage && setLocal(key, data as Record<string, unknown> | string)
          return ({
            ...data
          })
        })
        ,
      })
    }
      , [store]);

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

  constructor(key: string, defaultValue: T, storage?: boolean) {
    this.defaultStore = {
      key,
      store: defaultValue,
      storage,
      setStore: () => { },
    };
    this.AppContext = createContext(this.defaultStore);
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext, storage);
    cxtCache[key] = this;
  }
}

export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>;
  const app = useContext(cxt.AppContext);

  return {
    store: app.store,
    setStore: app.setStore,
  };
}

export function connectFactory<T>(
  key: string,
  defaultValue: T,
  storage?: boolean
) {
  const cxt = cxtCache[key];
  let CurCxt: Cxt<T>;
  if (cxt) {
    CurCxt = cxt;
  } else {
    CurCxt = new Cxt<T>(key, defaultValue, storage);
  }

  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
}

