import "./App.css";
import AddContact from "./home/contacts/addContact/AddContact";
import Contact from "./home/contacts/contact/Contact";
import ContactList from "./home/contacts/contactList/ContactList";
import Home from "./home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import EditContact from "./home/contacts/editContact/EditContact";

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
  const [search, setSearch] = useState("");
  const [fav, setFav] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-contact", JSON.stringify(contactList));
  }, [contactList]);

  function handleDeleteContact(id) {
    const filterId = contactList.filter((element, index) => {
      return element.id !== id;
    });
    setContactList(filterId);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          contactList={contactList}
          setContactList={setContactList}
          search={search}
          setSearch={setSearch}
          handleDeleteContact={handleDeleteContact}
          fav={fav}
          setFav={setFav}
        />
      ),
    },
    {
      path: "/addcontact",
      element: (
        <AddContact contactList={contactList} setContactList={setContactList} />
      ),
    },
    {
      path: "/contact/:id",
      element: (
        <>
          <Contact handleDeleteContact={handleDeleteContact} contactList={contactList}  style={{ marginTop: 800 }} />
          <button className="button--back">بازگشت</button>{" "}
        </>
      ),
    },
    {
      path: "/editContact/:id",
      element: (
        <EditContact
          contactList={contactList}
          setContactList={setContactList}
        />
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
