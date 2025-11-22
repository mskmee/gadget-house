import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './loader.module.scss';
import LoaderSquares from './LoaderSquares';

interface LoaderProps {
  isVisible: boolean;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const boxVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.1 }}
        >
          <motion.div
            className={styles.loaderBox}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <LoaderSquares />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
