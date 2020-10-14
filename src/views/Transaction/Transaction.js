import React, { useEffect, useState } from "react";
import "./Transaction.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import CachedIcon from "@material-ui/icons/Cached";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";

const Transaction = () => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0,
    //maximumFractionDigits: 0,
  });

  const [totalAmount, setTotalAmount] = useState(5824.76);
  const [totalAmountLabel, setTotalAmountLabel] = useState(
    formatter.format(totalAmount)
  );
  const [account, setAccount] = useState(
    `Free checking (4692) ${totalAmountLabel}`
  );
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState('0.00');

  const handleOnchangeAmount = () => {

  }

  return (
    <div className="main-container">
      <CustomContainer
        icon={<CachedIcon />}
        title={"Make Transfer"}
        className="form-container"
      >
        <div className="transaction-form">
          <CustomInput
            id="from-account"
            className="account-input"
            label="from account"
            onChange={(value) => {}}
            value={account}
            disabled={true}
            InputProps={{
              
            }}
          />
          <CustomInput
            id="to-account"
            className="to-account-input"
            label="to account"
            onChange={(value) => {
              setToAccount(value);
            }}
            value={toAccount}
            disabled={false}
            InputProps={{
              
            }}
          />
          <CustomInput
            id="amount"
            className="amount-input"
            label="Amount"
            onChange={(value) => {
              handleOnchangeAmount(value);
            }}
            value={amount}
            disabled={false}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
          <CustomButton
            type="primary"
            size={"large"}
            className={"submit-button"}
            label={"Submit"}
            onClick={() => {}}
          />
        </div>
      </CustomContainer>

      <CustomContainer
        icon={<BusinessCenterIcon />}
        title={"Recent Transaction"}
        className="list-container"
      >
        hola
      </CustomContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
