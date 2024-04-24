import { createContext } from 'react';
import { ConfigProviderProps } from './interface';

function renderEmpty(componentName?: string) {
  switch (componentName) {
    default:
      return <></>;
  }
}

export const DefaultConfigProviderProps: ConfigProviderProps = {
  prefixCls: 'arco',
  getPopupContainer: () => document.body,
  size: 'default',
  renderEmpty,
  focusLock: {
    modal: { autoFocus: true },
    drawer: { autoFocus: true },
  },
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || 'arco'}-${componentName}`
};

export const ConfigContext = createContext<ConfigProviderProps>(DefaultConfigProviderProps);
