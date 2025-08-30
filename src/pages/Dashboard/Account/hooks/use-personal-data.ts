import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IMappedUser, mapDtoToUser } from '@/utils/packages/auth/mappers';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { updateUserPersonalData } from '@/store/auth/actions';

export type PersonalData = {
  fullName: string;
  city: string;
  gender: string;
  date: {
    day: string | number;
    month: string | number;
    year: string | number;
  };
};

const usePersonalData = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user: currentUser } = useTypedSelector((state) => state.auth);
  const mappedUser: IMappedUser = useMemo(() => {
    return currentUser
      ? mapDtoToUser(currentUser)
      : {
          fullName: '',
          city: '',
          gender: '',
          day: '',
          month: '',
          year: '',
        };
  }, [currentUser]);

  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: mappedUser?.fullName ?? '',
    date: {
      day: mappedUser?.day ?? '',
      month: mappedUser?.month ?? '',
      year: mappedUser?.year ?? '',
    },
    city: mappedUser?.city ?? '',
    gender: mappedUser?.gender ?? '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    date: '',
    city: '',
    gender: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (mappedUser) {
      setPersonalData({
        fullName: mappedUser.fullName ?? '',
        date: {
          day: mappedUser.day ?? '',
          month: mappedUser.month ?? '',
          year: mappedUser.year ?? '',
        },
        city: mappedUser.city ?? '',
        gender: mappedUser.gender ?? '',
      });
    }
  }, [mappedUser]);

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
    } else if (dayNum > 31 || day === '0' || day === '00') {
      newErrors.date = 'Enter please correct day';
      isValid = false;
    } else if (monthNum > 12 || month === '0' || month === '00') {
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

  const handleSavePersonalData = async (e: FormEvent) => {
    e.preventDefault();
    const birthdate = new Date(
      Number(personalData.date.year),
      Number(personalData.date.month) - 1,
      Number(personalData.date.day),
    ).toISOString();
    const data = {
      fullName: personalData.fullName,
      city: personalData.city,
      gender: personalData.gender,
      birthdate,
    };
    if (validateForm()) {
      try {
        await dispatch(updateUserPersonalData(data));

        console.log('SUCCESS UPDATING USER PERSONAL DATA');

        setIsEditing(false);
      } catch (e) {
        console.log('ERROR UPDATING USER PERSONAL DATA: ', e);
      }
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setPersonalData({
      fullName: mappedUser.fullName,
      date: {
        day: mappedUser.day ?? '',
        month: mappedUser.month ?? '',
        year: mappedUser.year ?? '',
      },
      city: mappedUser.city ?? '',
      gender: mappedUser.gender ?? '',
    });
    setErrors({
      fullName: '',
      date: '',
      city: '',
      gender: '',
    });
    setIsEditing(false);
  };
  return {
    personalData,
    errors,
    currentUser,
    handleInputChange,
    handleDateChange,
    handleSavePersonalData,
    handleCancelEditing,
    handleStartEditing,
    isEditing,
  };
};

export default usePersonalData;
