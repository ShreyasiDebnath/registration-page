import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function ProtectedPage() {
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Generate a unique list of items for each session
    const items = Array.from({ length: 18 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.product(),
    }));
    setClothingItems(items);

    // Load selected items from local storage
    const savedSelectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setSelectedItems(new Set(savedSelectedItems));
  }, []);

  useEffect(() => {
    // Save selected items to local storage whenever they change
    localStorage.setItem('selectedItems', JSON.stringify(Array.from(selectedItems)));
  }, [selectedItems]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = clothingItems.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center p-4 m-2 h-[80vh]">
      <form className="border-slate-200 border-2 rounded-md p-4 flex flex-col items-center w-fit">
        <h2 className="text-2xl font-bold mb-6 text-center text-black mx-0 p-0">Please mark your interest!</h2>
        <h6 className="text-center text-black p-0 mx-0">We will keep you notified</h6>
        <div className="w-full flex justify-start m-2">
          <h6 className="text-center text-black p-0 mx-0">My saved interests!</h6>
        </div>

        <ul>
          {currentItems.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <span className="ml-2">{item.name}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-start mt-4">
          {[1, 2, 3].map(page => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 m-1 rounded ${
                page === currentPage ? 'bg-black text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => alert('Your interests have been saved!')}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Interests
        </button>
      </form>
    </div>
  );
}

export default ProtectedPage;
