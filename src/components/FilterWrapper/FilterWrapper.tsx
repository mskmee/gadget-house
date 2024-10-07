import { useState, useCallback } from 'react';
import Arrow from './Arrow/Arrow';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FilterWrapper.module.scss';
import { FilterWrapperProps } from '@/types/catalog.types';

export default function FilterWrapper({ title, children }: FilterWrapperProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleFilterList = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title} onClick={toggleFilterList}>
        <span>{title}</span>
        <Arrow isOpen={isOpen} />
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={styles.children}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
