import React, { useState } from 'react';
import people from '../components/data';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SIGNIN } from '../Router/Router';

const HomePage = () => {
  const [users, setUsers] = useState(people);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const notify = () => {
    toast('Signed Out', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleLogOut = (e) => {
    setLoading(true);
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          notify();
          navigate(SIGNIN);
        }, 5000);
      })
      .catch((err) => {
        alert('Error in sign out..try again');
        setLoading(false);
      });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(users);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUsers(items);
  };

  // Function to handle input change and filter characters
  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredCharacters = people.filter(
      (characters) =>
        characters.name.toLowerCase().includes(searchTerm) ||
        characters.name.includes(searchTerm)
    );

    setUsers(filteredCharacters);
    setInput(searchTerm);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className='text-center'>
          <header className='flex flex-col items-center justify-center text-xl'>
            <span className='mt-2 w-80 flex flex-row items-center'>
              <input
                id='search'
                name='search'
                type='text'
                value={input}
                onChange={handleInputChange}
                placeholder='Search by name or id'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
              />
              <AiOutlineSearch size={25} />
            </span>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='characters'>
                {(provided) => (
                  <ul
                    className='list-none mt-5 pl-0'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {users.map(({ id, name, thumb }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            className='flex items-center border border-solid border-gray-300 rounded-md p-2 mb-3'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className='overflow-hidden flex-shrink-0 w-24 h-w-24 bg-gray-300 p-2 mr-2'>
                              <img
                                src={thumb}
                                className='block w-full h-auto'
                                alt={`${name} Thumb`}
                              />
                            </div>
                            <p className='max-w-none font-bold m-0'>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <button
              onClick={handleLogOut}
              className='border flex w-60 text-center justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
            >
              Sign out
            </button>
          </header>
        </div>
      )}
    </>
  );
};

export default HomePage;
