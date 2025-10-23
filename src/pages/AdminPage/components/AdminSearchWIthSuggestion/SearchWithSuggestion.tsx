import { FC, useState, useCallback, useEffect, KeyboardEvent } from 'react';
import { AdminSearch } from '../Search';
import styles from './admin-search-with-suggestions.module.scss';

interface Suggestion {
  title: string;
  category: string;
  productId: string;
}

interface IAdminSearchWithSuggestionsProps {
  suggestions: Suggestion[];
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (query: string) => void;
  // eslint-disable-next-line no-unused-vars
  onProductSelect?: (productId: string) => void;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

const AdminSearchWithSuggestions: FC<IAdminSearchWithSuggestionsProps> = ({
  suggestions,
  onSearchChange,
  onProductSelect,
  placeholder = 'Search...',
  defaultValue = '',
  disabled = false,
  className,
}) => {
  const [searchInput, setSearchInput] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle search from UI component
  const handleSearch = useCallback(
    (query: string) => {
      setSearchInput(query);
      setActiveIndex(-1);
      onSearchChange(query);
      setShowSuggestions(query.trim().length > 0 && suggestions.length > 0);
    },
    [onSearchChange, suggestions.length],
  );

  // Update suggestions visibility when props change
  useEffect(() => {
    setShowSuggestions(searchInput.trim().length > 0 && suggestions.length > 0);
  }, [suggestions, searchInput]);

  // Select product
  const handleSelectProduct = (productId: string) => {
    setShowSuggestions(false);
    setSearchInput('');
    setActiveIndex(-1);
    onProductSelect?.(productId);
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const selected = suggestions[activeIndex];
        handleSelectProduct(selected.productId);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div
      className={`${styles.searchWrapper} ${className || ''}`}
      onKeyDown={handleKeyDown}
    >
      <AdminSearch
        onSearch={handleSearch}
        placeholder={placeholder}
        disabled={disabled}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => {
            const searchValue = searchInput.toLowerCase().trim();
            const titleLower = suggestion.title.toLowerCase();
            const startIndex = titleLower.indexOf(searchValue);
            const endIndex = startIndex + searchValue.length;

            return (
              <li
                key={`${suggestion.productId}-${index}`}
                className={`${styles.suggestion} ${
                  index === activeIndex ? styles['suggestion--active'] : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSelectProduct(suggestion.productId)}
                  className={styles.suggestionLink}
                >
                  {startIndex !== -1 ? (
                    <>
                      <span>{suggestion.title.slice(0, startIndex)}</span>
                      <strong>
                        {suggestion.title.slice(startIndex, endIndex)}
                      </strong>
                      <span>{suggestion.title.slice(endIndex)}</span>
                    </>
                  ) : (
                    <span>{suggestion.title}</span>
                  )}
                  <span className={styles.category}>{suggestion.category}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { AdminSearchWithSuggestions };
