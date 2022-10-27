import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const PhoneList = ({ phoneList }) => {
  return (
    // create a table of all phones use bootstrap
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {phoneList.map((phone) => {
            return (
              <tr key={phone.id}>
                <td>{phone.model}</td>
                <td>{phone.price}</td>
                <td>{phone.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    // <div>
    //   {phoneList.map((phone) => (
    //     <div>
    //       <p>{phone.model}</p>
    //       <p>{phone.price}</p>
    //       <p>{phone.date}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default PhoneList;
