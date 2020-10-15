import React, { useState } from "react";
import "./Transaction.css";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import CachedIcon from "@material-ui/icons/Cached";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import TransactionCard from "./components/TransactionCard";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";

const Transaction = () => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  const [totalAmount, setTotalAmount] = useState(5824.76);
  const [account, setAccount] = useState(
    `Free checking (4692) ${formatter.format(totalAmount)}`
  );
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [amountError, setAmountError] = useState(false);
  const [toAccountError, setToAccountError] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [sortType, setSortType] = useState("ASC");
  const [filterOption, setFilterOption] = useState("");
  const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
  const [searchValue, setSearchValue] = useState("");
  const [transferList, setTransferList] = useState([
    {
      date: "10/14/2020",
      account: "The tea Company",
      description: "Card payment",
      amount: 82.02,
    },
    {
      date: "10/13/2020",
      account: "The tea Company",
      description: "Card payment",
      amount: 81.02,
    },
    {
      date: "10/12/2020",
      account: "The tea Company",
      description: "Card payment",
      amount: 80.02,
    },
    {
      date: "10/11/2020",
      account: "The tea Company",
      description: "Card payment",
      amount: 79.02,
    },
  ]);
  const [transferListTemp, setTransferListTemp] = useState(transferList);
  const [errorList, setErrorList] = useState([]);

  const validateForm = () => {
    let isValid = true;
    let total = totalAmount - parseFloat(amount);
    let errorArray = [];
    if (
      regex.test(amount) === false ||
      amount === "0.00" ||
      amount === 0 ||
      amount === "0"
    ) {
      setAmountError(true);
      errorArray.push('Validate Amount');
      isValid = false;
    }
    if (toAccount === "") {
      setToAccountError(true);
      errorArray.push('Validate Account');
      isValid = false;
    }

    if (total < -500 || amount <= -500) {
      errorArray.push('Please check the balance on your Account');
      isValid = false;
    }
    setErrorList(errorArray);
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
    setErrorList([]);
  };

  const handleOnchangeToAccount = (value) => {
    if (value !== "") {
      setToAccount(value);
      setToAccountError(false);
    } else {
      setToAccountError(true);
    }
    setErrorList([]);
  };

  const handleOnTransfer = async () => {
    setShowLoading(true);
    const totalAfterTransfer = totalAmount - parseFloat(amount);
    setTotalAmount(totalAfterTransfer);
    setAccount(`Free checking (4692) ${totalAfterTransfer}`);
    setAmount("0.00");
    setToAccount("");

    await setTransferList([
      ...transferList,
      {
        date: moment().format("MM/DD/YYYY"),
        account: toAccount,
        description: "Card payment",
        amount: parseFloat(amount),
      },
    ]);

    await setTransferListTemp([
      ...transferList,
      {
        date: moment().format("MM/DD/YYYY"),
        account: toAccount,
        description: "Card payment",
        amount: parseFloat(amount),
      },
    ]);
    setShowLoading(false);
    setShowConfirmationModal(false);
  };

  const handleOnClickFilter = (filter) => {
    let sort = sortType;
    let newList = transferList;
    if (filter === filterOption && sort === "DESC") {
      sort = "ASC";
    } else if (filter === filterOption && sort === "ASC") {
      sort = "DESC";
    }
    if (filter === "date") {
      newList = sortBy(transferList, (a) => {
        return moment(a[filter]).format("MM"), moment(a[filter]).format("DD");
      });
    } else {
      newList = sortBy(transferList, (a) => a[filter]);
    }
    if (sort === "DESC") {
      console.log(2);
      newList.reverse();
    }
    setTransferList(newList);
    setSortType(sort);
    setFilterOption(filter);
  };

  const handleOnClickClearFilter = () => {
    setTransferList(transferListTemp);
    setSortType("ASC");
    setFilterOption("");
    setSearchValue("");
  };

  const handleOnChangeSearchBy = (value) => {
    const tempList = isEmpty(transferList) ? transferListTemp : transferList;

    setSearchValue(value);
    if (value === "") {
      handleOnClickClearFilter();
    } else {
      const newFilterList = tempList.reduce((newList, item) => {
        if (
          item["account"]
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        ) {
          newList.push(item);
        }
        return newList;
      }, []);
      setTransferList(newFilterList);
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
              "aria-label": `From account: Free checking (4692) ${formatter.format(
                totalAmount
              )}`,
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
          {isEmpty(errorList) === false &&
            errorList.map((item, index) => <p key={index} className='error-label'> {item} </p>)}
        </div>
      </CustomContainer>

      <CustomContainer
        icon={<BusinessCenterIcon />}
        title={"Recent Transaction"}
        className="list-container"
      >
        <TransactionCard
          transferList={transferList}
          onClickFilter={(filter) => {
            handleOnClickFilter(filter);
          }}
          onClickClearFilter={() => {
            handleOnClickClearFilter();
          }}
          onChangeSearchBy={(value) => {
            handleOnChangeSearchBy(value);
          }}
          searchValue={searchValue}
          formatter={formatter}
        />
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
