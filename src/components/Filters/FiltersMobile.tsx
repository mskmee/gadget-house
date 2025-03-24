import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Row, Col, Slider, InputNumber } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import cn from 'classnames';

import { IFilterProps } from '@/interfaces/interfaces';
import { AppDispatch } from '@/store';
import {
  setSelectedAttributes,
  setSelectedBrands,
  setSelectedCameraRange,
  setSelectedPriceRange,
} from '@/store/filters/filters_slice';
import { useRangeFilter } from './hooks/useRangeFilter';
import { handleKeyDown } from '@/utils/helpers/checkKeydownEvent';
import { Header } from '../components';
import { Option } from './Option';

import CloseSvg from '@/assets/icons/close.svg';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './filters.module.scss';

export const FiltersMobile = ({
  filters,
  drawerVisible,
  toggleDrawer,
}: IFilterProps) => {
  const inputMinCameraMPRef = useRef<HTMLInputElement | null>(null);
  const inputMaxCameraMPRef = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<number[]>([11770, 65500]);
  const {
    minValue: minPrice,
    maxValue: maxPrice,
    handleMinChange: handleMinPriceChange,
    handleMaxChange: handleMaxPriceChange,
  } = useRangeFilter(11770, 65500);

  const {
    minValueCamera: minCameraMP,
    maxValueCamera: maxCameraMP,
    handleMinChangeCamera: handleMinMPChange,
    handleMaxChangeCamera: handleMaxMPChange,
  } = useRangeFilter(0, 0);

  const [showCategory, setShowCategory] = useState(true);

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const onMinInputChange = (value: number | null) => {
    if (value !== null && value <= maxPrice) {
      handleMinPriceChange(value);
      setPriceRange([value, maxPrice]);
    }
  };

  const onMaxInputChange = (value: number | null) => {
    if (value !== null && value >= minPrice) {
      handleMaxPriceChange(value);
      setPriceRange([minPrice, value]);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    handleMinPriceChange(value[0]);
    handleMaxPriceChange(value[1]);
  };

  const applyFilter = () => {
    dispatch(setSelectedBrands(selectedOptions.brands));
    dispatch(setSelectedAttributes(selectedOptions.attributes));
    dispatch(setSelectedPriceRange(priceRange));
    dispatch(setSelectedCameraRange([minCameraMP, maxCameraMP]));
    toggleDrawer();
  };

  const handleFilterChange = (filterKey: string, checkedValues: string[]) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [filterKey]: checkedValues.length ? checkedValues : [],
    }));
  };

  const handleFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const drawerStyles: DrawerStyles = {
    mask: {
      backgroundColor: 'rgba(28, 24, 23, 0.7)',
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
      open={drawerVisible}
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
        <Col span={24} className={styles.filters__option}>
          <h4 className={styles.filters__optionName}>Price</h4>
          <Slider
            range
            min={0}
            max={100000}
            value={priceRange}
            onChange={handleSliderChange}
            className={styles.filters__sliderRange}
          />

          <Row gutter={16}>
            <Col span={12}>
              <span className={styles.filters__priceText}>From</span>
              <InputNumber
                type="number"
                min={0}
                max={99999}
                value={minPrice}
                controls={false}
                onChange={onMinInputChange}
                inputMode="numeric"
                stringMode={false}
                onKeyDown={handleKeyDown}
                style={{
                  width: '75px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>

            <Col span={12}>
              <span className={styles.filters__priceText}>To</span>
              <InputNumber
                type="number"
                min={0}
                max={100000}
                value={maxPrice}
                controls={false}
                onChange={onMaxInputChange}
                inputMode="numeric"
                stringMode={false}
                onKeyDown={handleKeyDown}
                style={{
                  width: '75px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>
          </Row>
        </Col>

        {filters.brands && (
          <Option
            options={filters.brands ?? []}
            filterKey="brands"
            title="Brand"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}

        {filters.builtInMemory && (
          <Option
            options={filters.builtInMemory ?? []}
            title="Built-in memory"
            filterKey="builtInMemory"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}

        {filters.rams && (
          <Option
            options={filters.rams ?? []}
            title="RAM"
            filterKey="rams"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}

        <Option
          options={['Yes', 'No']}
          title="Separate slot for memory"
          filterKey="memorySlot"
          selectedOptions={selectedOptions}
          onOptionChange={handleFilterChange}
        />

        {filters.colors && (
          <Option
            options={filters.colors}
            title="Color"
            filterKey="colors"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}

        <div className={styles.filters__option}>
          <div
            className={cn(
              styles.filters__optionHeader,
              !showCategory && styles.hide,
            )}
            onClick={toggleShowCategory}
          >
            <h4 className={styles.filters__optionName}>Main camera, MP</h4>

            <img
              src={ArrowUpSvg}
              alt="Arrow Up Icon"
              className={cn(
                styles.filters__optionArrow,
                !showCategory && styles.arrowDown,
              )}
            />
          </div>
          {showCategory && (
            <Row gutter={16}>
              <Col span={12} className={styles.filters__camera}>
                <span className={styles.filters__priceText}>From</span>
                <InputNumber
                  ref={inputMinCameraMPRef}
                  min={0}
                  max={643}
                  value={minCameraMP}
                  defaultValue={0}
                  controls={false}
                  onChange={handleMinMPChange}
                  inputMode="numeric"
                  stringMode={false}
                  onKeyDown={handleKeyDown}
                  onFocus={() => handleFocus(inputMinCameraMPRef)}
                  style={{
                    width: '74px',
                    height: '40px',
                    border: '1px solid #1c1817',
                    borderRadius: '10px',
                    padding: '1px 1px',
                    backgroundColor: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#1c1817',
                    textAlign: 'center',
                  }}
                />
              </Col>

              <Col span={12} className={styles.filters__camera}>
                <span className={styles.filters__priceText}>To</span>
                <InputNumber
                  ref={inputMaxCameraMPRef}
                  min={0}
                  max={644}
                  value={maxCameraMP}
                  defaultValue={0}
                  controls={false}
                  onChange={handleMaxMPChange}
                  inputMode="numeric"
                  stringMode={false}
                  onKeyDown={handleKeyDown}
                  onFocus={() => handleFocus(inputMaxCameraMPRef)}
                  style={{
                    width: '74px',
                    height: '40px',
                    border: '1px solid #1c1817',
                    borderRadius: '10px',
                    padding: '1px 1px',
                    backgroundColor: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#1c1817',
                    textAlign: 'center',
                  }}
                />
              </Col>
            </Row>
          )}
        </div>

        {filters.cores && (
          <Option
            options={filters.cores}
            title="Number of cores"
            filterKey="cores"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}

        {filters.screens && (
          <Option
            options={filters.screens}
            title="Screen type"
            filterKey="screens"
            selectedOptions={selectedOptions}
            onOptionChange={handleFilterChange}
          />
        )}
      </div>

      <button
        className={styles.filters__apply}
        type="button"
        onClick={applyFilter}
        disabled={!selectedOptions}
      >
        Apply
      </button>
    </Drawer>
  );
};
