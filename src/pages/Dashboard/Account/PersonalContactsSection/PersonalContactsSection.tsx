import styles from '../MyAccount.module.scss';
import usePersonalContacts from '../hooks/use-personal-contacts';
import PersonalContactsForm from './PersonalContactsForm';
import PersonalContactsView from './PersonalContactsView';

export type TContacts = {
  email: string;
  defaultNumber: string;
  additionalNumber: string;
};

export const PersonalContactsSection = () => {
  const {
    handleChangeContacts,
    handleAddPhoneNumber,
    handleCloseAddPhoneNumberSection,
    handleEmailChange,
    handlePhoneNumberChange,
    handleSaveContacts,
    contacts,
    errors,
    isOpenAddPhoneNumberSection,
    isOpenContactsSection,
  } = usePersonalContacts();

  return (
    <>
      {isOpenContactsSection ? (
        <PersonalContactsForm
          styles={styles}
          handleSaveContacts={handleSaveContacts}
          handleCloseAddPhoneNumberSection={handleCloseAddPhoneNumberSection}
          contacts={contacts}
          handleEmailChange={handleEmailChange}
          errors={errors}
          handleAddPhoneNumber={handleAddPhoneNumber}
          handlePhoneNumberChange={handlePhoneNumberChange}
          isOpenAddPhoneNumberSection={isOpenAddPhoneNumberSection}
        />
      ) : (
        <PersonalContactsView
          styles={styles}
          handleChangeContacts={handleChangeContacts}
          isOpenAddPhoneNumberSection={isOpenAddPhoneNumberSection}
          contacts={contacts}
          handleSaveContacts={handleSaveContacts}
          handleAddPhoneNumber={handleAddPhoneNumber}
          handlePhoneNumberChange={handlePhoneNumberChange}
          errors={errors}
          handleCloseAddPhoneNumberSection={handleCloseAddPhoneNumberSection}
        />
      )}
    </>
  );
};
