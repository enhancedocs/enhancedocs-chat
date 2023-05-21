import { PopoverProvider } from './context';
import ChatPopover, { ChatPopoverProps } from './ChatPopover';

export default function ChatPopoverWrapper (props: ChatPopoverProps) {
  return (
    <PopoverProvider>
      <ChatPopover {...props} />
    </PopoverProvider>
  );
}
