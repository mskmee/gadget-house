import { createIconComponent } from '../icon';

export const ExitIcon = createIconComponent(
  () => import('./exit-icon.svg'),
  'exit-icon',
);

export const LeftArrow = createIconComponent(
  () => import('./arrow-left.svg'),
  'left-arrow-icon',
);

export const CalendarIcon = createIconComponent(
  () => import('./calendar-icon.svg'),
  'calendar-icon',
);

export const AddNewUserIcon = createIconComponent(
  () => import('./add-new-user.svg'),
  'add-new-user',
);

export const UkrainianFlagIcon = createIconComponent(
  () => import('./ukrainian-flag.svg'),
  'ua-flag',
);

export const CancelCrossIcon = createIconComponent(
  () => import('./cancel-cross-icon.svg'),
  'cancel-cross-icon',
);
