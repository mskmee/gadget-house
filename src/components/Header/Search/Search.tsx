import React, {
  FC,
  ChangeEvent,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useCallback,
  KeyboardEvent,
} from 'react';
import styles from './search.module.scss';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { Input } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { searchInputClear } from '@/assets/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { AppRoute, RoutePath } from '@/enums/Route';
import { INPUT_MAX_LENGTH } from './constants';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getSuggestions, searchProducts } from '@/store/products/actions';
import { clearSuggestions } from '@/store/products/products_slice';
import { DEFAULT_SIZE } from '@/constants/pagination';

interface ISearchProps {
  isOverlayActive: boolean;
  setIsOverlayActive: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<ISearchProps> = ({
  isOverlayActive,
  setIsOverlayActive,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);

  const suggestions = useTypedSelector((state) => state.products.suggestions);
  const selectedSort = useTypedSelector((state) => state.filters.selectedSort);
  const { setSearchValue, setIsGlobalOverlayActive } = useActions();

  const [searchInput, setSearchInput] = useState({
    value: '',
    hasError: false,
  });
  const [displayValue, setDisplayValue] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchInput.value.toLowerCase()),
  );
  const isSearchBarActive = filteredSuggestions.length > 0 && isOverlayActive;

  const handleSearchProducts = async (query: string) => {
    try {
      setDisplayValue('');
      const result = await dispatch(
        searchProducts({
          query,
          page: 0,
          size: DEFAULT_SIZE,
          sort: selectedSort || 'rating,desc',
        }),
      ).unwrap();
      return result;
    } catch (error) {
      console.error('Error searching products:', error);
      return null;
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && activeIndex !== 5) {
      setActiveIndex((prev) =>
        Math.min(prev + 1, filteredSuggestions.slice(0, 6).length - 1),
      );
      const newIndex = Math.min(
        activeIndex + 1,
        filteredSuggestions.slice(0, 6).length - 1,
      );
      if (filteredSuggestions[newIndex])
        setDisplayValue(filteredSuggestions[newIndex]);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      const newIndex = Math.max(activeIndex - 1, 0);
      if (filteredSuggestions[newIndex])
        setDisplayValue(filteredSuggestions[newIndex]);
    } else if (e.key === 'Enter' && searchInput.value.trim()) {
      debouncedSuggestionHandler.cancel();

      dispatch(clearSuggestions());
      setIsOverlayActive(false);
      setIsGlobalOverlayActive(false);

      let query = searchInput.value.trim();
      let isSuggestion = false;

      if (activeIndex >= 0) {
        query = filteredSuggestions[activeIndex];
        isSuggestion = true;
      }

      const result = await handleSearchProducts(query);

      if (!result?.page.length) {
        navigate(AppRoute.SEARCH_RESULTS_NOT_FOUND, {
          state: { searchInputValue: query },
        });
      } else {
        navigate(
          `${AppRoute.SEARCH_RESULTS_FOUND}/?text=${query.replace(/[\s/]/g, '-')}`,
          {
            state: { searchInputValue: query, isSuggestion },
          },
        );
      }
      setActiveIndex(-1);
      setSearchInput({ value: query, hasError: false });
    }
  };

  const onSuggestionClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    trend: string,
  ) => {
    e.preventDefault();

    debouncedSuggestionHandler.cancel();
    dispatch(clearSuggestions());
    setIsOverlayActive(false);
    setIsGlobalOverlayActive(false);

    const result = await handleSearchProducts(trend);

    if (!result?.page.length) {
      navigate(AppRoute.SEARCH_RESULTS_NOT_FOUND, {
        state: { searchInputValue: trend },
      });
    } else {
      navigate(
        `${AppRoute.SEARCH_RESULTS_FOUND}/?text=${trend.replace(/[\s/]/g, '-')}`,
        {
          state: { searchInputValue: trend, isSuggestion: true },
        },
      );
    }

    setActiveIndex(-1);
    setSearchInput({ value: trend, hasError: false });
    setDisplayValue(trend);
  };

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  const handleSuggestions = async (inputValue: string) => {
    const normalizedInput = inputValue.trim();

    if (!normalizedInput) {
      dispatch(clearSuggestions());
      return;
    }

    try {
      const result = await dispatch(getSuggestions(normalizedInput)).unwrap();

      if (result.length > 0) {
        setIsOverlayActive(true);
        setIsGlobalOverlayActive(true);
      } else {
        setIsOverlayActive(false);
        setIsGlobalOverlayActive(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setIsOverlayActive(false);
      setIsGlobalOverlayActive(false);
    }
  };

  const handleSaveSearchValueToStore = (inputValue: string) => {
    setSearchValue(inputValue);
  };
  const debouncedSuggestionHandler = useCallback(
    debounce(handleSuggestions, 500),
    [],
  );

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isTooLong = inputValue.length >= INPUT_MAX_LENGTH;
    setActiveIndex(-1);

    setSearchInput({ value: inputValue, hasError: isTooLong });
    setDisplayValue(inputValue);
    debouncedSuggestionHandler(inputValue);
    handleSaveSearchValueToStore(inputValue);
  };

  useEffect(() => {
    const searchPages: RoutePath[] = [
      AppRoute.SEARCH_RESULTS_FOUND,
      AppRoute.SEARCH_RESULTS_NOT_FOUND,
    ];
    if (!searchPages.includes(location.pathname as RoutePath)) {
      dispatch(clearSuggestions());
      setIsOverlayActive(false);
    }

    return () => {
      debouncedSuggestionHandler.cancel();
    };
  }, [location.pathname]);

  const clearSearchInputValue = () => {
    setSearchInput({ value: '', hasError: false });
    setDisplayValue('');
    debouncedSuggestionHandler.cancel();
    dispatch(clearSuggestions());
    setIsOverlayActive(false);
    setIsGlobalOverlayActive(false);

    navigate(AppRoute.ALL_PRODUCTS);
  };

  return (
    <Input
      id="header-search"
      className={classNames(styles['header-search'], {
        [styles['header-search__error']]: searchInput.hasError,
        [styles['autocomplete-search-bar__active']]: isSearchBarActive,
      })}
      placeholder="Searching..."
      value={displayValue}
      maxLength={INPUT_MAX_LENGTH}
      onChange={handleChangeInputValue}
      onKeyDown={handleKeyDown}
      prefix={
        <div
          id="autocomplete-search-bar-id"
          className={styles['autocomplete-search-bar']}
        >
          {searchInput.value && (
            <ul>
              {searchInput.value.trim() &&
                suggestions
                  .filter((trend) =>
                    trend
                      .toLowerCase()
                      .includes(searchInput.value.trim().toLowerCase()),
                  )
                  .slice(0, 6)
                  .map((trend, index) => {
                    const searchValue = searchInput.value.trim().toLowerCase();
                    const startIndex = trend.toLowerCase().indexOf(searchValue);
                    const endIndex = startIndex + searchValue.length;

                    return (
                      <li
                        key={index}
                        className={classNames({
                          [styles['active-suggestion']]: index === activeIndex,
                        })}
                      >
                        {startIndex !== -1 && (
                          <Link
                            to={`${AppRoute.SEARCH_RESULTS_FOUND}/?text=${trend.replace(/[\s/]/g, '-')}`}
                            state={{
                              searchInputValue: trend,
                              isSuggestion: true,
                            }}
                            onClick={(e) => onSuggestionClick(e, trend)}
                          >
                            <span>{trend.slice(0, startIndex)}</span>
                            <strong>{trend.slice(startIndex, endIndex)}</strong>
                            <span>{trend.slice(endIndex)}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
            </ul>
          )}
        </div>
      }
      suffix={
        <div className={styles['search-right-elements']}>
          {searchInput.value && (
            <>
              <img
                src={searchInputClear}
                alt="clear icon"
                onClick={clearSearchInputValue}
              />
              <div className={styles['search-right-elements_devider']}></div>
            </>
          )}
          <Link
            to={`${AppRoute.SEARCH_RESULTS_FOUND}/?text=${searchInput.value}`}
            state={{ searchInputValue: searchInput.value, isSuggestion: false }}
            className={classNames({
              [styles.active]: displayValue,
            })}
            onClick={async (e) => {
              e.preventDefault();
              const query = searchInput.value.trim();
              if (!query) return;

              debouncedSuggestionHandler.cancel();
              dispatch(clearSuggestions());
              setIsOverlayActive(false);
              setIsGlobalOverlayActive(false);

              const result = await handleSearchProducts(query);

              if (!result?.page.length) {
                navigate(AppRoute.SEARCH_RESULTS_NOT_FOUND, {
                  state: { searchInputValue: query },
                });
              } else {
                navigate(
                  `${AppRoute.SEARCH_RESULTS_FOUND}/?text=${query.replace(/[\s/]/g, '-')}`,
                  {
                    state: { searchInputValue: query, isSuggestion: false },
                  },
                );
              }
            }}
          >
            <SearchIcon />
          </Link>
        </div>
      }
    />
  );
};
