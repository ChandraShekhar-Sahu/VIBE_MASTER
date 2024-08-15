import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateEventList from './CreateEventList';
import EditEvent from './EditEvent';
import Header from './Header';
import Footer from './Footer';

const Item = ({ title, description, complete, onToggleCompleted, isHost, onEditClick }) => {
    description = description || "Default description";
    const buttonClass = complete ? "bg-green-500 text-white" : "bg-red-500 text-white";
    const buttonText = complete ? "Completed" : "Not Completed";
    return (
        <div className="p-6 mb-4 flex justify-between items-center bg-slate-500 shadow-slate-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div>
                <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
                <p className="text-gray-200">{description}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <button 
                    className={`text-xl px-4 py-2 rounded-lg ${buttonClass} focus:outline-none`} 
                    onClick={onToggleCompleted}
                >
                    {buttonText}
                </button>
                {isHost && (
                    <button 
                        className="text-xl px-4 py-2 rounded-lg bg-blue-500 text-white focus:outline-none" 
                        onClick={onEditClick}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

const EventList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [listItems, setListItems] = useState([
        {title:'Music Party',description:"The music party will start at 4 PM. Please Be present on time",complete:false},
        {title:'Lunch',description:"The Lunch will start at 1 PM. Please Be present on time",complete:true},
        {title:'Group Dance',description:"The Group Dance will start at 6 PM. Please Be present on time",complete:false}]
    );
    const [isHost, setIsHost] = useState(false); 

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const hostStatus = queryParams.get('isHost') === 'true';
        setIsHost(hostStatus);
    }, [location.search]);

    const toggleCompleted = (index) => {
        const newListItems = [...listItems];
        newListItems[index].complete = !newListItems[index].complete;
        setListItems(newListItems);
    };

    const addEvent = (item) => {
        const newListItems = [...listItems];
        newListItems.push(item);
        setListItems(newListItems);
    };

    const saveItem = (index, { title, description }) => {
        const newListItems = [...listItems];
        newListItems[index].title = title;
        newListItems[index].description = description;
        setListItems(newListItems);
    };

    const handleEditClick = (index) => {
        <EditEvent 
        title={Item.title}
        description={Item.description}
        onItemEdited={(editedItem) => saveItem(index, editedItem)}
                    />
    };

    return (
        <div className="bg-[#778da9]">
            <div className="flex flex-col overflow-hidden h-screen">
                <div className="flex-1 overflow-auto overflow-y-visible no-scrollbar">
                    <Header isHost={isHost} />
                    <div className="text-center mb-4 pt-4 bg-transparent">
                        <h1 className="text-3xl font-bold text-gray-900">Event List</h1>
                    </div>
                    <div className="mb-4 bg-transparent">
                        <CreateEventList onCreateEvent={addEvent} />
                    </div>
                    <div className="space-y-4 bg-transparent">
                        {listItems.map((item, index) => (
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 bg-transparent" key={item.id}>
                                <div className="flex-1 bg-transparent px-8">
                                    <Item
                                        title={item.title}
                                        description={item.description}
                                        complete={item.complete}
                                        onToggleCompleted={() => toggleCompleted(index)}
                                        isHost={isHost}
                                        onEditClick={() => handleEditClick(index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8 bg-transparent">
                        <button 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300" 
                            onClick={() => navigate("/")}
                        >
                            Back to the Room
                        </button>
                    </div>
                    <div className="pt-4 bg-transparent"> 
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventList;
