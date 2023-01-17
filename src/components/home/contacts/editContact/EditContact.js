import './editContact.css';
import { IoMdContact } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import Input from "../input/Input";
import { useNavigate, useParams } from "react-router-dom";

function EditContact({ contactList, setContactList }) {

const {id}=useParams()

let find =contactList.find((item=>item.id==id))
let index =contactList.findIndex((item=>item.id==id))  


  const [splice, setsplice] = useState(contactList);
  const [editName, setEditName] = useState(find.name);
  const [editNameError, setEditNameError] = useState(false);

  const [editLastName, setEditLastName] = useState(find.lastName);
  const [editLastNameError, setEditLastNameError] = useState(false);

  const [editTel, setEditTel] = useState(find.tel);
  const [editTelError, setEditTelError] = useState(false);

  const [editEmail, setEditEmail] = useState(find.email);
  const [editEmailError, setEditEmailError] = useState(false);

  const [editAge, setEditAge] = useState(find.age);
  const [editAgeError, setEditAgeError] = useState(false);

  const [editGender, setEditGender] = useState(find.gender);
  const [editAddress, setEditAddress] = useState(find.address);

  const [editId, setEditId] = useState(find.id);

  let navigate = useNavigate();
  
  const [otherPhone, setOtherPhone] = useState(find.otherPhone);

  // const [repeatedTelError, setRepeatedTelError] = useState(false);
  
  const addInput = () => {
    setOtherPhone((s) => {
      return [
        ...s,
        {
          type: "number",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setOtherPhone((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  

  function handleEditName(e) {
    const farsi = /^[ا-ی ]*$/i.test(e.target.value);
    if (farsi) {
      setEditName(e.target.value);
    }
  }

  function handleEditLastName(e) {
    const farsi = /^[ا-ی ]*$/i.test(e.target.value);
    if (farsi) {
      setEditLastName(e.target.value);
    }
  }

  function handleEditTel(e) {
    const mytel = /^[0-9]{0,12}$/.test(e.target.value);
    if (mytel) {
      setEditTel(e.target.value);
    }
  }

  function handleEditEmail(e) {
    setEditEmail(e.target.value);
  }

  function handleEditAge(e) {
    const age = /^[0-9]{0,3}$/.test(e.target.value);
    if (age) {
      setEditAge(e.target.value);
    }
  }

  function handleEditGender(e) {
    setEditGender(e.target.value);
  }

  function handleEditAddress(e) {
    setEditAddress(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    if (editName === "") {
        setEditNameError(true);
      return;
    }

    if (editLastName === "") {
        setEditLastNameError(true);
      return;
    }

    if (editTel === "") {
        setEditTelError(true);
      return;
    }

    if (editAge !== "") {
      if (editAge < 1 || editAge > 100) {
        setEditAgeError(true);
        return;
      }
    }

    if (editEmail !== "" && !/\S+@\S+\.\S+/.test(editEmail)) {
      setEditEmailError(true);
      return;
    }

    // const repeatedTel = contactList.find((item) => item.tel == tel);
    // if (repeatedTel) {
    //   setRepeatedTelError(true);
    //   console.log("true repeat");
    //   return;
    // }

    let newContact = {
        flag:find.flag,
        fav:find.fav,
        id:editId,
        name:editName,
        lastName:editLastName,
        tel:editTel,
        otherPhone:otherPhone,
        age:editAge,
        email:editEmail,
        gender:editGender,
        address:editAddress,
      };
      
    setsplice(contactList.splice(index,1,newContact))

    setContactList(splice);

    localStorage.setItem("my-contact", JSON.stringify(contactList));

    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <IoMdContact className="icon--contact" />

        <Input
          className="form__input"
          type="text"
          id="name"
          placeholder="نام"
          value={editName}
          onChange={handleEditName}
        />
        {editNameError ? (
          <div className="errors">لطفا نام مخاطب را وارد کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="text"
          id="lastName"
          placeholder="نام خانوادگی"
          value={editLastName}
          onChange={handleEditLastName}
        />
        {editLastNameError ? (
          <div className="errors">لطفا نام خانوادگی مخاطب را وارد کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="tel"
          id="tel"
          placeholder="تلفن"
          value={editTel}
          onChange={handleEditTel}
        />
        {editTelError ? (
          <div className="errors">لطفا شماره ی مخاطب را وارد کنید</div>
        ) : null}
        {/* <button className="button--addtel">
          اضافه کردن تلفن دیگر
          <IoIosAddCircleOutline className="icon--addtel" />
        </button> */}

        {otherPhone.map((item, i) => {
          return (
            <Input
              className="form__input"
              onChange={handleChange}
              value={item.value}
              id={i}
              key={i}
              type={item.type}
              placeholder="شماره تلفن اضافه"
            />
          );
        })}
        <button className="button--addtel" type="button" onClick={addInput}>
          اضافه کردن تلفن دیگر
          <IoIosAddCircleOutline className="icon--addtel" />
        </button>

        <Input
          className="form__input"
          type="text"
          id="email"
          placeholder="ایمیل"
          value={editEmail}
          onChange={handleEditEmail}
        />
        {editEmailError ? (
          <div className="errors">لطفا فرمت ایمیل را رعایت کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="number"
          id="age"
          placeholder="سن"
          value={editAge}
          onChange={handleEditAge}
        />
        {editAgeError ? (
          <div className="errors">لطفا سن صحیح را وارد کنید</div>
        ) : null}

        <p className="form__genderp">جنسیت :</p>
        <div className="gender">
          <Input
            className="form__gender"
            type="radio"
            label="مرد"
            value="مرد"
            id="male"
            onChange={handleEditGender}
            name="gender"
          />

          <Input
            className="form__gender"
            type="radio"
            label="زن"
            value="زن"
            id="female"
            onChange={handleEditGender}
            name="gender"
          />
        </div>
        <textarea placeholder="آدرس" value={editAddress} onChange={handleEditAddress} />
        {/* {repeatedTelError ? (
          <div className="telError">شماره تلفن تکراری است!</div>
        ) : null} */}
        <Input type="submit" className="form__button" value="ثبت" />
      </form>
    </div>
  );
}
export default EditContact;
