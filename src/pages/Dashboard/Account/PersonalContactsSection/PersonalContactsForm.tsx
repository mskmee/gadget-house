/* eslint-disable no-unused-vars */

import React from 'react';
import { Errors, PersonalContacts } from '../hooks/use-personal-contacts';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import classNames from 'classnames';

type PersonalContactsFormProps = {
  contacts: PersonalContacts;
  handleSaveContacts: (
    e: React.FormEvent<HTMLFormElement>,
    isOnlyAdditionalNumber?: boolean,
  ) => void;
  handleCloseAddPhoneNumberSection: () => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPhoneNumber: () => void;
  errors: Errors;
  styles: {
    [key: string]: string;
  };
  handlePhoneNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  isOpenAddPhoneNumberSection: boolean;
};

const PersonalContactsForm = ({
  styles,
  handleSaveContacts,
  handleCloseAddPhoneNumberSection,
  contacts,
  handleEmailChange,
  handleAddPhoneNumber,
  errors,
  handlePhoneNumberChange,
  isOpenAddPhoneNumberSection,
}: PersonalContactsFormProps) => {
  return (
    <div className={styles.personalContactWrap}>
      <div className={styles.personalContactTitle}>
        <h3>Contacts</h3>
      </div>

      <form className={styles.personalContacts} onSubmit={handleSaveContacts}>
        <div className={styles.personalContactChangeSection}>
          <div>
            <span>
              E-mail<span className={styles.asterisk}>*</span>
            </span>
            <div>
              <input
                name="email"
                type="email"
                value={contacts.email}
                placeholder="example@gmail.com"
                minLength={2}
                maxLength={50}
                onChange={handleEmailChange}
                className={classNames({
                  [styles.errorInput]: errors.email,
                })}
              />
            </div>
            {errors.email && (
              <div className={styles.errorMessage}>
                <ErrorIcon />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
          <div>
            <span>
              Phone number<span className={styles.asterisk}>*</span>
            </span>
            <div>
              <input
                name="defaultNumber"
                placeholder="+38 (063)-777-77-77"
                minLength={2}
                maxLength={19}
                value={
                  contacts.defaultNumber.length > 4
                    ? contacts.defaultNumber
                    : ''
                }
                onChange={(e) => handlePhoneNumberChange(e, 'defaultNumber')}
                className={classNames({
                  [styles.errorInput]: errors.defaultNumber,
                })}
              />
            </div>
            {errors.defaultNumber && (
              <div className={styles.errorMessage}>
                <ErrorIcon />
                <span>{errors.defaultNumber}</span>
              </div>
            )}
          </div>
        </div>
        {isOpenAddPhoneNumberSection ? (
          <div className={styles.addPhoneNumberSection}>
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
                className={classNames({
                  [styles.errorInput]: errors.additionalNumber,
                })}
              />
              {errors.additionalNumber && (
                <div className={styles.errorMessage}>
                  <ErrorIcon />
                  <span>{errors.additionalNumber}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className={styles.addPhoneNumber}
            onClick={handleAddPhoneNumber}
          >
            + Add an additional phone number
          </button>
        )}

        <div className={styles.buttonsSection}>
          <button onClick={handleCloseAddPhoneNumberSection}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalContactsForm;
