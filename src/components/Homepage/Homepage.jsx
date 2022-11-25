import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import NavbarPage from "../Layout/Navbar/NavbarPage";
import FooterPage from "../Layout/Footer/FooterPage";

const Homepage = () => {
  const [userdata, setUserdata] = useState([]);
  const [pagenumber, setPagenumber] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const usersPerPage = 4;
  const pageVisited = pagenumber * usersPerPage;
  const pageCount = Math.ceil(userdata.length / usersPerPage);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUserdata(res.data));
  }, []);

  const handlePageClicked = ({ selected }) => {
    setPagenumber(selected);
  };

  const UserTodoFunc = (user) => {
    navigate("/todo", { state: user });
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
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            
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
              {userdata &&
                userdata
                  .filter((user) => {
                    if (search === "") {
                      return user;
                    } else if (
                      user.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return user;
                    }
                  })
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
                  ))}
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
      <FooterPage />
    </>
  );
};

export default Homepage;
