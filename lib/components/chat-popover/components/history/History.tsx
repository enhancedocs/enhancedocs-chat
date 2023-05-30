import { lazy, Suspense, useState } from 'react';
import { classNames } from '../../../../helpers/styles';
import CheckCircleIcon from '../../../icons/CheckCircleIcon';
import ThumbDownIcon from '../../../icons/ThumbDownIcon';
import ThumbUpIcon from '../../../icons/ThumbUpIcon';
import LinkIcon from '../../../icons/LinkIcon';
import { usePopover } from '../../context';
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
  const { isFullScreen } = usePopover();

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
                  pre(props) {
                    return <pre className={classes.EnhancedChat__ChatPopover__MarkdownPre} {...props} />;
                  },
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
              historyItem.sources?.length
                ? (
                  <div>
                    <p className={classes.EnhancedChat__ChatPopover__SourcesTitle}>
                      Summary generated from the following resources:
                    </p>
                    <div
                      className={
                        classNames(
                          classes.EnhancedChat__ChatPopover__SourcesContainer,
                          isFullScreen && classes.EnhancedChat__ChatPopover__SourcesContainerFullScreen
                        )
                      }
                    >
                      {
                        historyItem.sources.map((source, index) => {
                          const urlParts = source.split('/').filter(part => part.trim().length > 0);
                          const lastSectionIndex = urlParts.length > 1 ? urlParts.length - 1 : 0;

                          const label = urlParts[lastSectionIndex]
                            .split(/[-_]/)
                            .map(word => word && word.length > 0 ? word.replace(word[0], word[0].toUpperCase()) : '')
                            .join(' ');

                          return (
                            <a
                              key={`source-${index}`}
                              className={
                                classNames(
                                  classes.EnhancedChat__ChatPopover__SourceItem,
                                  isFullScreen && classes.EnhancedChat__ChatPopover__SourceItemFullScreen
                                )
                              }
                              href={source}
                            >
                              <LinkIcon />
                              {label}
                            </a>
                          );
                        })
                      }
                    </div>
                  </div>
                ) : null
            }
            {
              historyItem.origin == 'ai' && !isFirst && !isProcessing && (
                submittedFeedback[historyItem.answerId]
                  ? (
                    <div
                      className={
                        classNames(
                          classes.EnhancedChat__ChatPopover__FeedbackContainer,
                          classes.EnhancedChat__ChatPopover__FeedbackSuccess
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
