import React, { useEffect, useState } from "react";
import "./Transaction.css";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import CustomTransactionCard from "../../components/CustomTransactionCard/CustomTransactionCard";
import CachedIcon from "@material-ui/icons/Cached";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";

const Transaction = () => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
  const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
  const [transferList, setTransferList] = useState([
    {
      date: "10/14/2020",
      account: "The tea Company",
      description: "Card payment",
      amount: "82.02",
    },
  ]);
  const validateForm = () => {
    let isValid = true;
    if (
      regex.test(amount) === false ||
      amount === "0.00" ||
      amount === 0 ||
      amount === "0"
    ) {
      setAmountError(true);
      isValid = false;
    }
    if (toAccount === "") {
      setToAccountError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleOnchangeAmount = (value) => {
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

  const handleOnTransfer = async () => {
    setShowLoading(true);
    const totalAfterTransfer = totalAmount - parseFloat(amount);
    setTotalAmount(totalAfterTransfer);
    setAccount(`Free checking (4692) ${totalAfterTransfer}`);
    setAmount("0.00");
    setToAccount("");
    setShowLoading(false);

    await setTransferList([
      ...transferList,
      {
        date: moment().format("MM/DD/YYYY"),
        account: toAccount,
        description: "Card payment",
        amount: parseFloat(amount),
      },
    ]);

    setShowConfirmationModal(false);
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
              if (validateForm() === true) {
                setShowConfirmationModal(true);
              }
            }}
          />
        </div>
      </CustomContainer>

      <CustomContainer
        icon={<BusinessCenterIcon />}
        title={"Recent Transaction"}
        className="list-container"
      >
        <div className="transaction-list">
          {transferList.map((item, index) => (
            <CustomTransactionCard
              date={item.date}
              description={item.description}
              account={item.account}
              amount={item.amount}
            />
          ))}
        </div>
      </CustomContainer>
      <CustomModal
        title="Transaction Confirmation"
        onOk={() => {
          handleOnTransfer();
        }}
        visible={showConfirmationModal}
        loading={showLoading}
        onCancel={() => {
          setShowConfirmationModal(false);
        }}
        content={`You will be transferring to ${toAccount} ${formatter.format(
          amount
        )}`}
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
