import React, { useMemo, useState } from 'react';
import { Row, Col, InputNumber, Slider } from 'antd';
import cn from 'classnames';

import { checkKeydownEvent } from '@/utils/helpers/checkKeydownEvent';
import { IProduct } from '@/interfaces/interfaces';
import { filters, smartData } from './consts';
import { Option } from './Option';

import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './filters.module.scss';

export const FiltersDesk = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<number[]>([11770, 65500]);
  const [, setFilteredProducts] = useState<IProduct[]>([]);
  const [minPrice, setMinPrice] = useState<number>(11770);
  const [maxPrice, setMaxPrice] = useState<number>(65500);
  const [minCameraMP, setMinMP] = useState<number>(0);
  const [maxCameraMP, setMaxMP] = useState<number>(0);
  const [showCategory, setShowCategory] = useState(true);

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

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

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (value: number | null) => {
    if (value) {
      setMinPrice(value);
      setPriceRange([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (value: number | null) => {
    if (value) {
      setMaxPrice(value);
      setPriceRange([minPrice, value]);
    }
  };

  const handleMinMPChange = (value: number | null) => {
    if (value) {
      setMinMP(value);
    }
  };

  const handleMaxMPChange = (value: number | null) => {
    if (value) {
      setMaxMP(value);
    }
  };

  const filteredProducts = useMemo(() => {
    return smartData.filter((product: IProduct) => {
      let isMatch = true;

      // Фильтр по диапазону цен
      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        isMatch = product.price >= minPrice && product.price <= maxPrice;
      }

      // Фильтр по мегапикселям камеры
      if (minCameraMP && maxCameraMP) {
        isMatch =
          isMatch &&
          product.cameraMP >= minCameraMP &&
          product.cameraMP <= maxCameraMP;
      }

      // Фильтр по выбранным опциям
      if (Object.keys(selectedOptions).length > 0 && product.options) {
        Object.keys(selectedOptions).forEach((optionKey) => {
          if (selectedOptions[optionKey].length > 0) {
            const productOption = product.options?.[optionKey];
            if (productOption) {
              isMatch =
                isMatch &&
                selectedOptions[optionKey].some((value) =>
                  productOption.includes(value),
                );
            }
          }
        });
      }

      return isMatch;
    });
  }, [selectedOptions, priceRange, minCameraMP, maxCameraMP]);

  const handleFilter = () => setFilteredProducts(filteredProducts);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!checkKeydownEvent(event.key)) {
      event.preventDefault();
    }
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
                  onChange={handleMinPriceChange}
                  inputMode="numeric"
                  stringMode={false}
                  onKeyDown={handleKeyDown}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    width: '75px',
                    border: '1px solid #1c1817',
                    borderRadius: '10px',
                    padding: '4px 0px',
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
                  min={51}
                  max={100000}
                  maxLength={6}
                  value={maxPrice}
                  controls={false}
                  onChange={handleMaxPriceChange}
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
              data={filters.brands ?? []}
              option="brands"
              title="Brand"
              btnMore={true}
              optionChange={handleOptionChange}
            />
          )}

          {filters.builtInMemory && (
            <Option
              data={filters.builtInMemory ?? []}
              title="Built-in memory"
              option="builtInMemory"
              btnMore={true}
              optionChange={handleOptionChange}
            />
          )}

          {filters.rams && (
            <Option
              data={filters.rams ?? []}
              title="RAM"
              option="rams"
              btnMore={true}
              optionChange={handleOptionChange}
            />
          )}

          <Option
            data={['Yes', 'No']}
            title="Separate slot for&nbsp;memory"
            option="memorySlot"
            btnMore={false}
            optionChange={handleOptionChange}
          />

          {filters.colors && (
            <Option
              data={filters.colors}
              title="Color"
              option="colors"
              btnMore={true}
              optionChange={handleOptionChange}
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
                    max={644}
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
              data={filters.cores}
              title="Number of cores"
              option="cores"
              btnMore={false}
              optionChange={handleOptionChange}
            />
          )}

          {filters.screens && (
            <Option
              data={filters.screens}
              title="Screen type"
              option="screens"
              btnMore={true}
              optionChange={handleOptionChange}
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
