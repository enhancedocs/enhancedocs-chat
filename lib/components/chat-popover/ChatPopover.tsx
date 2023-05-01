import { classNames } from '../../helpers/styles';
import type { Config, Theme } from '../../Chat';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import classes from './ChatPopover.module.css';

type ChatPopoverProps = {
  config: Config;
  theme?: Theme;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ChatPopover ({ config, theme, isOpen, onClose }: ChatPopoverProps) {
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
      <Header theme={theme} onClose={onClose} />
      <section className={classes.EnhancedChat__ChatPopover_Content}>
        Hello World
      </section>
      <Footer />
    </div>
  );
}
