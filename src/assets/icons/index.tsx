import { createIconComponent } from '../icon';

export const ExitIcon = createIconComponent(
  () => import('./exit-icon.svg'),
  'exit-icon',
);
