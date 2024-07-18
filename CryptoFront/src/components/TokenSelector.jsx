/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Dropdown = ({ isOpen, anchorEl, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: anchorEl.getBoundingClientRect().bottom + window.scrollY,
        left: anchorEl.getBoundingClientRect().left + window.scrollX,
        zIndex: 99999966, // Very high z-index
        height:"auto"
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const TokenSelector = ({ tokenSelection , selectedToken , setSelectedToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const anchorRef = useRef(null);

  const filteredTokens = tokenSelection.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorRef.current && !anchorRef.current.contains(event.target)) {
        setTimeout(()=>{
          setIsOpen(false);
        },100)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTokenSelect = (token) => {
    setSelectedToken(token)
    setIsOpen(false)
  }


  return (
    <div className="relative w-full max-w-xs" ref={anchorRef}>
      <div 
        className="flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <>
            <div className="flex items-center">
              <img src={selectedToken.image} alt={selectedToken.name} className="w-6 h-6 mr-1" />
              <span className="text-sm font-medium ">{selectedToken.symbol.toUpperCase()}</span>
              <span className='text-xs ml-1'> ({selectedToken.current_price > 0.1 
              ? selectedToken.current_price.toFixed(2) : selectedToken.current_price}$)</span>
            </div>
          </>
        ) : (
          <span className="text-gray-500">Select a token</span>
        )}
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      <Dropdown isOpen={isOpen} anchorEl={anchorRef.current}>
        <div className="w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search tokens"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ul className="max-h-60 overflow-auto">
            {filteredTokens.map((token) => (
              <li
                key={token.symbol}
                onClick={() => {
                  handleTokenSelect(token)
                }}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
              >
                <img src={token.image} alt={token.symbol} className="w-6 h-6 mr-2" />
                <span className="font-medium">{token.name} <span className='text-sm'>({token.current_price}$)</span></span>
                <span className="ml-auto text-sm text-gray-800">{token.symbol.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
};

export default TokenSelector;