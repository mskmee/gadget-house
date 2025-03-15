import { useMemo, useState } from 'react';
import { Drawer, Row, Col, Slider, InputNumber } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import cn from 'classnames';

import { smartData } from './consts';
import { handleKeyDown } from '@/utils/helpers/checkKeydownEvent';
import { IFilterProps, IProduct } from '@/interfaces/interfaces';
import { useRangeFilter } from './hooks/useRangeFilter';
import { Header } from '../components';
import { Option } from './Option';

import CloseSvg from '@/assets/icons/close.svg';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

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
  const {
    minValue: minPrice,
    maxValue: maxPrice,
    handleMinChange: handleMinPriceChange,
    handleMaxChange: handleMaxPriceChange,
  } = useRangeFilter(11000, 65500);

  const {
    minValue: minCameraMP,
    maxValue: maxCameraMP,
    handleMinChange: handleMinMPChange,
    handleMaxChange: handleMaxMPChange,
  } = useRangeFilter(0, 0);

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
    handleMinPriceChange(value[0]);
    handleMaxPriceChange(value[1]);
  };

  const filteredProducts = useMemo(() => {
    return smartData.filter((product: IProduct) => {
      let isMatch = true;

      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        isMatch = product.price >= minPrice && product.price <= maxPrice;
      }

      if (minCameraMP && maxCameraMP) {
        isMatch =
          isMatch &&
          product.cameraMP >= minCameraMP &&
          product.cameraMP <= maxCameraMP;
      }

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

  const applyFilter = () => {
    onFilter(filteredProducts);
    toggleDrawer();
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
            min={50}
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
                onChange={handleMinPriceChange}
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
                min={50}
                max={100000}
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
          title="Separate slot for memory"
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
                  max={643}
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
        type="button"
        onClick={applyFilter}
        disabled={!selectedOptions}
      >
        Apply
      </button>
    </Drawer>
  );
};
