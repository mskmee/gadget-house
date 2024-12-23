import { FC } from 'react';
import { ContactsFormDto } from '../../types/types';
import { OrderStage } from '../../enums/enums';
import { Formik, Form } from 'formik';
import { FormInput } from '@/components/components';
import { contactsFormValidationSchema } from '../../validation-schemas/validation-schemas';

type Properties = {
  initialValues: ContactsFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: ContactsFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', gap: 15 }}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export const ContactsForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const isActive = stage === OrderStage.CONTACTS;
  if (!isActive) {
    return (
      <>
        {Object.entries(initialValues).map(([key, value]) => (
          <LineValue key={key} label={key} value={value} />
        ))}
      </>
    );
  }

  return (
    <div>
      <h2>Contacts form</h2>
      <Formik<ContactsFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={contactsFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form>
          <FormInput<ContactsFormDto>
            name="fullName"
            type="text"
            label="Full name"
          />
          <FormInput<ContactsFormDto> name="email" type="text" label="Email" />
          <FormInput<ContactsFormDto> name="phone" type="text" label="Phone" />
          <FormInput<ContactsFormDto>
            name="comment"
            type="textarea"
            label="Comment"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
