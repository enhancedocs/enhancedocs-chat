import { lazy } from 'react';
import { classNames } from '../../../../helpers/styles';
import type { HistoryItem } from '../../ChatPopover';
import classes from './History.module.css';

const ReactMarkdown = lazy(() => import('react-markdown'));

type HistoryProps = {
  history: Array<HistoryItem>;
}

export default function History ({ history }: HistoryProps)  {
  return (
    <div className={classes.EnhancedChat__ChatPopover__HistoryContainer}>
      {history.map((historyItem) => {
        return (
          <div
            className={
              classNames(
                classes.EnhancedChat__ChatPopover__HistoryItem,
                historyItem.origin === 'human' && classes.EnhancedChat__ChatPopover__HistoryItemHuman
              )
            }
            key={historyItem._id}
          >
            {ReactMarkdown && (
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
            )}
          </div>
        );
      })}
    </div>
  );
}
