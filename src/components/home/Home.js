import "./home.css";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddContact from "./contacts/addContact/AddContact";
import ContactList from "./contacts/contactList/ContactList";
import { useState } from "react";
import Input from "./contacts/input/Input";
import { Link } from "react-router-dom";

function Home({contactList , setContactList}) {

  const [search, setSearch] = useState("");
  const [fav, setFav] = useState(false);

  function handleDeleteContact(tel) {
    const filterTel = contactList.filter((element, index) => {
      return element.tel !== tel;
    });
    setContactList(filterTel);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleSort(){
    const sortedContactList = [...contactList].sort((a, b) =>
    a.name > b.name ? 1 : -1,
  );
    setContactList(sortedContactList)
  }

  function handleReversedSort(){
    const reversedSortContactList = [...contactList].sort((a, b) =>
    a.name > b.name ? -1 : 1,
  );
    setContactList(reversedSortContactList)
  }

  return (
    <div>
      <header>
        <h1>دفترچه تلفن</h1>
        <div className="searchBar">
          <button className="button--sort" onClick={handleSort} >
            به ترتیب الفبا
          </button>
          <button className="button--sort" onClick={handleReversedSort}>
            برعکس ترتیب الفبا
          </button>
          <Link to="/addcontact">
            <button className="button--addcontact">
              <AiOutlineUserAdd className="icon--addcontact" />
            </button>
          </Link>
          <button
            className="button--search"
            // onClick={(e) => {
            //   setSearch(search);
            // }}
          >
            <RiSearchLine className="icon--search" />
          </button>
          <Input
            type="search"
            placeholder="نام شماره و یا ایمیل مخاطب را جست و جو کنید"
            onChange={handleSearch}
            value={search}
          />
        </div>
      </header>

      <main>
        {contactList.length < 1 ? (
          <>
            <div className="noContact">هنوز هیچ مخاطبی ثبت نشده است.</div>
            <AddContact
              contactList={contactList}
              setContactList={setContactList}
              fav={fav}
              setFav={setFav}
            />
          </>
        ) : (
          <ContactList
            search={search}
            handleDeleteContact={handleDeleteContact}
            contactList={contactList}
            setContactList={setContactList}
            fav={fav}
            setFav={setFav}
          />
        )}
        {/* <AddContact contactList={contactList} setContactList={setContactList} /> */}
      </main>
    </div>
  );
}
export default Home;
