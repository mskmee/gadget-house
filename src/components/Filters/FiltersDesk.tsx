import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, InputNumber, Slider } from 'antd';
import cn from 'classnames';

import { filters } from './consts';
import { AppDispatch } from '@/store';
import {
  setSelectedAttributes,
  setSelectedBrands,
  setSelectedCameraRange,
  setSelectedPriceRange,
} from '@/store/filters/filters_slice';
import { useRangeFilter } from './hooks/useRangeFilter';
import { checkKeydownEvent } from '@/utils/helpers/checkKeydownEvent';
import { Option } from './Option';

import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './filters.module.scss';

export const FiltersDesk = () => {
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
    minValue: minCameraMP,
    maxValue: maxCameraMP,
    handleMinChange: handleMinMPChange,
    handleMaxChange: handleMaxMPChange,
  } = useRangeFilter(0, 0);
  const [showCategory, setShowCategory] = useState(true);

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

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    handleMinPriceChange(value[0]);
    handleMaxPriceChange(value[1]);
  };

  const handleFilter = () => {
    dispatch(setSelectedBrands(selectedOptions.brands));
    dispatch(
      setSelectedAttributes([
        ...(selectedOptions.screens || []),
        ...(selectedOptions.builtInMemory || []),
        ...(selectedOptions.colors || []),
        ...(selectedOptions.rams || []),
        ...(selectedOptions.cores || []),
        ...(selectedOptions.memorySlot || []),
      ]),
    );
    dispatch(setSelectedPriceRange(priceRange));
    dispatch(setSelectedCameraRange([minCameraMP, maxCameraMP]));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!checkKeydownEvent(event.key)) {
      event.preventDefault();
    }
  };

  const handleFilterChange = (filterKey: string, checkedValues: string[]) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [filterKey]: checkedValues.length ? checkedValues : [],
    }));
  };

  return (
    <aside className={styles.filtersDesk}>
      <div className={styles.filtersDesk__wrapper}>
        <h2 className={styles.filtersDesk__title}>Filters</h2>

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
              <Col span={13} style={{ paddingLeft: '6px' }}>
                <span className={styles.filters__priceText}>From</span>
                <InputNumber
                  min={0}
                  max={99999}
                  maxLength={5}
                  value={minPrice}
                  controls={false}
                  onChange={onMinInputChange}
                  inputMode="numeric"
                  stringMode={false}
                  onKeyDown={handleKeyDown}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    width: '75px',
                    height: '40px',
                    border: '1px solid #1c1817',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    fontSize: '16px',
                    color: '#1c1817',
                    textAlign: 'center',
                  }}
                />
                <span className={styles.filters__priceCurrency}>₴</span>
              </Col>

              <Col span={11} style={{ paddingLeft: '0px' }}>
                <span className={styles.filters__priceText}>To</span>
                <InputNumber
                  min={0}
                  max={100000}
                  maxLength={6}
                  value={maxPrice}
                  controls={false}
                  onChange={onMaxInputChange}
                  inputMode="numeric"
                  stringMode={false}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: '75px',
                    height: '40px',
                    border: '1px solid #1c1817',
                    borderRadius: '10px',
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

          {filters.fleshCard && (
            <Option
              options={filters.fleshCard ?? []}
              title="Separate slot for&nbsp;memory"
              filterKey="memorySlot"
              selectedOptions={selectedOptions}
              onOptionChange={handleFilterChange}
            />
          )}

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
                    min={0}
                    max={643}
                    maxLength={3}
                    value={minCameraMP}
                    defaultValue={0}
                    controls={false}
                    onChange={handleMinMPChange}
                    inputMode="numeric"
                    stringMode={false}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: '74px',
                      height: '40px',
                      border: '1px solid #1c1817',
                      borderRadius: '10px',
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
                    min={0}
                    max={644}
                    maxLength={3}
                    value={maxCameraMP}
                    defaultValue={0}
                    controls={false}
                    onChange={handleMaxMPChange}
                    inputMode="numeric"
                    stringMode={false}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: '74px',
                      height: '40px',
                      border: '1px solid #1c1817',
                      borderRadius: '10px',
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
              filterKey="screenType"
              selectedOptions={selectedOptions}
              onOptionChange={handleFilterChange}
            />
          )}
        </div>

        <button
          className={styles.filters__apply}
          type="submit"
          onClick={() => handleFilter()}
          disabled={!selectedOptions}
        >
          Apply
        </button>
      </div>
    </aside>
  );
};
