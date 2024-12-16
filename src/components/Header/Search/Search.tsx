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
} from 'react';
import styles from './search.module.scss';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { Input, InputRef } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { searchInputClear } from '@/assets/constants';
import { laptopData, smartphoneData } from '@/components/Card/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';

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
      const titleLower = product.title.toLowerCase();

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
    const isTooLong = inputValue.length >= 80;

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
      value={searchInput.value}
      maxLength={80}
      onChange={handleChangeInputValue}
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
                      <li key={index}>
                        {startIndex !== -1 && (
                          <Link
                            to={`/seacrh/?text=${trend.title.split(' ').join('+')}`}
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
          <SearchIcon />
        </div>
      }
    />
  );
};
