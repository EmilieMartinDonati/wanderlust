import { useState, useMemo } from "react";

import classNames from "classnames";

import { filterOptionsLabels } from "../../../actions/monitoring";

import { simpleCardContainer } from "../../commons/card.css";

import Card from "../../commons/Card";

const TabOptions = ({
  className,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className={classNames(simpleCardContainer, className)}>
      {filterOptionsLabels.map((card, index) => {
        return (
          <Card
            key={index}
            arr={filterOptionsLabels}
            index={index}
            onSelect={setSelectedTab}
            selected={selectedTab === card.tab}
            title={card.name}
          />
        );
      })}
    </div>
  );
};

export default TabOptions;
