import React, { useEffect, useState } from "react";
import "./Transaction.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  const [amount, setAmount] = useState("0.00");
  const [amountError, setAmountError] = useState(false);
  const [toAccountError, setToAccountError] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleOnchangeAmount = (value) => {
    var regex = /^\d+(?:\.\d{0,2})$/;

    if (regex.test(value) || value === "") {
      setAmount(value);
      setAmountError(false);
    } else {
      setAmount(value);
      setAmountError(true);
    }
  };

  const handleOnchangeToAccount = (value) => {
    if (value !== "") {
      setToAccount(value);
      setToAccountError(false);
    } else {
      setToAccount(value);
      setToAccountError(true);
    }
  };

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
              "aria-label": `From account: Free checking (4692) ${totalAmountLabel}`,
            }}
          />
          <CustomInput
            id="to-account"
            className="to-account-input"
            label="to account"
            onChange={(value) => {
              handleOnchangeToAccount(value);
            }}
            error={toAccountError}
            value={toAccount}
            disabled={false}
            InputProps={{
              "aria-label": "to account",
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
            error={amountError}
            InputProps={{
              "aria-label": "amount input",
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <CustomButton
            type="primary"
            size={"large"}
            className={"submit-button"}
            label={"Submit"}
            onClick={() => {
              setShowConfirmationModal(true)
            }}
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
      <CustomModal
        title="Transaction Confirmation"
        onOk={() => {}}
        visible={showConfirmationModal}
        loading={showLoading}
        onCancel={() => {
          setShowConfirmationModal(false)
        }}
        content="Hola"
        cancelButtonType="link"
        cancelButtonLabel="go back"
        submitButtonLabel="transfer"
        submitButtonType="primary"
        showFooter
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
