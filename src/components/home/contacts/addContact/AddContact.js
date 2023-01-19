import "./addContactForm.css";
import { IoMdContact } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";

function AddContact({ contactList, setContactList }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [tel, setTel] = useState("");
  const [telError, setTelError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState(false);

  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const idset = localStorage.getItem("my-contact")
    ? JSON.parse(localStorage.getItem("my-contact"))
    : [];

    let findIDArry=[]

    contactList.map((value) => {
      findIDArry.push(value.id)
    })

    findIDArry.sort((a, b) => b-a)


    console.log(findIDArry);

  const [id, setId] = useState(
    findIDArry.length? findIDArry[0]+1 : 1
  );

  const [repeatedTelError, setRepeatedTelError] = useState(false);

  let navigate = useNavigate();

  function handleName(e) {
    const farsi = /^[ا-ی ]*$/i.test(e.target.value);
    if (farsi) {
      setName(e.target.value);
    }
  }

  function handleLastName(e) {
    const farsi = /^[ا-ی ]*$/i.test(e.target.value);
    if (farsi) {
      setLastName(e.target.value);
    }
  }

  const [otherPhone, setOtherPhone] = useState([]);
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

  function handleTel(e) {
    const mytel = /^[0-9]{0,12}$/.test(e.target.value);
    if (mytel) {
      setTel(e.target.value);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleAge(e) {
    const age = /^[0-9]{0,3}$/.test(e.target.value);
    if (age) {
      setAge(e.target.value);
    }
  }

  function handleGender(e) {
    setGender(e.target.value);
  }

  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "") {
      setNameError(true);
      return;
    }

    if (lastName === "") {
      setLastNameError(true);
      return;
    }

    if (tel === "") {
      setTelError(true);
      return;
    }

    if (age !== "") {
      if (age < 1 || age > 100) {
        setAgeError(true);
        return;
      }
    }

    if (email !== "" && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }

    const repeatedTel = contactList.find((item) => item.tel == tel);
    if (repeatedTel) {
      setRepeatedTelError(true);
      return;
    }

    let newContact = {
      flag: false,
      id,
      name,
      lastName,
      tel,
      otherPhone,
      age,
      email,
      gender,
      address,
    };

    setContactList([...contactList, newContact]);
    setName("");
    setLastName("");
    setTel("");
    setEmail("");
    setAge("");
    setGender("");
    setAddress("");
    setId(id + 1);

    navigate(`/contact/${id}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IoMdContact className="icon--contact" />

        <Input
          className="form__input"
          type="text"
          id="name"
          placeholder="نام"
          value={name}
          onChange={handleName}
        />
        {nameError ? (
          <div className="errors">لطفا نام مخاطب را وارد کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="text"
          id="lastName"
          placeholder="نام خانوادگی"
          value={lastName}
          onChange={handleLastName}
        />
        {lastNameError ? (
          <div className="errors">لطفا نام خانوادگی مخاطب را وارد کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="tel"
          id="tel"
          placeholder="تلفن"
          value={tel}
          onChange={handleTel}
        />
        {telError ? (
          <div className="errors">لطفا شماره ی مخاطب را وارد کنید</div>
        ) : null}

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
          value={email}
          onChange={handleEmail}
        />
        {emailError ? (
          <div className="errors">لطفا فرمت ایمیل را رعایت کنید</div>
        ) : null}

        <Input
          className="form__input"
          type="number"
          id="age"
          placeholder="سن"
          value={age}
          onChange={handleAge}
        />
        {ageError ? (
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
            onChange={handleGender}
            name="gender"
          />

          <Input
            className="form__gender"
            type="radio"
            label="زن"
            value="زن"
            id="female"
            onChange={handleGender}
            name="gender"
          />
        </div>
        <textarea placeholder="آدرس" value={address} onChange={handleAddress} />
        {repeatedTelError ? (
          <div className="telError">شماره تلفن تکراری است!</div>
        ) : null}
        <Input type="submit" className="form__button" value="ثبت" />
      </form>
    </div>
  );
}
export default AddContact;
