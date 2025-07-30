import { ChangeUserData } from '@/assets/icons/ChangeUserData';
import { PersonalData } from '@/pages/Dashboard/Account/hooks/use-personal-data';
import React from 'react';

type PersonalDataViewProps = {
  handleStartEditing: React.Dispatch<React.SetStateAction<boolean>>;
  personalData: PersonalData;
  styles: {
    [key: string]: string;
  };
};

const PersonalDataView = ({
  styles,
  personalData,
  handleStartEditing,
}: PersonalDataViewProps) => {
  return (
    <div className={styles.personalDataWrap}>
      <div className={styles.personalDataTitle}>
        <h3>Personal data</h3>
        <span onClick={() => handleStartEditing(true)}>
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
  );
};

export default PersonalDataView;
