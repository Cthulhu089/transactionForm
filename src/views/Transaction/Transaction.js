import React, { useEffect, useState } from "react";
import "./Transaction.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomContainer from "../../components/CustomContainer/CustomContainer";
import CachedIcon from "@material-ui/icons/Cached";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

import { connect } from "react-redux";

const Transaction = () => {
  const [account, setAccount] = useState("");
  return (
    <div className="main-container">
      <CustomContainer
        icon={<CachedIcon />}
        title={"Make Transfer"}
        className="form-container"
      >
        <div>
          <CustomInput
            id="account"
            label="from account"
            onChange={(value) => {
              setAccount(value);
            }}
            value={account}
            disabled={false}
          />
          <CustomInput
            id="account"
            label="from account"
            onChange={(value) => {
              setAccount(value);
            }}
            value={account}
            disabled={false}
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
