import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import NavbarPage from "../Layout/Navbar/NavbarPage";

const Homepage = () => {
  const [userdata, setUserdata] = useState([]);
  const [pagenumber, setPagenumber] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const navigate = useNavigate();

  const usersPerPage = 4;
  const pageVisited = pagenumber * usersPerPage;
  const pageCount = Math.ceil(userdata.length / usersPerPage);

  useEffect(() => {

    console.log("Home page is mounted");

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) =>{
        setUserdata(res.data)
        setSearchedData(res.data)
      } 
     
      );
  },[]);

  const handlePageClicked = ({ selected }) => {
    setPagenumber(selected);
  };

  const UserTodoFunc = (user) => {
    navigate("/todo", { state: user });
  };

  const searchUser = (event) => {
    const search = event.target.value;
   // console.log(event.target.value)
    if (search !== "") {
      var newUserList = userdata.filter((val) => {
        if (val.name.toLowerCase().includes(search.toLowerCase())) {
          return val;
        }
      });
      //console.log(newUserList)
      setSearchedData(newUserList);
    } else {
      setSearchedData(userdata)
    }
  };
  return (
    <>
     <NavbarPage />
      <Container className="paddingcss">
        <Row>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="form-control "
              onChange={searchUser}
            />
          </div>
        </Row>
        <Row className="paddingcss1 ">
          <Table
            className="shadow p-3 mb-5 bg-body rounded tablecss text-center"
            /* striped */
            bordered
            hover
            borderless
            responsive
          >
            <thead className="tablehead">
              <tr>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Address</th>
                <th>Website</th>
                <th>Company Name</th>
              </tr>
            </thead>
            <tbody>
              {searchedData.length>0?searchedData
                  .slice(pageVisited, pageVisited + usersPerPage)
                  .map((user) => (
                    <tr key={user.id}>
                      <td onClick={() => UserTodoFunc(user)}>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.address.street},{user.address.suite},
                        {user.address.city},{user.address.zipcode}
                      </td>
                      <td>{user.website}</td>
                      <td>{user.company.name}</td>
                    </tr>
                  )):
                  <tr>
                    <td colSpan={6}>No Data Found</td>
                  </tr>
                  }
            </tbody>
          </Table>
        </Row>

        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={handlePageClicked}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
};

export default Homepage;
