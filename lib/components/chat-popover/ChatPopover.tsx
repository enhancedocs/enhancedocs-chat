import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../helpers/styles';
import type { Config, Theme } from '../../Chat';
import SendIcon from '../icons/SendIcon';
import FullScreenFillIcon from '../icons/FullScreenFillIcon';
import FullScreenExitIcon from '../icons/FullScreenExitIcon';
import { getAnswers, getAnswersWithHistory, answerFeedback } from './services/answers';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import History from './components/history/History';
import { INITIAL_HISTORY_ID, formatHistory } from './helpers/history';
import { processStream } from './helpers/stream';
import classes from './ChatPopover.module.css';

export type HistoryItem = {
  answerId: string;
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

function INITIAL_HISTORY (botName: string | undefined): Array<HistoryItem> {
  return [
    {
      answerId: INITIAL_HISTORY_ID,
      value: `Hi! I'm ${botName || 'EnhanceDocs AI Assistant'}. Nice to meet you! 👋  \nSearch the docs or ask a question...`,
      sources: [],
      origin: 'ai'
    }
  ];
}

export default function ChatPopover ({ config, theme, isOpen, onClose }: ChatPopoverProps) {
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<HistoryItem>>(INITIAL_HISTORY(theme?.botName));
  const [search, setSearch] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  function handleClose () {
    if (onClose) onClose();
    setSearch('');
    setHistory(INITIAL_HISTORY(theme?.botName));
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
              answerId: `human-${prevHistory.length + 1}`,
              value: search,
              origin: 'human'
            }
          ];
        });

        const withHistory = history.length > 1;
        const response = withHistory
          ? await getAnswersWithHistory({ config, search, history: formatHistory(history) })
          : await getAnswers({ config, search });

        const streamId = `ai-${history.length + 1}`;

        await processStream(response.body, (result) => {
          setHistory((prevHistory) => {
            const exists = prevHistory.find(({ answerId }) => answerId == streamId);
            if (exists) {
              return prevHistory.map((historyItem) => {
                if (historyItem.answerId == streamId) {
                  return { ...historyItem, value: result };
                }
                return historyItem;
              });
            }
            return [
              ...prevHistory,
              {
                answerId: streamId,
                value: result,
                sources: [],
                origin: 'ai'
              }
            ];
          });

          if (historyContainerRef.current) {
            historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
          }
        });
      }
    } catch(error) {
      console.error('Chat answers', error);
    } finally {
      setSearch('');
      setLoadingAnswer(false);
    }
  }

  async function handleFeedback ({ answerId, usefulFeedback }: { answerId: string, usefulFeedback: boolean }) {
    try {
      // await answerFeedback({ answerId, usefulFeedback, config });
    } catch (error) {
      console.error('Chat Feedback', error);
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
          !isOpen && classes.EnhancedChat__ChatPopoverHidden,
          isFullScreen && classes.EnhancedChat__ChatPopoverFullScreen
        )
      }
    >
      <Header theme={theme} onClose={handleClose} />
      <section
        className={
          classNames(
            classes.EnhancedChat__ChatPopover_Content,
            isFullScreen && classes.EnhancedChat__ChatPopover_ContentFullScreen,
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
              ? <History history={history} onFeedback={handleFeedback} loadingAnswer={loadingAnswer} />
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
          <div
            className={
              classNames(
                classes.EnhancedChat__ChatPopover_FormButton,
                classes.EnhancedChat__ChatPopover_FormButtonFullScreen
              )
            }
            onClick={() => setIsFullScreen((previous) => !previous)}
          >
            {isFullScreen ? <FullScreenExitIcon /> : <FullScreenFillIcon />}
          </div>
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
