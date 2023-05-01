import type { Config } from '../../Chat';

type ChatPopoverProps = {
  config: Config;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ChatPopover ({ config, isOpen, onClose }: ChatPopoverProps) {
  return (
    <div>
      {isOpen ? 'ChatPopover' : ''}
    </div>
  );
}
