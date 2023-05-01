import { classNames } from '../../helpers/styles';
import CloseIcon from '../../components/icons/CloseIcon';
import type { Config } from '../../Chat';
import classes from './ChatPopover.module.css';

type ChatPopoverProps = {
  config: Config;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ChatPopover ({ config, isOpen, onClose }: ChatPopoverProps) {
  return (
    <div
      className={
        classNames(
          classes.EnhancedChat__ChatPopover,
          isOpen && classes.EnhancedChat__ChatPopoverVisible,
          !isOpen && classes.EnhancedChat__ChatPopoverHidden
        )
      }
    >
      <div onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  );
}
