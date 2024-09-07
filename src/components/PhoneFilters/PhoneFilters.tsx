import { useState } from 'react';
import Filter from '@/components/Filter/Filter';
import FilterWrapper from '@/components/FilterWrapper/FilterWrapper';
import { Divider } from 'antd';
import { Radio, Space } from 'antd';
import { COLORS } from '@/constants/generateFakeData.constants';
import { getCheckboxVariants } from '@/utils/getCheckboxVariants.utils';
import type { RadioChangeEvent } from 'antd';
import type { PhoneFiltersProps } from '@/types/catalog.types';
import styles from './PhoneFilters.module.scss';

export default function PhoneFilters({ paginatedPhones }: PhoneFiltersProps) {
  const [hasSeparateMemory, setHasSeparateMemory] = useState<boolean | null>(
    null,
  );

  const onChange = (e: RadioChangeEvent) => {
    setHasSeparateMemory(e.target.value);
  };

  const ram = getCheckboxVariants(paginatedPhones, 'ram');
  const brans = getCheckboxVariants(paginatedPhones, 'brand');
  const cores = getCheckboxVariants(paginatedPhones, 'cores');
  const memory = getCheckboxVariants(paginatedPhones, 'memory');

  return (
    <div className={styles.container}>
      <h2>Filters</h2>
      <Divider className={styles.divider} />
      <h3>Price</h3>
      <Divider className={styles.divider} />
      <Filter title="Brand" options={brans} handleChange={() => {}} />
      <Divider className={styles.divider} />
      <Filter
        title="Built-in memory"
        options={memory}
        handleChange={() => {}}
        afterOption={<span className={styles.afterOption}>GB</span>}
      />
      <Divider className={styles.divider} />
      <Filter
        title="RAM"
        options={ram}
        handleChange={() => {}}
        afterOption={<span className={styles.afterOption}>GB</span>}
      />
      <Divider className={styles.divider} />
      <FilterWrapper title="Separate slot for memory">
        <Radio.Group onChange={onChange} value={hasSeparateMemory}>
          <Space direction="vertical">
            <Radio value={true}>
              <span className={styles.label}>Yes</span>
            </Radio>
            <Radio value={false}>
              <span className={styles.label}>No</span>
            </Radio>
          </Space>
        </Radio.Group>
      </FilterWrapper>
      <Divider className={styles.divider} />
      <Filter hasColor title="Color" options={COLORS} handleChange={() => {}} />
      <Divider className={styles.divider} />
      <h3>Main camera, MP</h3>
      <Divider className={styles.divider} />
      <Filter
        title="Number of cores"
        options={cores}
        handleChange={() => {}}
        afterOption={<span className={styles.afterOption}>cores</span>}
      />
      <Divider className={styles.divider} />
      <h3>Screen type</h3>
      <Divider className={styles.divider} />
    </div>
  );
}
