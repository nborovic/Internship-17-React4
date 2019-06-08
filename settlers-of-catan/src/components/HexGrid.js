import React from "react";
import Hexagon from "./Hexagon";

import { updateHexagons } from "./../redux/actions/boardActions";
import { connect } from "react-redux";

const HexGrid = props => {
  return (
    <div className="hexgrid">
      {props.hexGrid.map((row, index) => (
        <div key={index} className="game__row">
          {row.map((hexagon, index) => (
            <Hexagon
              key={index}
              type={hexagon.type}
              value={hexagon.value}
              last={index === row.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  hexagons: state.board.hexagons
});

const mapDispatchToProps = {
  updateHexagons
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HexGrid);
