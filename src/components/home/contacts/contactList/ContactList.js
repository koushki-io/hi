import Contact from "../contact/Contact";

function ContactList({contactList , handleDeleteContact , search , setContactList , setFav}){
    return contactList.filter((query) => 
    {if (search === "") {
        return query;
      } else if (
        query.name.toLowerCase().includes(search.toLowerCase()) ||
        query.lastName.toLowerCase().includes(search.toLowerCase()) ||
        query.email.toLowerCase().includes(search.toLowerCase()) ||
        query.tel.toLowerCase().includes(search.toLowerCase())
      ) {
        return query;
      }
    }).map((contact)=>
    <Contact
        key={contact.tel}
        contactFav={contact.fav}
        setFav={setFav}
        contactId={contact.id}
        contactName={contact.name}
        contactLastName={contact.lastName}
        contactTel={contact.tel}
        contactEmail={contact.email}
        contactAge={contact.age}
        contactGender={contact.gender}
        contactAddress={contact.address}
        handleDeleteContact={handleDeleteContact} />)
}
export default ContactList;