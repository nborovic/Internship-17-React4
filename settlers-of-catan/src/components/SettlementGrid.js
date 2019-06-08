import React from "react";

const SettlementGrid = props => (
  <div className="settlement-grid">
    {props.settlementGrid.map((row, rowIndex) => (
      <div key={rowIndex} className="settlement-row">
        {row.map((settlement, settlementIndex) => (
          <div
            key={settlementIndex}
            className={`settlement ${settlement.location} ${
              settlement.player !== null ? settlement.player.name : null
            } ${settlement.type !== null ? settlement.type : null}`}
            onClick={() => props.settlementClickHandler(settlement.id)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SettlementGrid;
