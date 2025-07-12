// //src/components/SearchBar.tsx
// 'use client';

// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   onClear: () => void;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <div className='search-bar'>
//       <style jsx>{`
//         .search-bar {
//           padding: 1rem;
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
//         .search-form {
//           display: flex;
//           gap: 0.5rem;
//         }
//         .search-input {
//           flex: 1;
//           padding: 0.75rem;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 1rem;
//         }
//         .search-button,
//         .clear-button {
//           padding: 0.75rem 1.5rem;
//           border: none;
//           border-radius: 4px;
//           background: #4caf50;
//           color: white;
//           cursor: pointer;
//           font-size: 1rem;
//         }
//         .clear-button {
//           background: #f44336;
//         }
//         .search-button:hover,
//         .clear-button:hover {
//           opacity: 0.9;
//         }
//       `}</style>
//       <form onSubmit={handleSubmit} className='search-form'>
//         <input
//           type='text'
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder='Search Pokemon by name or ID...'
//           className='search-input'
//         />
//         <button type='submit' className='search-button'>
//           Search
//         </button>
//         <button type='button' onClick={onClear} className='clear-button'>
//           Clear
//         </button>
//       </form>
//     </div>
//   );
// };
