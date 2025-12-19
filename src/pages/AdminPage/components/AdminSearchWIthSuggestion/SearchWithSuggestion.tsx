import {
  FC,
  useState,
  useCallback,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react';
import { AdminSearch } from '../Search';
import styles from './admin-search-with-suggestions.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { Currency } from '@/enums/Currency';
interface Suggestion {
  title: string;
  category: string;
  productId: string;
  price: number;
  image?: string;
}
interface IAdminSearchWithSuggestionsProps {
  suggestions: Suggestion[];
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (query: string) => void;
  // eslint-disable-next-line no-unused-vars
  onProductSelect?: (suggestion: Suggestion) => void;
  selectedItem?: Suggestion | null;
  onClearSelection?: () => void;
  placeholder?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  disabled?: boolean;
  className?: string;
}

const AdminSearchWithSuggestions: FC<IAdminSearchWithSuggestionsProps> = ({
  suggestions,
  onSearchChange,
  onProductSelect,
  selectedItem,
  onClearSelection,
  placeholder = 'Search...',
  defaultValue = '',
  disabled = false,
  className,
}) => {
  const [searchInput, setSearchInput] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchInput(query);
      setActiveIndex(-1);
      if (!selectedItem) {
        onSearchChange(query);
      }
      setShowSuggestions(
        query.trim().length > 0 ||
          (suggestions.length > 0 && query.trim().length > 0),
      );
    },
    [onSearchChange, selectedItem, suggestions.length],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(
        searchInput.trim().length > 0 && suggestions.length > 0,
      );
    }
  }, [suggestions, searchInput, selectedItem]);

  const handleSelectProduct = (suggestion: Suggestion) => {
    setShowSuggestions(false);
    setSearchInput('');
    setActiveIndex(-1);
    onProductSelect?.(suggestion);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (selectedItem) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelectProduct(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const searchDisabled = !!selectedItem || disabled;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.searchWrapper} ${className || ''}`}
      onKeyDown={handleKeyDown}
    >
      <AdminSearch
        onSearch={handleSearch}
        placeholder={placeholder}
        disabled={searchDisabled}
        selectedItem={selectedItem}
        onClearSelection={onClearSelection}
      />
      {showSuggestions && suggestions.length > 0 && !selectedItem && (
        <div className={styles.suggestionsWrapper}>
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  key={`${suggestion.productId}-${index}`}
                  className={`${styles.suggestion} ${
                    index === activeIndex ? styles['suggestion--active'] : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectProduct(suggestion)}
                    className={styles.suggestionLink}
                  >
                    {suggestion.image && <img src={suggestion.image} alt="" />}

                    <div className={styles.info}>
                      <span className={styles.title} title={suggestion.title}>
                        {suggestion.title}
                      </span>
                      <span className={styles.category}>
                        {suggestion.category}
                      </span>
                    </div>

                    <div className={styles.price}>
                      {convertPriceToReadable(
                        suggestion.price,
                        '₴' as Currency,
                        'uk-UA',
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { AdminSearchWithSuggestions };
