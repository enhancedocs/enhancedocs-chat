import { lazy, Suspense, useState } from 'react';
import { classNames } from '../../../../helpers/styles';
import CheckCircleIcon from '../../../icons/CheckCircleIcon';
import ThumbDownIcon from '../../../icons/ThumbDownIcon';
import ThumbUpIcon from '../../../icons/ThumbUpIcon';
import type { HistoryItem } from '../../ChatPopover';
import classes from './History.module.css';

const ReactMarkdown = lazy(() => import('react-markdown'));

type HistoryProps = {
  history: Array<HistoryItem>;
  onFeedback: ({ answerId, usefulFeedback }: { answerId: string, usefulFeedback: boolean }) => void;
  loadingAnswer?: boolean;
}

export default function History ({ history, onFeedback, loadingAnswer }: HistoryProps)  {
  const [submittedFeedback, setSubmittedFeedback] = useState<{ [key: string]: boolean }>({});

  function handleFeedback ({ answerId, usefulFeedback }: { answerId: string, usefulFeedback: boolean }) {
    setSubmittedFeedback((prevSubmittedFeedback) => ({ ...prevSubmittedFeedback, [answerId]: true }));
    onFeedback({ answerId, usefulFeedback });
  }

  return (
    <div className={classes.EnhancedChat__ChatPopover__HistoryContainer}>
      {history.map((historyItem, index) => {
        const isFirst = index == 0;
        const isLast = index == history.length - 1;
        const isProcessing = loadingAnswer && isLast;

        return (
          <div
            className={
              classNames(
                classes.EnhancedChat__ChatPopover__HistoryItem,
                historyItem.origin == 'human' && classes.EnhancedChat__ChatPopover__HistoryItemHuman
              )
            }
            key={historyItem.answerId}
          >
            <Suspense fallback={<></>}>
              <ReactMarkdown
                components={{
                  code(props) {
                    return <code className={classes.EnhancedChat__ChatPopover__MarkdownCode} {...props} />;
                  },
                  a(props) {
                    return <a className={classes.EnhancedChat__ChatPopover__MarkdownLink} {...props} />;
                  },
                  p(props) {
                    return <p className={classes.EnhancedChat__ChatPopover__MarkdownParagraph} {...props} />;
                  }
                }}
              >
                {historyItem.value}
              </ReactMarkdown>
            </Suspense>
            {
              historyItem.origin == 'ai' && !isFirst && !isProcessing && (
                submittedFeedback[historyItem.answerId]
                  ? (
                    <div
                      className={
                        classNames(
                          classes.EnhancedChat__ChatPopover__FeedbackContainer,
                          classes.EnhancedSearch__SearchModal__FeedbackSuccess
                        )
                      }
                    >
                      <CheckCircleIcon />
                      <span>Thanks for submitting your feedback!</span>
                    </div>
                  )
                  : (
                    <div className={classes.EnhancedChat__ChatPopover__FeedbackContainer}>
                      <div
                        className={classes.EnhancedChat__ChatPopover__FeedbackButton}
                        onClick={() => handleFeedback({ answerId: historyItem.answerId, usefulFeedback: true })}
                      >
                        <ThumbUpIcon />
                      </div>
                      <div
                        className={classes.EnhancedChat__ChatPopover__FeedbackButton}
                        onClick={() => handleFeedback({ answerId: historyItem.answerId, usefulFeedback: false })}
                      >
                        <ThumbDownIcon />
                      </div>
                    </div>
                  )
              )
            }
          </div>
        );
      })}
    </div>
  );
}
