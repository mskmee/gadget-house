import styles from './MyAccount.module.scss';
import { PersonalDataSection } from './PersonalDataSection';
import { PersonalContactsSection } from './PersonalContactsSection';

export const UserAccount = () => {
  return (
    <main className={styles.dashboardAccount}>
      <h2 className={styles.dashboardAccountTitle}>Personal information</h2>
      <PersonalDataSection />
      <PersonalContactsSection />
    </main>
  );
};
