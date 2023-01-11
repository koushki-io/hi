import './App.css';
import AddContact from './home/contacts/addContact/AddContact';
import Contact from './home/contacts/contact/Contact';
import ContactList from './home/contacts/contactList/ContactList';
import Home from './home/Home';
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import { useState , useEffect } from 'react';
import EditContact from './home/contacts/editContact/EditContact';


function getDataFromLS() {
  const data = localStorage.getItem("my-contact");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function App() {
const [contactList, setContactList] = useState(getDataFromLS());


useEffect(() => {
  localStorage.setItem("my-contact", JSON.stringify(contactList));
}, [contactList]);

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home contactList={contactList} setContactList={setContactList} />
    },
    {
      path: "/addcontact",
      element: <AddContact contactList={contactList} setContactList={setContactList} />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/editContact/:id",
      element: <EditContact contactList={contactList} setContactList={setContactList} />
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
