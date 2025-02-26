import { Category } from '../types';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Grid } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainCategories = categories.filter(cat => 
    ['QUANTITATIVE APTITUDE', 'REASONING', 'GENERAL KNOWLEDGE', 'GENERAL ENGLISH'].includes(cat.name)
  );
  
  const otherCategories = categories.filter(cat => 
    !['QUANTITATIVE APTITUDE', 'REASONING', 'GENERAL KNOWLEDGE', 'GENERAL ENGLISH'].includes(cat.name)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryStyle = (category: Category | null) => {
    if (!category) {
      return selectedCategory === null
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 ring-2 ring-blue-500/50 ring-offset-2'
        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-indigo-500/25';
    }

    const isSelected = selectedCategory === category.name;
    return `${category.color} ${
      isSelected ? `ring-2 ring-offset-2 ${category.ringColor}` : ''
    }`;
  };

  const isOtherCategorySelected = selectedCategory && otherCategories.some(cat => cat.name === selectedCategory);

  return (
    <div className="my-4 sm:my-8">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-white ${getCategoryStyle(null)}`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            All Books
          </span>
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {mainCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-white ${getCategoryStyle(category)}`}
          >
            <span className="relative z-10">{category.name}</span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}

        <div className="relative inline-block" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-white
              ${isOtherCategorySelected 
                ? selectedCategory && otherCategories.find(cat => cat.name === selectedCategory)?.color
                : 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600'
              } 
              ${isOtherCategorySelected ? `ring-2 ring-offset-2 ${otherCategories.find(cat => cat.name === selectedCategory)?.ringColor}` : ''}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Grid className="h-4 w-4" />
              {isOtherCategorySelected 
                ? selectedCategory 
                : 'More Categories'}
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl z-50 border border-slate-200">
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
                {otherCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      onSelectCategory(category.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all hover:bg-slate-50
                      ${selectedCategory === category.name ? 'bg-slate-50 font-medium' : 'text-slate-700'}`}
                  >
                    <span>{category.name}</span>
                    {selectedCategory === category.name && (
                      <span className={`w-2 h-2 rounded-full ${category.color.replace('bg-gradient-to-r', '')}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}