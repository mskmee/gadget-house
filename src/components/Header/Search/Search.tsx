import {
  FC,
  ChangeEvent,
  LegacyRef,
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
import { Input, InputRef } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { searchInputClear } from '@/assets/constants';
import { laptopData, smartphoneData } from '@/constants/productCards';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { AppRoute } from '@/enums/Route';

interface ISearchProps {
  searchFieldRef: LegacyRef<InputRef>;
  isOverlayActive: boolean;
  setIsOverlayActive: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<ISearchProps> = ({
  searchFieldRef,
  isOverlayActive,
  setIsOverlayActive,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname); // Store latest path in a ref
  const { setSearchValue, setIsGlobalOverlayActive } = useActions();
  const [searchInput, setSearchInput] = useState({
    value: '',
    hasError: false,
  });
  const [suggestions, setSuggestions] = useState<
    { title: string; category: string }[]
  >([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && activeIndex !== 5) {
      console.log(suggestions);

      setActiveIndex((prev) =>
        Math.min(
          prev + 1,
          suggestions
            .filter((trend) =>
              trend.title
                .toLowerCase()
                .includes(searchInput.value.trim().toLowerCase()),
            )
            .slice(0, 6).length - 1,
        ),
      );
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        const selectedSuggestion = suggestions[activeIndex];
        const selectedTitle = selectedSuggestion.title;
        setIsOverlayActive(false);
        navigate(
          `${AppRoute.SEARCH_RESULTS_FOUND}/?text=${selectedTitle.replace(
            /[\s/]/g,
            '-',
          )}`,
          {
            state: {
              searchInputValue: selectedTitle,
              isSuggestion: true,
            },
          },
        );
        setSearchInput({ value: selectedTitle, hasError: false });
      } else if (searchInput.value.trim()) {
        navigate(
          `${AppRoute.SEARCH_RESULTS_FOUND}/?text=${searchInput.value.trim()}`,
          {
            state: {
              searchInputValue: searchInput.value.trim(),
              isSuggestion: false,
            },
          },
        );
      }
    }
  };

  const allProducts = [...laptopData, ...smartphoneData];

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  const handleSuggestions = (inputValue: string) => {
    const tempSuggestions = new Map<
      string,
      { title: string; category: string }
    >();
    const normalizedInput = inputValue.toLowerCase().trim();

    if (!normalizedInput) {
      setSuggestions([]);
      return;
    }

    allProducts.forEach((product) => {
      const titleLower = product.name.toLowerCase();

      if (titleLower.includes(normalizedInput)) {
        const words = titleLower.split(' ');
        const inputWords = normalizedInput.split(' ');

        for (let i = 0; i < words.length; i++) {
          const allWordsMatch = inputWords.every((word, index) =>
            words[i + index]?.startsWith(word),
          );

          if (allWordsMatch) {
            for (let j = i; j < words.length; j++) {
              const suggestionTitle = words.slice(i, j + 1).join(' ');
              tempSuggestions.set(suggestionTitle, {
                title: suggestionTitle,
                category: product.category,
              });
            }
          }
        }
      }
    });

    if (tempSuggestions.size) {
      setIsOverlayActive(true);
      setIsGlobalOverlayActive(true);
      setSuggestions(Array.from(tempSuggestions.values()));
    } else {
      setIsOverlayActive(false);
      setIsGlobalOverlayActive(false);
      if (currentPath.current !== '/search-results') {
        //because here closure with location pathname, therefor i use currentPath (useRef)

        navigate('/search-results', {
          state: inputValue,
        });
      }
    }
  };

  const handleSaveSearchValueToStore = (inputValue: string) => {
    setSearchValue(inputValue);
  };

  const debouncedSuggestionHandler = useCallback(
    debounce(handleSuggestions, 500),
    [],
  );
  const debouncedSearchHandler = useCallback(
    debounce(handleSaveSearchValueToStore, 500),
    [],
  );

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isTooLong = inputValue.length >= 40;
    setActiveIndex(-1); // Reset the active index when typing

    setSearchInput({ value: inputValue, hasError: isTooLong });
    debouncedSuggestionHandler(inputValue);
    debouncedSearchHandler(inputValue);
  };

  useEffect(() => {
    if (location.pathname !== '/search-results') {
      setSearchInput({ value: '', hasError: false });
      setSuggestions([]);
    }

    return () => {
      debouncedSuggestionHandler.cancel();
      debouncedSearchHandler.cancel();
    };
  }, [location.pathname]);

  const clearSearchInputValue = () => {
    setSearchInput({ value: '', hasError: false });
    setSuggestions([]);
    debouncedSuggestionHandler('');
    debouncedSearchHandler('');
  };

  return (
    <Input
      ref={searchFieldRef}
      id="header-search"
      className={classNames(styles['header-search'], {
        [styles['header-search__error']]: searchInput.hasError,
        [styles['autocomplete-search-bar__active']]:
          suggestions.length > 0 && isOverlayActive,
      })}
      placeholder="Searching..."
      value={
        activeIndex >= 0 && suggestions[activeIndex]
          ? suggestions[activeIndex].title
          : searchInput.value
      }
      maxLength={40}
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
                    trend.title
                      .toLowerCase()
                      .includes(searchInput.value.trim().toLowerCase()),
                  )
                  .slice(0, 6)
                  .map((trend, index) => {
                    const searchValue = searchInput.value.trim().toLowerCase();
                    const startIndex = trend.title
                      .toLowerCase()
                      .indexOf(searchValue);
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
                            to={`${AppRoute.SEARCH_RESULTS_FOUND}/?text=${trend.title.replace(/[\s/]/g, '-')}`}
                            state={{
                              searchInputValue: `${trend.title.replace(/[\s/]/g, '-')}`,
                              isSuggestion: true,
                            }}
                            onClick={() => setIsOverlayActive(false)}
                          >
                            <span>{trend.title.slice(0, startIndex)}</span>
                            <strong>
                              {trend.title.slice(startIndex, endIndex)}
                            </strong>
                            <span>{trend.title.slice(endIndex)}</span>
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
          {searchInput.value ? (
            <>
              <img
                src={searchInputClear}
                alt="clear icon"
                onClick={clearSearchInputValue}
              />
              <div className={styles['search-right-elements_devider']}></div>
              <Link
                to={`${AppRoute.SEARCH_RESULTS_FOUND}/?text=${searchInput.value}`}
                state={{
                  searchInputValue: searchInput.value,
                  isSuggestion: false,
                }}
                className={classNames({ [styles.active]: searchInput.value })}
                onClick={() => setIsOverlayActive(false)}
              >
                <SearchIcon />
              </Link>
            </>
          ) : (
            <SearchIcon />
          )}
        </div>
      }
    />
  );
};
