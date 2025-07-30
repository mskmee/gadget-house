/* eslint-disable no-unused-vars */

import { ChangeUserData } from '@/assets/icons/ChangeUserData';
import React from 'react';
import { Errors, PersonalContacts } from '../hooks/use-personal-contacts';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';

type PersonalContactsViewProps = {
  styles: {
    [key: string]: string;
  };
  handleChangeContacts: () => void;
  isOpenAddPhoneNumberSection: boolean;
  contacts: PersonalContacts;
  handleSaveContacts: (
    e: React.FormEvent<HTMLFormElement>,
    isOnlyAdditionalNumber?: boolean,
  ) => void;
  handlePhoneNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  errors: Errors;
  handleCloseAddPhoneNumberSection: () => void;
  handleAddPhoneNumber: () => void;
};

const PersonalContactsView = ({
  styles,
  handleChangeContacts,
  isOpenAddPhoneNumberSection,
  contacts,
  handleSaveContacts,
  handlePhoneNumberChange,
  handleAddPhoneNumber,
  errors,
  handleCloseAddPhoneNumberSection,
}: PersonalContactsViewProps) => {
  return (
    <div className={styles.personalContactWrap}>
      <div className={styles.personalContactTitle}>
        <h3>Contacts</h3>
        <span onClick={handleChangeContacts}>
          <ChangeUserData />
        </span>
      </div>
      <div className={styles.personalContacts}>
        <div>
          <span>E-mail</span>
          <span>{contacts.email}</span>
        </div>
        <div>
          <span>Phone number</span>
          <span>{contacts.defaultNumber}</span>
        </div>
        {isOpenAddPhoneNumberSection ? (
          <form
            onSubmit={(e) => handleSaveContacts(e, true)}
            className={styles.addPhoneNumberSection}
          >
            <div>
              <span>Additional phone number</span>
              <input
                placeholder="+38 (000)-000-00-00"
                value={
                  contacts.additionalNumber.length > 4
                    ? contacts.additionalNumber
                    : ''
                }
                onChange={(e) => handlePhoneNumberChange(e, 'additionalNumber')}
                maxLength={19}
              />
              {errors.additionalNumber && (
                <div className={styles.inputError}>
                  <ErrorIcon />
                  <span>{errors.additionalNumber}</span>
                </div>
              )}
            </div>
            <div className={styles.buttonsSection}>
              <button onClick={handleCloseAddPhoneNumberSection}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        ) : (
          <button
            className={styles.addPhoneNumber}
            onClick={handleAddPhoneNumber}
          >
            + Add an additional phone number
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalContactsView;
