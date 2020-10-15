import React from "react";
import CustomTransactionCard from "../../../components/CustomTransactionCard/CustomTransactionCard";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import BackspaceSharpIcon from "@material-ui/icons/BackspaceSharp";
import isEmpty from "lodash/isEmpty";

const TransactionCard = ({
  transferList,
  onClickFilter,
  onClickClearFilter,
  searchValue,
  onChangeSearchBy,
  formatter
}) => {
  return (
    <div className="transaction-list">
      <div className="filter-section">
        <CustomInput
          id="search"
          className="search-input"
          label="Search by typing"
          onChange={(value) => {
            onChangeSearchBy(value);
          }}
          error={false}
          value={searchValue}
          disabled={false}
          InputProps={{
            "aria-label": "to account",
          }}
        />
        <h4 className="sort-label">Sort by</h4>
        <div className="buttons-section">
          <CustomButton
            ghost
            label="by date"
            onClick={() => {
              onClickFilter("date");
            }}
          />
          <CustomButton
            ghost
            label="beneficiary"
            onClick={() => {
              onClickFilter("account");
            }}
          />
          <CustomButton
            ghost
            label="Amount"
            onClick={() => {
              onClickFilter("amount");
            }}
          />
        </div>
        <BackspaceSharpIcon
          className="clear-filter"
          onClick={() => {
            onClickClearFilter();
          }}
        />
      </div>
      <div className="list-section">
        {isEmpty(transferList) ? (
          <h3>No data to show</h3>
        ) : (
          transferList.map((item, index) => (
            <CustomTransactionCard
              key={`${item.date}${item.account}${index}`}
              date={item.date}
              description={item.description}
              account={item.account}
              amount={formatter.format(item.amount)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
