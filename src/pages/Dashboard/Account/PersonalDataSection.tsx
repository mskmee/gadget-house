import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './MyAccount.module.scss';

import { ChangeUserData } from '@/assets/icons/ChangeUserData';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const PersonalDataSection = () => {
  const [isOpenPersonalDatesSection, setIsOpenPersonalDatesSection] =
    useState(false);
  const { user: currentUser } = useTypedSelector((state) => state.auth);

  const [personalData, setPersonalData] = useState({
    fullName: currentUser?.fullName || '',
    date: {
      day: currentUser?.day || '',
      month: currentUser?.month || '',
      year: currentUser?.year || '',
    },
    city: currentUser?.city || '',
    gender: currentUser?.gender || '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    date: '',
    city: '',
    gender: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));

    if (value.length >= 40 && name === 'fullName') {
      setErrors({ ...errors, fullName: 'Max length: 40 letters' });
    } else if (value.length >= 30 && name === 'city') {
      setErrors({ ...errors, city: 'Max length: 30 letters' });
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'day' | 'month' | 'year',
  ) => {
    const value = e.target.value
      .replace(/\D/g, '')
      .slice(0, field === 'year' ? 4 : 2);
    setPersonalData((prev) => ({
      ...prev,
      date: { ...prev.date, [field]: value },
    }));

    setErrors((prev) => ({ ...prev, date: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: '', date: '', city: '', gender: '' };

    // Full Name Validation
    if (!personalData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (personalData.fullName.length > 39) {
      newErrors.fullName = 'Max length: 40 letters';
      isValid = false;
    }

    // Date Validation
    const { day, month, year } = personalData.date;
    const dayNum = Number(day) || 0;
    const monthNum = Number(month) || 0;
    const yearNum = Number(year) || 0;
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const maxYear = currentYear - 18;

    if (!day || !month || !year) {
      newErrors.date = 'Birthday is required';
      isValid = false;
    } else if (dayNum > 31) {
      newErrors.date = 'Enter please correct day';
      isValid = false;
    } else if (monthNum > 12) {
      newErrors.date = 'Enter please correct month';
      isValid = false;
    } else if (yearNum < minYear) {
      newErrors.date = `Enter year greater than ${minYear}`;
      isValid = false;
    } else if (yearNum > maxYear) {
      newErrors.date = `Enter year less than ${maxYear}`;
      isValid = false;
    } else {
      // Validate days per month (including leap years)
      const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      if (dayNum > daysInMonth) {
        newErrors.date = `Invalid day for the selected month`;
        isValid = false;
      }
    }

    // City Validation
    if (!personalData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    } else if (personalData.city.length > 29) {
      newErrors.city = 'Max length: 30 letters';
      isValid = false;
    }

    // Gender Validation
    if (!personalData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSavePersonalDates = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setPersonalData({
        fullName: '',
        date: { day: '', month: '', year: '' },
        city: '',
        gender: '',
      });
    }
  };

  const handleClosePersonalDatesSection = () => {
    setPersonalData({
      fullName: '',
      date: { day: '', month: '', year: '' },
      city: '',
      gender: '',
    });
    setErrors({
      fullName: '',
      date: '',
      city: '',
      gender: '',
    });
    setIsOpenPersonalDatesSection(false);
  };

  return (
    <>
      {isOpenPersonalDatesSection ? (
        <form
          className={styles.personalDataWrap}
          onSubmit={handleSavePersonalDates}
        >
          <div className={styles.personalDataTitle}>
            <h3>Personal data</h3>
          </div>

          <div className={styles.personalDatesChangeSection}>
            <div>
              <span>Full name*</span>
              <div>
                <input
                  name="fullName"
                  placeholder={currentUser?.fullName || 'Full name*'}
                  minLength={2}
                  maxLength={40}
                  value={currentUser?.fullName}
                  onChange={handleInputChange}
                />
              </div>
              {errors.fullName && (
                <div className={styles.inputError}>
                  <ErrorIcon />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            <div>
              <span>Birthday*</span>
              <div>
                <input
                  type="text"
                  placeholder="12"
                  maxLength={2}
                  value={personalData.date.day}
                  onChange={(e) => handleDateChange(e, 'day')}
                />
                <input
                  type="text"
                  placeholder="03"
                  maxLength={2}
                  value={personalData.date.month}
                  onChange={(e) => handleDateChange(e, 'month')}
                />
                <input
                  type="text"
                  placeholder="1994"
                  maxLength={4}
                  value={personalData.date.year}
                  onChange={(e) => handleDateChange(e, 'year')}
                />
              </div>
              {errors.date && (
                <div className={styles.inputError}>
                  <ErrorIcon />
                  <span>{errors.date}</span>
                </div>
              )}
            </div>

            <div>
              <span>City*</span>
              <div>
                <input
                  name="city"
                  placeholder="Kharkiv"
                  minLength={2}
                  maxLength={30}
                  value={personalData.city}
                  onChange={handleInputChange}
                />
              </div>
              {errors.city && (
                <div className={styles.inputError}>
                  <ErrorIcon />
                  <span>{errors.city}</span>
                </div>
              )}
            </div>

            <div>
              <span>Sex*</span>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={personalData.gender === 'male'}
                    onChange={handleInputChange}
                  />{' '}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={personalData.gender === 'female'}
                    onChange={handleInputChange}
                  />{' '}
                  Female
                </label>
              </div>
              {errors.gender && (
                <div className={styles.inputError}>
                  <ErrorIcon />
                  <span>{errors.gender}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.buttonsSection}>
            <button type="button" onClick={handleClosePersonalDatesSection}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      ) : (
        <div className={styles.personalDataWrap}>
          <div className={styles.personalDataTitle}>
            <h3>Personal data</h3>
            <span onClick={() => setIsOpenPersonalDatesSection(true)}>
              <ChangeUserData />
            </span>
          </div>
          <div className={styles.personalDates}>
            <div>
              <span>Full name</span>
              <span style={{ textTransform: 'capitalize' }}>
                {personalData.fullName}
              </span>
            </div>
            <div>
              <span>Birthday</span>
              <span>
                {personalData.date.day}.{personalData.date.month}.
                {personalData.date.year}
              </span>
            </div>
            <div>
              <span>City</span>
              <span>{personalData.city}</span>
            </div>
            <div>
              <span>Sex</span>
              <span>{personalData.gender}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
