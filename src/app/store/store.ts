import { IAppState } from './IAppState';
import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from './reducer';

declare var window: any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension) ?
  window.devToolsExtension() : () => { };

export const store = createStore<IAppState>(reducer, compose(devToolsExtension));
