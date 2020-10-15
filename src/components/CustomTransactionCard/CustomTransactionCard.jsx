import React from "react";
import "./CustomTransactionCard.css";
import moment from "moment";
import store from "../../assets/images/store.jpg";

const CustomTransactionCard = ({ date, account, amount, description }) => {
  return (
    <div className="card-container">
      <div className="date-container">{`${moment(date).format("MMM")} ${moment(
        date
      ).format("DD")}`}</div>
      <img className="image-container" src={store} />
      <div className="description-container">
        <div>{account}</div>
        <div>{description}</div>
      </div>
      <div className="amount-container">{`-$${amount}`}</div>
    </div>
  );
};

export default CustomTransactionCard;
