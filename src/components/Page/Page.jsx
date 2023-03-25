import { node, string } from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import styles from './Page.module.scss';
import { useState } from 'react';
import MenuBar from 'components/MenuBar/MenuBar';
import SideMenu from 'components/SideMenu/SideMenu';
import Chat from 'components/Chat/Chat';

const Page = ({ children, className }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      key="pageWrapper"
      className={clsx(styles.wrapper, className)}
    >
      <MenuBar
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
      />
      <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      {children && children}
    </motion.div>
  );
};

Page.propTypes = {
  children: node.isRequired,
  className: string,
};

Page.defaultProps = {
  className: null,
};

export default Page;
