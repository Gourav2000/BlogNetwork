import React, { useState, useContext } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { RiImageEditFill } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti'
import { MdDownloadForOffline } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BackendURLs } from "../utitlity/backendURLs";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Parser } from '@json2csv/plainjs';

const MicrostructureTable = () => {


  const [microstructures, setmicrostructures] = useState([
    {
      name: "MetalSulphate",
      description: "It is a sulphate of a metal",
      image: "https://www.deangroup-int.co.uk/wp-content/uploads/2021/09/Titanium-metal-alloy-used-in-industry-super-resistant-metal-1024x683.jpg",
      composition: [
        {
          name: "Tungsten",
          percentage: 20,
        },
        {
          name: "Nickel",
          percentage: 67
        }
      ]
    },
    {
      name: "MetalPhospate",
      description: "It is a phospate of a metal",
      image: "https://www.deangroup-int.co.uk/wp-content/uploads/2021/09/Titanium-metal-alloy-used-in-industry-super-resistant-metal-1024x683.jpg",
      composition: [
        {
          name: "Iron",
          percentage: 26,
        },
        {
          name: "Titanium",
          percentage: 66
        }
      ]
    }
  ]);

  const navigate = useNavigate()

  const [selectedmicrostructure, setSelectedmicrostructure] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [composition, setcomposition] = useState([])
  const [image, setImage] = useState(null)
  const [imageSrc, setImageSrc] = useState('')
  const [mIndex, setMIndex] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const { currentUser } = useContext(AuthContext)


  const dropdownOptions = [
    'Steels',
    'Ni superalloys',
    'Co superalloys',
    'Ti alloys',
    'W alloys',
    'Al alloys',
    'Cu alloys',
    'Mg alloys',
    'Zn alloys',
    'Nb alloys'
  ];


  const selectmicrostructure = (microstructure, mIndex) => {
    setSelectedmicrostructure(microstructure);
    setName(microstructure.name);
    setDescription(microstructure.description);
    setCategory(microstructure.category)
    setcomposition([...microstructure.composition])
    setImageSrc(`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${microstructure.image}`)
    setMIndex(mIndex)
  };
  const clearSelection = () => {
    setName("");
    setDescription("");
    setcomposition([])
    setCategory('')
    setImageSrc('')
    setImage(null)
    setMIndex()
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BackendURLs.MICROSTRUCTURES}`);
      setmicrostructures([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    fetchData();
  }, [openModal]);

  const clearModal = () => {
    setName("")
    setDescription("")
    setcomposition([])
    setImage(null)
    setImageSrc('')
    setCategory('')
  }
  const addUpdateMicrostructure = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("description", description)
      formData.append("composition", JSON.stringify(composition))
      formData.append("category", category)
      formData.append("uid", currentUser.uid)
      image && formData.append("image", image);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      selectedmicrostructure == null ? await axios.post(`${BackendURLs.MICROSTRUCTURES}`, formData) : await axios.put(`${BackendURLs.MICROSTRUCTURES}/${selectedmicrostructure.id}`, formData)
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }



  function exportCSVFile(csvData, exportedFilenmae) {

    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  function exportJsonFile(jsonData, exportedFilenmae) {

    var blob = new Blob([JSON.stringify(jsonData)], { type: 'text/json;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return (
    <div className="microstructure-container">
      <div className="microstructure-table">
        <div className="heading">
          <h2>List of Microstructures</h2>
          <div className="headingButtons">

            <button onClick={() => {
              setOpenModal(true)
            }}>Add Microstructure <IoMdAddCircleOutline /></button>

            <button onClick={() => {
              try {
                const parser = new Parser();
                const csv = parser.parse(microstructures);
                exportCSVFile(csv, "MicrostructureData.csv")
              } catch (err) {
                console.error(err);
              }
            }}>Download CSV <MdDownloadForOffline /></button>

            <button onClick={() => {
              try {
                exportJsonFile(microstructures, "MicrostructureData.json")
              } catch (err) {
                console.error(err);
              }
            }}>Download Json <b>{" { }"}</b></button>

          </div>
        </div>
        <table className="microstructure-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Composition</th>
              <th>Image</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {microstructures.map((microstructure, index) => (
              <tr key={index}>
                <td>{microstructure.name}</td>
                <td>{microstructure.description}</td>
                <td>{microstructure.category}</td>
                <td>
                  {microstructure.composition.map((element, index) => (
                    <tr key={index}>
                      <td>{element.name}</td>
                      <td>{element.percentage}%</td>
                    </tr>
                  ))}
                </td>
                <td>
                  <img
                    src={`${BackendURLs.GET_IMAGE_BY_IMAGEID}/${microstructure.image}`}
                    alt={microstructure.name}
                    className="microstructure-image"
                  />
                </td>
                <td >
                  <div id="Icons"><RiEditBoxLine onClick={() => { selectmicrostructure(microstructure, index); setOpenModal(true) }} className='editIcon' /><RiDeleteBin6Line onClick={async () => {
                    await axios.delete(`${BackendURLs.MICROSTRUCTURES}/${microstructure.id}`)
                    fetchData()
                  }} className='deleteIcon' /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
                setSelectedmicrostructure(null);
              }}
            >
              X
            </button>
          </div>
          {selectedmicrostructure && (
            <div className="edit-microstructure">
              <h2>Edit microstructure</h2>
              <div>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-field"
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select
                    id="dropdown"
                    className='input-field'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {dropdownOptions.map((option, index) => {
                      if (option === category)
                        return <option value={option} selected>{option}</option>
                      else
                        return <option value={option}>{option}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label>Composition:</label>
                  <tr key={-1}>
                    <th>Name</th>
                    <th>Percentage</th>
                    <td><button onClick={() => { composition.push({}); setcomposition([...composition]) }}>Add Element <IoMdAddCircleOutline /></button></td>
                  </tr>
                  {composition.map((element, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={element.name}
                          onChange={(e) => {
                            composition[index]['name'] = e.target.value;
                            setcomposition([...composition])
                          }}
                          className="input-field" />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={element.percentage}
                          onChange={(e) => {
                            composition[index]['percentage'] = parseInt(e.target.value);
                            setcomposition([...composition])
                          }}
                          className="input-field" />
                      </td>
                      <td>
                        <TiDeleteOutline onClick={() => { composition.splice(index, 1); setcomposition([...composition]) }} className='deleteIcon' />
                      </td>

                    </tr>
                  ))}
                </div>
                <div className='img'>
                  <label>Image:</label>
                  <div className="imgrow">
                    <img
                      src={imageSrc}
                      className="microstructure-image"
                    />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      name=""
                      onChange={(e) => {
                        setImage(e.target.files[0])
                        setImageSrc(URL.createObjectURL(e.target.files[0]))
                      }}
                    />
                    <RiImageEditFill className='updateIcon' onClick={() => {
                      document.getElementById('file').click()
                    }} />
                  </div>
                </div>
                <div className='save'>
                  <button onClick={() => {
                    var sum = 0
                    composition.forEach((obj) => {
                      console.log(obj.percentage)
                      sum = sum + obj.percentage;
                    })
                    if (sum > 100) {
                      alert(`sum of composition percentage should not be more than 100 yours is ${sum}`)
                      return
                    }
                    // let ele = {
                    //   name: name,
                    //   description: description,
                    //   composition: composition,
                    //   image: imageSrc
                    // }
                    // microstructures[mIndex] = ele
                    // setmicrostructures([...microstructures])
                    addUpdateMicrostructure()
                    setOpenModal(false)
                    setSelectedmicrostructure(null)
                  }}>Save</button>
                </div>
              </div>

            </div>)}

          {!selectedmicrostructure && (
            <div className="edit-microstructure">
              <h2>Add microstructure</h2>
              <div>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-field"
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select
                    id="dropdown"
                    className='input-field'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {dropdownOptions.map((option, index) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Composition:</label>
                  <tr key={-1}>
                    <th>Name</th>
                    <th>Percentage</th>
                    <td><button onClick={() => { composition.push({}); setcomposition([...composition]) }}>Add Element <IoMdAddCircleOutline /></button></td>
                  </tr>
                  {composition.map((element, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={element.name}
                          onChange={(e) => {
                            composition[index]['name'] = e.target.value;
                            setcomposition([...composition])
                          }}
                          className="input-field" />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={element.percentage}
                          onChange={(e) => {
                            composition[index]['percentage'] = parseInt(e.target.value);
                            setcomposition([...composition])
                          }}
                          className="input-field" />
                      </td>
                      <td>
                        <TiDeleteOutline onClick={() => { composition.splice(index, 1); setcomposition([...composition]) }} className='deleteIcon' />
                      </td>

                    </tr>
                  ))}
                </div>
                <div className='img'>
                  <label>Image:</label>
                  <div className="imgrow">
                    {imageSrc && (<img
                      src={imageSrc}
                      className="microstructure-image"
                    />)}
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      name=""
                      onChange={(e) => {
                        setImage(e.target.files[0])
                        setImageSrc(URL.createObjectURL(e.target.files[0]))

                      }}
                    />
                    <RiImageEditFill className='updateIcon' onClick={() => {
                      document.getElementById('file').click()
                    }} />
                  </div>
                </div>
                <div className='save'>
                  <button onClick={() => {
                    var sum = 0
                    composition.forEach((obj) => {
                      console.log(obj.percentage)
                      sum = sum + obj.percentage;
                    })
                    if (sum > 100) {
                      alert(`sum of composition percentage should not be more than 100 yours is ${sum}`)
                      return
                    }
                    // let ele = {
                    //   name: name,
                    //   description: description,
                    //   composition: composition,
                    //   image: imageSrc
                    // }
                    // microstructures.push(ele)
                    // setmicrostructures([...microstructures])
                    addUpdateMicrostructure();
                    setOpenModal(false)
                    clearModal()
                    setSelectedmicrostructure(null)

                  }}>Save</button>
                </div>
              </div>

            </div>)}

        </div>
      </div>
      }



    </div>
  );
};

export default MicrostructureTable;
