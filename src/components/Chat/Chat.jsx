import { AnimatePresence, motion } from 'framer-motion';
import { bool, func } from 'prop-types';
import CloseCross from 'assets/icons/close-cross.svg';
import Smiley from 'assets/icons/chat/smiley.svg';
import SendMessage from 'assets/icons/chat/send-message.svg';
import SoundOn from 'assets/icons/chat/sound-on.svg';
import SoundOff from 'assets/icons/chat/sound-off.svg';

import styles from './Chat.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import messages from './ChatMessages';

const Chat = ({ isChatOpen, setIsChatOpen }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const chatRef = useRef();

  useLayoutEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatRef]);

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
        >
          <div className={styles.chatContent}>
            <div className={styles.topWrapper}>
              <div
                className={styles.icon}
                style={{
                  maskImage: `url(${CloseCross})`,
                  WebkitMaskImage: `url(${CloseCross})`,
                }}
                onClick={() => setIsChatOpen(false)}
              />
              <h2>Community chat</h2>
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
            <div className={styles.contentWrapper}>
              <div className={styles.messagesWrapper} ref={chatRef}>
                {messages.map(({ text, author, date, time }, index) => (
                  <div
                    key={(date, time, index)}
                    className={clsx(styles.messageOuterWrapper, {
                      [styles.messageOuterWrapperUser]: author === 'User 2',
                    })}
                  >
                    <div className={styles.messageInformation}>
                      <span
                        className={clsx({
                          [styles.userAuthor]: author === 'User 2',
                        })}
                      >
                        {author === 'User 2' ? 'me' : author}
                      </span>
                      <span>
                        {date} {time}
                      </span>
                    </div>
                    <div
                      className={clsx({
                        [styles.message]: author !== 'User 2',
                        [styles.myMessage]: author === 'User 2',
                      })}
                    >
                      {text}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.messageInput}
                  placeholder="Type your message here..."
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
                      onClick={() => null}
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
  isChatOpen: bool,
  setIsChatOpen: func,
};

export default Chat;
