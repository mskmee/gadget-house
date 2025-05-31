import { Checkbox, CheckboxProps } from 'antd';

import styles from '../../styles/admin-page.module.scss';

interface AdminTableHeaderProps {
  isAllChecked: boolean;
  hasIndeterminate: boolean;
  onCheckAll: CheckboxProps['onChange'];
}

export const AdminTableHeader = ({
  isAllChecked,
  hasIndeterminate,
  onCheckAll,
}: AdminTableHeaderProps) => {
  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            className={styles.admin__tableWrapperCheckbox}
            checked={isAllChecked}
            indeterminate={hasIndeterminate}
            onChange={onCheckAll}
          />{' '}
          Invoice
        </th>
        <th>Customers</th>
        <th>Status</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
  );
};
