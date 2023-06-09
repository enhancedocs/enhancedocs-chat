import CloseIcon from '../../../icons/CloseIcon';
import type { Theme } from '../../../../Chat';
import classes from './Header.module.css';

type HeaderProps = {
  theme?: Theme;
  onClose?: () => void;
}

export default function Header ({ theme, onClose }: HeaderProps) {
  return (
    <nav className={classes.EnhancedChat__ChatPopover_Header}>
      <div className={classes.EnhancedChat__ChatPopover_InnerHeader}>
        {
          theme?.logo
            ? <img src={theme.logo.src} alt={theme.logo.alt} />
            : (
              <svg viewBox="0 0 310 305" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path className={classes.EnhancedChat__ChatPopover_LogoLetters} d="M11 80L43.5 203.5M146.5 44V80M64 47V57M76.5 34H86.5M64 12V22M51 34H39.5M212.5 143V133M223.5 155.5H233.5M212.5 169.5V178M199.5 155.5H191M266.5 200L297 82M146.5 18.5V24.5M201.5 51.5L208 70.5L220.5 54H241.5L230 37.5L236.5 18.5L216.5 24.5L199.5 12V31.5L181.5 44L201.5 51.5ZM102 73.5L90.5 97L66.5 101.5L83 119L79.5 146L102 133L126.5 146L122.5 119L141 101.5L115.5 99L102 73.5Z" stroke="black" strokeWidth="12" strokeLinecap="round"/>
                <path d="M138.5 283.5H12.5L25.5 267.135M138.5 283.5C139.5 288.5 144 298.5 154 298.5C164 298.5 168.167 288.5 169 283.5M138.5 283.5L154 269M169 283.5H207M169 283.5L154 269M154 269V264.5M154 225.5C151.833 221.333 144 212.9 130 212.5C116 212.1 74.1667 224 55 230L25.5 267.135M154 225.5C156.167 221.167 164.2 212.5 179 212.5C193.8 212.5 234.833 224.167 253.5 230L282.5 266.081M154 225.5V260V264.5M253.5 283.5H296.5L282.5 266.081M154 264.5C158.833 257 172.8 242.3 190 243.5C207.2 244.7 258.833 259.054 282.5 266.081M154 264.5C148.667 256.333 133.1 240.7 113.5 243.5C93.9 246.3 46.6667 260.424 25.5 267.135M228.5 283.5H231" stroke="#3763EB" strokeWidth="12" strokeLinecap="round"/>
              </svg>
            )
        }
        <span>Chat with {theme?.botName || 'AI Assistant'}</span>
      </div>
      <div className={classes.EnhancedChat__ChatPopover_CloseIcon} onClick={onClose}>
        <CloseIcon />
      </div>
    </nav>
  );
}
