import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import "./App.css";
import Swal from "sweetalert2";

// MVC [Model(Data) - View(HTML) - Controller(JS Render)]
export default function App() {
  // Model [Data]
  const [phones, setPhones] = useState([
    { name: "iPhone x", price: 400, qty: 10 },
    { name: "iPhone 11", price: 500, qty: 4 },
    { name: "iPhone 12", price: 600, qty: 3 },
  ]);

  // Modal Index To Show [True => Show] - [False - Hide]
  const [modalIndex, setModalIndex] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(false);
  const [phoneName, setPhoneName] = useState("");
  const [phonePrice, setPhonePrice] = useState(0);
  const [phoneQty, setPhoneQty] = useState(0);
  const [phoneIndex, setPhoneIndex] = useState(0);

  // Controller
  const handleSubmit = () => {
    event.preventDefault();
    let obj = { name: phoneName, price: +phonePrice, qty: +phoneQty };
    let copyOfPhones = [...phones];
    copyOfPhones.push(obj);
    setPhones(copyOfPhones);
    Swal.fire({
      icon: "success",
      title: "New Phone Addedd Succssfully !",
      timer: 1200,
    }).then(() => {
      setModalIndex(false);
    });
  };

  const removePhone = (phoneIndex) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure you want to delete this Phone ??",
      showDenyButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        let copy = [...phones];
        copy.splice(phoneIndex, 1);
        setPhones(copy);
      }
      Swal.fire({
        icon: "success",
        text: "Phone Deleted Succssufully!",
      }).then(() => {
        setEditModalIndex(false);
      });
    });
  };

  const openPhoneToEdit = (phoneIndex) => {
    setPhoneIndex(phoneIndex);
    let phone = phones[phoneIndex];
    setPhoneName(phone.name);
    setPhonePrice(phone.price);
    setPhoneQty(phone.qty);
    setEditModalIndex(true);
  };

  const handleSave = () => {
    event.preventDefault();
    let obj = { name: phoneName, price: +phonePrice, qty: +phoneQty };
    let copy = [...phones];
    copy[phoneIndex] = obj;
    setPhones(copy);
    Swal.fire({
      icon: "success",
      text: "Phone Edit Succssufully!",
      timer: 1200,
    }).then(() => {
      setEditModalIndex(false);
    });
  };

  return (
    // HTML [ View ]
    <div className="col-12 App container p-0 d-flex flex-column align-items-center ">
      <h1 className="col-12 rounded border-5 text-center text-white bg-dark p-3 my-3">
        CRUD System Using <span className="text-primary">REACT</span>
      </h1>

      <button
        className="btn btn-success col-12 my-3 fs-2 d-flex align-items-center justify-content-center gap-1"
        onClick={() => {
          setModalIndex(true);
        }}
      >
        {" "}
        <IoIosAddCircle className="text-white fs-2" /> New Phone
      </button>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>no</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Qty</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((el, index) => {
            return (
              // HTML DOM
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{el.qty}</td>
                <td>
                  <MdDeleteForever
                    onClick={() => {
                      removePhone(index);
                    }}
                    className="text-danger fs-2"
                  />
                  <MdEditSquare
                    onClick={() => {
                      openPhoneToEdit(index);
                    }}
                    className="text-primary fs-2"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalIndex == true ? (
        <div
          className="addModal d-flex justify-content-center align-items-center"
          onClick={() => {
            setModalIndex(false);
          }}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
            className=" animate__animated animate__fadeInDown bg-white gap-2 rounded border shadow col-12 col-md-6 p-3 d-flex flex-column"
          >
            <div
              className="col-12 d-flex align-items-center justify-content-between"
              onClick={() => {
                setModalIndex(false);
              }}
            >
              <h2>Add New Phone</h2>
              <FaWindowClose className="text-danger fs-2" />
            </div>
            <input
              onKeyUp={(event) => {
                setPhoneName(event.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Enter New Phone Name"
            />
            <input
              onKeyUp={(event) => {
                setPhonePrice(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter New Phone Price"
            />
            <input
              onKeyUp={(event) => {
                setPhoneQty(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter New Phone Qty"
            />
            <button className="btn btn-primary">Save Phone</button>
          </form>
        </div>
      ) : null}

      {editModalIndex == true ? (
        <div
          className="addModal d-flex justify-content-center align-items-center"
          onClick={() => {
            setEditModalIndex(false);
          }}
        >
          <form
            onSubmit={handleSave}
            onClick={(event) => event.stopPropagation()}
            className=" animate__animated animate__fadeInDown bg-white gap-2 rounded border shadow col-12 col-md-6 p-3 d-flex flex-column"
          >
            <div
              className="col-12 d-flex align-items-center justify-content-between"
              onClick={() => {
                setEditModalIndex(false);
              }}
            >
              <h2>Edit New Phone</h2>
              <FaWindowClose className="text-danger fs-2" />
            </div>
            <input
              defaultValue={phoneName}
              onKeyUp={(event) => {
                setPhoneName(event.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Enter New Phone Name"
            />
            <input
              defaultValue={phonePrice}
              onKeyUp={(event) => {
                setPhonePrice(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter New Phone Price"
            />
            <input
              defaultValue={phoneQty}
              onKeyUp={(event) => {
                setPhoneQty(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter New Phone Qty"
            />
            <button className="btn btn-warning">Save Changes</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
