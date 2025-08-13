/* eslint-disable no-unused-vars */

import { ErrorIcon } from '@/assets/icons/ErrorIcon';
import { PersonalData } from '@/pages/Dashboard/Account/hooks/use-personal-data';
import classNames from 'classnames';
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
              className={classNames({
                [styles.errorInput]: errors.fullName,
              })}
            />
          </div>
          {errors.fullName && (
            <div className={styles.errorMessage}>
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
              className={classNames({
                [styles.errorInput]: errors.date,
              })}
            />
            <input
              type="text"
              placeholder="03"
              maxLength={2}
              value={personalData.date.month}
              onChange={(e) => handleDateChange(e, 'month')}
              className={classNames({
                [styles.errorInput]: errors.date,
              })}
            />
            <input
              type="text"
              placeholder="1994"
              maxLength={4}
              value={personalData.date.year}
              onChange={(e) => handleDateChange(e, 'year')}
              className={classNames({
                [styles.errorInput]: errors.date,
              })}
            />
          </div>
          {errors.date && (
            <div className={styles.errorMessage}>
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
              className={classNames({
                [styles.errorInput]: errors.city,
              })}
            />
          </div>
          {errors.city && (
            <div className={styles.errorMessage}>
              <ErrorIcon />
              <span>{errors.city}</span>
            </div>
          )}
        </div>

        <div>
          <span>
            Sex<span className={styles.asterisk}>*</span>
          </span>
          <div
            className={classNames({
              [styles.errorInput]: errors.gender,
            })}
          >
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={personalData.gender === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={personalData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <div className={styles.errorMessage}>
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
