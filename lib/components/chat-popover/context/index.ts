import { useContext } from 'react';
import { PopoverContext, PopoverProvider } from './context';

const usePopover = () => useContext(PopoverContext);

export {
  PopoverProvider,
  usePopover
};
