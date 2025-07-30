/* eslint-disable no-unused-vars */

import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import { PersonalData } from '@/pages/Dashboard/Account/hooks/use-personal-data';
import React from 'react';

type PersonalDataFormProps = {
  personalData: PersonalData;
  errors: {
    fullName: string;
    date: string;
    city: string;
    gender: string;
  };
  currentUser: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'day' | 'month' | 'year',
  ) => void;
  onSumbit: (e: React.FormEvent) => void;
  onCancel: () => void;
  styles: {
    [key: string]: string;
  };
};

const PersonalDataForm = ({
  handleInputChange,
  personalData,
  onSumbit,
  errors,
  currentUser,
  handleDateChange,
  onCancel,
  styles,
}: PersonalDataFormProps) => {
  return (
    <form className={styles.personalDataWrap} onSubmit={onSumbit}>
      <div className={styles.personalDataTitle}>
        <h3>Personal data</h3>
      </div>

      <div className={styles.personalDatesChangeSection}>
        <div>
          <span>
            Full name<span className={styles.asterisk}>*</span>
          </span>
          <div>
            <input
              name="fullName"
              placeholder={currentUser?.fullName || 'Full name*'}
              minLength={2}
              maxLength={40}
              value={personalData?.fullName}
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
          <span>
            Birthday<span className={styles.asterisk}>*</span>
          </span>
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
          <span>
            City<span className={styles.asterisk}>*</span>
          </span>
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
          <span>
            Sex<span className={styles.asterisk}>*</span>
          </span>
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default PersonalDataForm;
