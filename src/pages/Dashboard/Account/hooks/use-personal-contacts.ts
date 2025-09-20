import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/store';
import { updateUserContacts } from '@/store/auth/actions';
import { formatPhoneNumber } from '@/utils/helpers/formatPhoneNumber';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export type PersonalContacts = {
  email: string;
  defaultNumber: string;
  additionalNumber: string;
};

export type Errors = {
  email: string;
  defaultNumber: string;
  additionalNumber: string;
};

const usePersonalContacts = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user: currentUser } = useTypedSelector((state) => state.auth);

  const [isOpenContactsSection, setIsOpenContactsSection] = useState(false);
  const [isOpenAddPhoneNumberSection, setIsOpenAddPhoneNumberSection] =
    useState(false);

  const [contacts, setContacts] = useState<PersonalContacts>({
    email: currentUser?.email || '',
    defaultNumber: currentUser?.phoneNumber || '',
    additionalNumber: currentUser?.secondaryPhoneNumber || '',
  });

  const [errors, setErrors] = useState({
    email: '',
    defaultNumber: '',
    additionalNumber: '',
  });

  useEffect(() => {
    if (currentUser) {
      setContacts({
        email: currentUser.email || '',
        defaultNumber: currentUser.phoneNumber
          ? formatPhoneNumber(currentUser.phoneNumber)
          : '',
        additionalNumber: currentUser.secondaryPhoneNumber
          ? formatPhoneNumber(currentUser.secondaryPhoneNumber)
          : '',
      });
    }
  }, [currentUser]);

  const handleChangeContacts = () => {
    setIsOpenContactsSection(true);
  };

  const handleAddPhoneNumber = () => {
    setIsOpenAddPhoneNumberSection(true);
  };

  const handleCloseAddPhoneNumberSection = () => {
    if (currentUser) {
      setContacts({
        email: currentUser.email ?? '',
        defaultNumber: currentUser.phoneNumber
          ? formatPhoneNumber(currentUser.phoneNumber)
          : '',
        additionalNumber: currentUser.secondaryPhoneNumber
          ? formatPhoneNumber(currentUser.secondaryPhoneNumber)
          : '',
      });
    } else {
      setContacts({ email: '', defaultNumber: '', additionalNumber: '' });
    }
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
      } else if (contacts.defaultNumber.length !== 17) {
        newErrors.defaultNumber = 'Please enter a valid phone number';
        isValid = false;
      }
    }

    // additionalNumber Validation
    if (
      contacts.additionalNumber.length > 4 &&
      contacts.additionalNumber.length !== 17 &&
      isOpenAddPhoneNumberSection
    ) {
      newErrors.additionalNumber = 'Please enter a valid phone number';
      isValid = false;
    } else if (!newErrors.email && !newErrors.defaultNumber) {
      setContacts({ ...contacts, additionalNumber: '' });
      newErrors.additionalNumber = '';
      isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveContacts = async (
    e: FormEvent,
    isOnlyAdditionalNumber = false,
  ) => {
    e.preventDefault();
    if (validateForm(isOnlyAdditionalNumber)) {
      const cleanNumber = (num: string) => num.replace(/\D/g, '');
      const data = {
        email: contacts.email,
        phoneNumber: `+${cleanNumber(contacts.defaultNumber)}`,
        secondaryPhoneNumber: contacts.additionalNumber
          ? `+${cleanNumber(contacts.additionalNumber)}`
          : '',
      };

      try {
        await dispatch(updateUserContacts(data));
        setIsOpenContactsSection(false);
        setIsOpenAddPhoneNumberSection(false);
      } catch (e) {
        console.log(e);
      }
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
  return {
    handleChangeContacts,
    handleAddPhoneNumber,
    handleCloseAddPhoneNumberSection,
    handleEmailChange,
    handlePhoneNumberChange,
    handleSaveContacts,
    contacts,
    errors,

    isOpenContactsSection,
    isOpenAddPhoneNumberSection,
  };
};

export default usePersonalContacts;
