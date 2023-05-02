import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../helpers/styles';
import type { Config, Theme } from '../../Chat';
import SendIcon from '../icons/SendIcon';
import { getAnswers } from './services/answers';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import History from './components/history/History';
import classes from './ChatPopover.module.css';

export type HistoryItem = {
  _id: string;
  value: string;
  sources?: Array<string>;
  origin: 'ai' | 'human';
}

type ChatPopoverProps = {
  config: Config;
  theme?: Theme;
  isOpen: boolean;
  onClose?: () => void;
}

const INITIAL_HISTORY: Array<HistoryItem> = [
  {
    _id: 'ai-0',
    value: 'Hi! I\'m EnhanceDocs AI Assistant. Nice to meet you! 👋  \nSearch the docs or ask a question...',
    sources: [],
    origin: 'ai'
  }
];

export default function ChatPopover ({ config, theme, isOpen, onClose }: ChatPopoverProps) {
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<HistoryItem>>(INITIAL_HISTORY);
  const [search, setSearch] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  function handleClose () {
    if (onClose) onClose();
    setSearch('');
    setHistory(INITIAL_HISTORY);
  }

  function handleSearchChange (event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  async function handleSearchAnswers (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoadingAnswer(true);

      const data = new FormData(event.target as HTMLFormElement);
      const formValues = Object.fromEntries(data.entries());
      const search = formValues.search as string;

      if (search) {
        setHistory((prevHistory) => {
          return [
            ...prevHistory,
            {
              _id: `human-${prevHistory.length + 1}`,
              value: search,
              origin: 'human'
            }
          ];
        });

        const data = await getAnswers({ config, search });
        setHistory((prevHistory) => {
          return [
            ...prevHistory,
            {
              _id: data._id || `ai-${prevHistory.length + 1}`,
              value: data.answer,
              sources: data.sources,
              origin: 'ai'
            }
          ];
        });
      }
    } catch(error) {
      console.error('Chat answers', error);
    } finally {
      setSearch('');
      setLoadingAnswer(false);
    }
  }

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history.length]);

  return createPortal(
    <div
      className={
        classNames(
          classes.EnhancedChat__ChatPopover,
          isOpen && classes.EnhancedChat__ChatPopoverVisible,
          !isOpen && classes.EnhancedChat__ChatPopoverHidden
        )
      }
    >
      <Header theme={theme} onClose={handleClose} />
      <section
        className={
          classNames(
            classes.EnhancedChat__ChatPopover_Content,
            loadingAnswer && classes.EnhancedChat__ChatPopover_ContentLoading
          )
        }
      >
        <div
          className={classes.EnhancedChat__ChatPopover_ContentHistory}
          ref={historyContainerRef}
        >
          {
            history.length
              ? <History history={history} />
              : null
          }
          {
            loadingAnswer && (
              <div className={classes.EnhancedChat__ChatPopover_Loading}>
                <div className={classes.EnhancedChat__ChatPopover_DotStretching} />
              </div>
            )
          }
        </div>
        <form
          className={classes.EnhancedChat__ChatPopover_ContentForm}
          name="enhancedchat-form"
          onSubmit={handleSearchAnswers}
        >
          <input
            className={classes.EnhancedChat__ChatPopover_FormInput}
            name="search"
            placeholder="Search the docs or ask a question..."
            value={search}
            onChange={handleSearchChange}
            autoFocus
            disabled={loadingAnswer}
          />
          <button
            className={classes.EnhancedChat__ChatPopover_FormButton}
            type="submit"
            disabled={loadingAnswer || !search.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </section>
      <Footer />
    </div>,
    document.body
  );
}
