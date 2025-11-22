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
