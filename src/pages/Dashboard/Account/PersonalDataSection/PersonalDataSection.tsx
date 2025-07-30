import styles from '../MyAccount.module.scss';
import usePersonalData from '@/pages/Dashboard/Account/hooks/use-personal-data';
import PersonalDataForm from './PersonalDataForm';
import PersonalDataView from './PersonalDataView';

export const PersonalDataSection = () => {
  const {
    personalData,
    errors,
    currentUser,
    handleInputChange,
    handleDateChange,
    handleSavePersonalData,
    handleCancelEditing,
    handleStartEditing,
    isEditing,
  } = usePersonalData();

  return (
    <>
      {isEditing ? (
        <PersonalDataForm
          personalData={personalData}
          errors={errors}
          currentUser={currentUser}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          onSumbit={handleSavePersonalData}
          onCancel={handleCancelEditing}
          styles={styles}
        />
      ) : (
        <PersonalDataView
          styles={styles}
          personalData={personalData}
          handleStartEditing={handleStartEditing}
        />
      )}
    </>
  );
};
