import "./contact.css";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function Contact({
  handleDeleteContact,
  contactList,
  contactFav,
  setFav,
  type,
  contact
 
  
}) {





 let {id}=useParams()

  let find =type=="list"? contact :contactList.find((item=>item.id==id))
  
  

  function handleFav(contactList,contactTel){
    contactList.forEach(function(item , i){
      if(item.tel === contactTel){
        contactList.splice(i , 1);
        contactList.unshift(item);
      }
    });
    console.log("new contactList:" , contactList)
  }

  function handleFav(e){
    if(e.target.value === false){
      setFav(true);
    }
    if(e.target.value === true){
      setFav(false);
    }
  
  }

  return (
    // <></>
   
    <div className="contact__Card">
      <div>
        <IoMdContact className="icon--contact2" />
      </div>
      <div className="contact__options">
        <div className="contact__fav" value={contactFav} onClick={handleFav}>
          <CiStar className="fav" />
        </div>
        {/* <div className="contact__fav" onClick={()=>handleFav(contactList,contactTel)}>
          <CiStar className="fav" />
        </div> */}
        <button className="button--eye">
          <AiOutlineEye className="icon--eye" />
        </button>
        <Link to={`/editContact/${find.id}`}>
          <button className="button--edit">
            <FiEdit2 className="icon--edit" />
          </button>
        </Link>
        <button className="button--delete">
          <AiOutlineDelete
            className="icon--delete"
            onClick={() => handleDeleteContact(find.id)}
          />
        </button>
      </div>
      <div className="contact__infolist">
        <ul>
          <li>مورد علاقه: &nbsp;&nbsp;{contactFav}</li>
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
            ایمیل :
            {find.email ? (
              <a href="mailto:info@mailgo.dev" className="email__a">
                &nbsp;&nbsp;{find.email}
              </a>
            ) : (
              <div style={{ display: "inline-block"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            سن :
            {find.age ? (
              <span>&nbsp;&nbsp;{find.age}</span>
            ) : (
              <div style={{ display: "inline-block"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            جنسیت :
            {find.gender ? (
              <span>&nbsp;&nbsp;{find.gender  }</span>
            ) : (
              <div style={{ display: "inline-block"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </div>
            )}
          </li>
          <li>
            آدرس :
            {find.address ? (
              <span>&nbsp;&nbsp;{find.address}</span>
            ) : (
              <div style={{ display: "inline-block"}}>
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
