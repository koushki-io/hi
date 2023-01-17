import "./contact.css";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

function Contact({
  handleDeleteContact,
  contactList,
  setContactList,
  setFav,
  type,
  contact,
}) {
  let { id } = useParams();
 
  

 

  let find =
    type == "list" ? contact : contactList.find((item) => item.id == id);
  
let index =contactList.findIndex((item=>item.id==id))  


  const [splice, setsplice] = useState(contactList);

  const star = useRef();

  function handleFav() {
  
      let newContact = {
        flag:!(find.flag),
        fav:find.fav,
        id:find.id,
        name:find.name,
        lastName:find.lastName,
        tel:find.tel,
        otherPhone:find.otherPhone,
        age:find.age,
        email:find.email,
        gender:find.gender,
        address:find.address,
      };
      let edit=contactList.filter((value) =>value.id!==find.id )
      let pushedit=[...edit,newContact].sort((a,b)=>a.id - b.id).sort((a,b)=>  b.flag- a.flag)
      
      setContactList(pushedit)
     
      

      // setContactList(splice);
    //  setContactList()

      // console.log("fav",contactList, "id" ,myId);



    // contactList.forEach(function (item, i) {
    //   if (item.id === myId) {
    //     if (item.fav === false) {
    //       star.current.style.color = "yellow";
    //       // star.current.backgroundColor = "yellow";

    //       contactList.splice(i, 1);
    //       contactList.unshift(item);
    //       setFav(true);
    //       setContactList(contactList);
    //       localStorage.setItem("my-contact", JSON.stringify(contactList));

    //       console.log("if false", item.fav);
    //     } else if (item.fav === true) {
    //       const sortedById = [...contactList].sort((a, b) => a.id - b.id);
    //       setContactList(sortedById);
    //       setFav(false);

    //       localStorage.setItem("my-contact", JSON.stringify(contactList));

    //       console.log("if true", item.fav);
    //     }
    //   }
    // });
    // console.log("new contactList:" , contactList)
  }
  console.log(contactList);

  return (
    <div className="contact__Card">
      <div>
        <IoMdContact className="icon--contact2" />
      </div>
      <div className="contact__options">
        <div
          className="contact__fav"
          ref={star}
          onClick={() => handleFav()}
        >
          <CiStar className="fav" style={{color : find.flag ?  "yellow" : ""}} />
        </div>
        {/* <div className="contact__fav" onClick={()=>handleFav(contactList , myId)}>
          <CiStar className="fav" />
        </div> */}
        <Link to={`/contact/${find.id}`}>
          <button className="button--eye">
            <AiOutlineEye className="icon--eye" />
          </button>
        </Link>
        <Link to={`/editContact/${find.id}`}>
          <button className="button--edit">
            <FiEdit2 className="icon--edit" />
          </button>
        </Link>
        <Link to="/">
          <button className="button--delete">
            <AiOutlineDelete
              className="icon--delete"
              onClick={() => handleDeleteContact(find.id)}
            />
          </button>
        </Link>
      </div>
      <div className="contact__infolist">
        <ul>
          <li>مورد علاقه: &nbsp;&nbsp;{find.flag}</li>
          <li>آی دی : &nbsp;&nbsp;{find.id}</li>
          <li>نام : &nbsp;&nbsp;{find.name}</li>
          <li>نام خانوادگی : &nbsp;&nbsp;{find.lastName}</li>
          <li>
            تلفن :
            <a href="tel:123456789" className="tel__a">
              &nbsp;&nbsp;{find.tel}
            </a>
          </li>
          <li>
            <span>دیگر شماره ها :</span>
            {find.otherPhone.length > 0 ? find.otherPhone.map((number, i) => (
              <p key={i}>
                <a href="tel:123456789" className="tel__a">
                  {number.value}
                </a>
              </p>
            )) : (
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </span>
            )}
          </li>
          <li>
            ایمیل :
            {find.email ? (
              <a href="mailto:info@mailgo.dev" className="email__a">
                &nbsp;&nbsp;{find.email}
              </a>
            ) : (
              <div style={{ display: "inline-block" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            سن :
            {find.age ? (
              <span>&nbsp;&nbsp;{find.age}</span>
            ) : (
              <div style={{ display: "inline-block" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            جنسیت :
            {find.gender ? (
              <span>&nbsp;&nbsp;{find.gender}</span>
            ) : (
              <div style={{ display: "inline-block" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            آدرس :
            {find.address ? (
              <span>&nbsp;&nbsp;{find.address}</span>
            ) : (
              <div style={{ display: "inline-block" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Contact;
