import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'

type SearchBarProps = {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  inputClassName?: string
  iconClassName?: string
}

const SearchBar = ({
  placeholder = 'Search…',
  onSearch,
  className = '',
  inputClassName = '',
  iconClassName = ''
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <div className={`relative rounded-md bg-white/15 hover:bg-white/25 w-64 sm:w-80 ${className}`}>
      <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${iconClassName}`}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label="search"
        className={`w-full py-2 pl-10 pr-3 text-inherit bg-transparent border-0 outline-none focus:ring-0 transition-all ${inputClassName}`}
      />
    </div>
  )
}

export default SearchBar