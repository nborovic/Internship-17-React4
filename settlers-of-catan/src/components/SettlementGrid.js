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

console.log(createSettlementGrid(3));

const SettlementGrid = () => (
  <div className="settlement-grid">
    {createSettlementGrid(3).map((row, rowIndex) => (
      <div key={rowIndex} className="settlement-row">
        {row.map((settlement, settlementIndex) => (
          <div
            key={settlementIndex}
            className={`settlement ${settlement.location}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SettlementGrid;
