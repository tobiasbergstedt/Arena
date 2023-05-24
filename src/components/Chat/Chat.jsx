import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { bool, func, number } from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import CloseCross from 'assets/icons/close-cross.svg';
import Smiley from 'assets/icons/chat/smiley.svg';
import SendMessage from 'assets/icons/chat/send-message.svg';
import SoundOn from 'assets/icons/chat/sound-on.svg';
import SoundOff from 'assets/icons/chat/sound-off.svg';

import { UserContext } from 'context/UserContext';

import styles from './Chat.module.scss';
import fixUrl from 'utils/fix-url';

const Chat = ({ isChatOpen, setIsChatOpen, chatHeight }) => {
  const { user } = useContext(UserContext);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isFixed, setIsFixed] = useState(false);
  const contentRef = useRef();
  const { t } = useTranslation();

  const scrollToBottom = () => {
    contentRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const getMessages = async () => {
    const response = await fetch(fixUrl(`/chat`));
    const apiData = await response.json();
    setChatMessages(apiData);
    setIsSubmitting(false);
  };

  const sendMessage = async () => {
    setIsSubmitting(false);
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    const newMessage = {
      content: message,
      dateAndTime: Math.floor(Date.now() / 1000),
      sentBy: user.displayName,
      uid: user.uid,
    };

    await fetch(fixUrl('/chat'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    setMessage('');
    setIsSubmitting(true);
    getMessages();
  };

  useLayoutEffect(() => {
    if (!isSubmitting && isChatOpen) {
      scrollToBottom();
    }
  }, [isSubmitting, isChatOpen]);

  useEffect(() => {
    getMessages();

    const timer = setInterval(() => {
      if (isChatOpen) {
        getMessages();
      }
    }, 20000);

    return () => clearInterval(timer);
  }, [isChatOpen]);

  const animVariants = {
    initial: { left: '100vw' },
    visible: {
      left: '0px',
      transition: { duration: 1 },
    },
    after: { left: '100vw', transition: { duration: 1 } },
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          key="chat"
          variants={animVariants}
          initial="initial"
          animate="visible"
          exit="after"
          className={styles.chat}
          style={{ minHeight: `${chatHeight}px` }}
        >
          <div
            className={styles.chatContent}
            style={{ height: window.innerHeight }}
          >
            <div className={styles.topWrapper}>
              <div
                className={styles.icon}
                style={{
                  maskImage: `url(${CloseCross})`,
                  WebkitMaskImage: `url(${CloseCross})`,
                }}
                onClick={() => setIsChatOpen(false)}
              />
              <h2>{t('communityChat.title')}</h2>
              <div
                className={styles.icon}
                style={{
                  maskImage: isSoundOn ? `url(${SoundOn})` : `url(${SoundOff})`,
                  WebkitMaskImage: isSoundOn
                    ? `url(${SoundOn})`
                    : `url(${SoundOff})`,
                }}
                onClick={() => setIsSoundOn(!isSoundOn)}
              />
            </div>
            <div className={styles.contentWrapper} ref={contentRef}>
              <div className={styles.messagesWrapper}>
                {chatMessages.map(
                  ({ content, sentBy, dateAndTime, uid }, index) => (
                    <div
                      key={(dateAndTime, index)}
                      className={clsx(styles.messageOuterWrapper, {
                        [styles.messageOuterWrapperUser]: uid === user.uid,
                      })}
                    >
                      <div className={styles.messageInformation}>
                        <span
                          className={clsx({
                            [styles.userAuthor]: uid === user.uid,
                          })}
                        >
                          {uid === user.uid ? 'me' : sentBy}
                        </span>
                        <span>
                          {new Date(dateAndTime * 1000).toLocaleString(
                            t('global.localeString')
                          )}
                        </span>
                      </div>
                      <div
                        className={clsx({
                          [styles.message]: uid !== user.uid,
                          [styles.myMessage]: uid === user.uid,
                        })}
                      >
                        {content}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.messageInput}
                  placeholder={t('communityChat.inputPlaceholder')}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <div className={styles.messageIcons}>
                  <div className={styles.messageIconsInnerWrapper}>
                    <div
                      className={styles.messageIcon}
                      style={{
                        maskImage: `url(${Smiley})`,
                        WebkitMaskImage: `url(${Smiley})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                      }}
                      onClick={() => null}
                    />
                    <div
                      className={styles.messageIcon}
                      style={{
                        maskImage: `url(${SendMessage})`,
                        WebkitMaskImage: `url(${SendMessage})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                      }}
                      onClick={() => sendMessage()}
                      // onClick={() => null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Chat.propTypes = {
  isChatOpen: bool.isRequired,
  setIsChatOpen: func.isRequired,
  chatHeight: number,
};

Chat.defaultProps = {
  chatHeight: 0,
};

export default Chat;
