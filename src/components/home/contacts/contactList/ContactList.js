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
    }).map((contact)=>{

   
      return  <Contact
           type="list"
          key={contact.id}
          contact={contact}
          handleDeleteContact={handleDeleteContact} 
          contactList={contactList}
          />
    })
}
export default ContactList;