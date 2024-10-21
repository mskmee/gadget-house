import { useState } from 'react';
import { Drawer, Row, Col, Slider, InputNumber } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';

import { IFilterProps } from '@/interfaces/interfaces';
import { Header } from '../components';
import { Option } from './Option';
import CloseSvg from '@/assets/icons/close.svg';

import styles from './filters.module.scss';

export const FiltersMobile = ({
  filters,
  drawerVisible,
  toggleDrawer,
  onFilter,
}: IFilterProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<number[]>([11770, 65500]);
  const [minPrice, setMinPrice] = useState<number>(11770);
  const [maxPrice, setMaxPrice] = useState<number>(65500);
  const [minMP, setMinMP] = useState<number>(5);
  const [maxMP, setMaxMP] = useState<number>(220);

  // Обработчик опций (чекбоксов)
  const handleOptionChange = (optionKey: string, value: string) => {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      if (!newOptions[optionKey]) newOptions[optionKey] = [];
      if (newOptions[optionKey].includes(value)) {
        newOptions[optionKey] = newOptions[optionKey].filter(
          (v) => v !== value,
        );
      } else {
        newOptions[optionKey].push(value);
      }
      return newOptions;
    });
  };

  // Обновление диапазона цен через Slider
  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  // Обновление минимальной цены через InputNumber
  const handleMinPriceChange = (value: number | null) => {
    if (value !== null) {
      setMinPrice(value);
      setPriceRange([value, maxPrice]);
    }
  };

  // Обновление максимальной цены через InputNumber
  const handleMaxPriceChange = (value: number | null) => {
    if (value !== null) {
      setMaxPrice(value);
      setPriceRange([minPrice, value]);
    }
  };

  const handleMinMPChange = (value: number | null) => {
    if (value !== null) {
      setMinMP(value);
    }
  };

  const handleMaxMPChange = (value: number | null) => {
    if (value !== null) {
      setMaxMP(value);
    }
  };

  // Применение фильтра
  const applyFilter = () => {
    onFilter(selectedOptions, priceRange, minMP, maxMP);
    toggleDrawer();
  };

  const drawerStyles: DrawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
    body: {
      background: '#f8f7fa',
      overflowY: 'auto',
    },
    header: {
      marginBottom: '7px',
      padding: '0',
      borderBottom: 'none',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
      background: 'white',
    },
  };

  return (
    <Drawer
      title={<Header />}
      placement="left"
      closable={false}
      onClose={toggleDrawer}
      width={390}
      visible={drawerVisible}
      className={styles.filtersMobile__drawer}
      styles={drawerStyles}
    >
      <h2
        style={{
          position: 'relative',
          marginBottom: '24px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          color: '#1c1817',
        }}
      >
        Filters
        <button
          className={styles.filtersMobile__drawerBtnClose}
          onClick={toggleDrawer}
        >
          <img src={CloseSvg} alt="Icon Close" />
        </button>
      </h2>

      <div className={styles.filters__wrapper}>
        {/* Price Range */}
        <Col span={24} className={styles.filters__option}>
          <h4 className={styles.filters__optionName}>Price Range</h4>
          <Slider
            range
            min={1000}
            max={100000}
            value={priceRange}
            onChange={handleSliderChange}
            className={styles.filters__sliderRange}
          />

          <Row gutter={16}>
            <Col span={12}>
              <span className={styles.filters__priceText}>From</span>
              <InputNumber
                min={1000}
                max={99900}
                value={minPrice}
                controls={false}
                onChange={handleMinPriceChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>

            <Col span={12}>
              <span className={styles.filters__priceText}>To</span>
              <InputNumber
                min={1100}
                max={100000}
                value={maxPrice}
                controls={false}
                onChange={handleMaxPriceChange}
                style={{
                  width: '72px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>
          </Row>
        </Col>

        {/* Brands */}
        {filters.brands && (
          <Option
            data={filters.brands ?? []}
            option="brands"
            title="Brands"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}

        {/* Built-in Memory */}
        {filters.builtInMemory && (
          <Option
            data={filters.builtInMemory ?? []}
            title="Built-in Memory"
            option="builtInMemory"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* RAM */}
        {filters.rams && (
          <Option
            data={filters.rams ?? []}
            title="RAM"
            option="rams"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* Separate Memory Slot */}
        <Option
          data={['Yes', 'No']}
          title="Separate Memory Slot"
          option="memorySlot"
          btnMore={false}
          optionChange={handleOptionChange}
        />

        {/* Color */}
        {filters.colors && (
          <Option
            data={filters.colors}
            title="Color"
            option="colors"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}

        {/* Main Camera */}
        <div className={styles.filters__option}>
          <h4 className={styles.filters__optionName}>Main Camera, MP</h4>
          <Row gutter={16}>
            <Col span={12} className={styles.filters__camera}>
              <span className={styles.filters__priceText}>From</span>
              <InputNumber
                min={1}
                max={643}
                value={minMP}
                defaultValue={0}
                controls={false}
                onChange={handleMinMPChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                  textAlign: 'center',
                }}
              />
            </Col>
            <Col span={12} className={styles.filters__camera}>
              <span className={styles.filters__priceText}>To</span>
              <InputNumber
                min={2}
                max={644}
                value={maxMP}
                defaultValue={0}
                controls={false}
                onChange={handleMaxMPChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                  textAlign: 'center',
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Number of Cores */}
        {filters.cores && (
          <Option
            data={filters.cores}
            title="Number of Cores"
            option="cores"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* Screen Type */}
        {filters.screens && (
          <Option
            data={filters.screens}
            title="Screen Type"
            option="screens"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}
      </div>

      <button
        className={styles.filters__apply}
        type="submit"
        onClick={applyFilter}
        disabled={!selectedOptions}
      >
        Apply
      </button>
    </Drawer>
  );
};
