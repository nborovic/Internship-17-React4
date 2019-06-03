import React from "react";

const createSettlementGrid = radius => {
  const min = radius;
  const max = radius * 2 - 1;
  const settlements = [];
  const secondHalf = [];
  let row = [];
  let reverseRow = [];

  for (let i = min; i <= max; i++) {
    for (let j = 1; j <= i * 2 + 1; j++) {
      row.push({
        location: j % 2 === 0 ? "top" : "aside"
      });
      reverseRow.push({ location: j % 2 === 0 ? "aside" : "top" });
    }

    settlements.push(JSON.parse(JSON.stringify(row)));
    secondHalf.unshift(JSON.parse(JSON.stringify(reverseRow)));
    row = [];
    reverseRow = [];
  }

  settlements.push(...secondHalf);

  return settlements;
};

const onClickHandler = () => {
  console.log("naselje!");
};

const SettlementGrid = props => (
  <div className="settlement-grid">
    {createSettlementGrid(props.radius).map((row, rowIndex) => (
      <div key={rowIndex} className="settlement-row">
        {row.map((settlement, settlementIndex) => (
          <div
            key={settlementIndex}
            className={`settlement ${settlement.location}`}
            onClick={e => onClickHandler()}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SettlementGrid;
