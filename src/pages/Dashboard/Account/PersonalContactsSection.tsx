import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './MyAccount.module.scss';
import { ChangeUserData } from '@/assets/icons/ChangeUserData';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export type TContacts = {
  email: string;
  defaultNumber: string;
  additionalNumber: string;
};

const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, '');

  if (!value.startsWith('38')) {
    value = '38' + value;
  }

  // Limit the length of the value to 12 digits (for '+38 (xxx) xxx-xx-xx' format)
  value = value.slice(0, 12);

  let formattedValue = '+38 ';
  if (value.length > 2) formattedValue += `(${value.slice(2, 5)})`;
  if (value.length > 5) formattedValue += `-${value.slice(5, 8)}`;
  if (value.length > 8) formattedValue += `-${value.slice(8, 10)}`;
  if (value.length > 10) formattedValue += `-${value.slice(10, 12)}`;

  if (formattedValue.length === 4) {
    formattedValue = '';
  }

  return formattedValue;
};

export const PersonalContactsSection = () => {
  const [isOpenContactsSection, setIsOpenContactsSection] = useState(false);
  const [isOpenAddPhoneNumberSection, setIsOpenAddPhoneNumberSection] =
    useState(false);

  const { user: currentUser } = useTypedSelector((state) => state.auth);

  const [contacts, setContacts] = useState({
    email: currentUser?.email || '',
    defaultNumber: currentUser?.phoneNumber || '',
    additionalNumber: currentUser?.additionalPhoneNumber || '',
  });

  const [errors, setErrors] = useState({
    email: '',
    defaultNumber: '',
    additionalNumber: '',
  });

  const handleChangeContacts = () => {
    setIsOpenContactsSection(true);
  };

  const handleAddPhoneNumber = () => {
    setIsOpenAddPhoneNumberSection(true);
  };

  const handleCloseAddPhoneNumberSection = () => {
    setContacts({ email: '', defaultNumber: '', additionalNumber: '' });
    setErrors({ email: '', defaultNumber: '', additionalNumber: '' });
    setIsOpenContactsSection(false);
    setIsOpenAddPhoneNumberSection(false);
  };

  const validateForm = (isOnlyAdditionalNumber: boolean) => {
    let isValid = true;
    const newErrors = {
      email: '',
      defaultNumber: '',
      additionalNumber: '',
    };

    if (!isOnlyAdditionalNumber) {
      // Email  Validation
      if (!contacts.email.trim()) {
        newErrors.email = 'E-mail is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(contacts.email)) {
        newErrors.email = 'Enter please a valid email address';
        isValid = false;
      } else if (contacts.email.length > 49) {
        newErrors.email = 'Max length: 50 letters';
        isValid = false;
      }

      // defaultNumber Validation
      if (!contacts.defaultNumber) {
        newErrors.defaultNumber = 'Phone number is required';
        isValid = false;
      } else if (contacts.defaultNumber.length !== 19) {
        newErrors.defaultNumber = 'Enter please phone number';
        isValid = false;
      }
    }

    // additionalNumber Validation
    if (
      contacts.additionalNumber.length > 4 &&
      contacts.additionalNumber.length !== 19 &&
      isOpenAddPhoneNumberSection
    ) {
      newErrors.additionalNumber = 'Enter please phone number';
      isValid = false;
    } else if (!newErrors.email && !newErrors.defaultNumber) {
      setContacts({ ...contacts, additionalNumber: '' });
      newErrors.additionalNumber = '';
      isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveContacts = (e: FormEvent, isOnlyAdditionalNumber = false) => {
    e.preventDefault();
    if (validateForm(isOnlyAdditionalNumber)) {
      setContacts({ email: '', defaultNumber: '', additionalNumber: '' });
      console.log(contacts);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContacts({ ...contacts, email: value });

    if (value.length > 49) {
      setErrors({ ...errors, email: 'Max length: 50 letters' });
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePhoneNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const value = e.target.value;
    setContacts((prev) => ({
      ...prev,
      [field]: formatPhoneNumber(value),
    }));

    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <>
      {isOpenContactsSection ? (
        <div className={styles.personalContactWrap}>
          <div className={styles.personalContactTitle}>
            <h3>Contacts</h3>
          </div>

          <form
            className={styles.personalContacts}
            onSubmit={handleSaveContacts}
          >
            <div className={styles.personalContactChangeSection}>
              <div>
                <span>E-mail*</span>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={contacts.email}
                    placeholder="example@gmail.com"
                    minLength={2}
                    maxLength={50}
                    onChange={handleEmailChange}
                  />
                </div>
                {errors.email && (
                  <div className={styles.inputError}>
                    <ErrorIcon />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
              <div>
                <span>Phone number*</span>
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
                    onChange={(e) =>
                      handlePhoneNumberChange(e, 'defaultNumber')
                    }
                  />
                </div>
                {errors.defaultNumber && (
                  <div className={styles.inputError}>
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
                    onChange={(e) =>
                      handlePhoneNumberChange(e, 'additionalNumber')
                    }
                    maxLength={19}
                  />
                  {errors.additionalNumber && (
                    <div className={styles.inputError}>
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
      ) : (
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
              <span>+38 {contacts.defaultNumber}</span>
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
                    onChange={(e) =>
                      handlePhoneNumberChange(e, 'additionalNumber')
                    }
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
                  <button onClick={handleCloseAddPhoneNumberSection}>
                    Cancel
                  </button>
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
      )}
    </>
  );
};
