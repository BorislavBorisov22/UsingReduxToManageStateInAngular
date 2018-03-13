import { IAppState } from './IAppState';
import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from './reducer';
import freezeState from './freezeState';

declare var window: any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension) ?
  window.devToolsExtension() : () => { };

export const store = createStore<IAppState>(reducer, compose(applyMiddleware(freezeState), devToolsExtension) as GenericStoreEnhancer);
