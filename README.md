# Volume Weighted Average Price

## Introduction

The methodology discussed in this paper aims towards achieving the goal of optimizing a given trade order for a given capital, at a given instance. When the model is requested for the best optimal exchange for a given trade capital, the alogrithm analyses the Level 2 Order Book data for various exchanges and selects the best exchange among the available exchanges based Volume Weighted Average Price method. Also, the paper introduces another alternative method of considering Volume Weighted Standard Deviation which considers the exchanges with tighter bid/ask spreads as optimal exchange to trade.

## Methodology

Considering the price of the order book data for different volumes as the pivot colummn and volumes for each underlying price as their weights, the weighted average is calculated using the following formula:


While considering the exchange with the lowest average price might seem to provide the best solution for the trade, it is also important to consider market volatility as one of the important constraint. As Limit orders with wider spreads are prone to the danger of sudden large market movements with large market orders over exchanges with such wider spreads. Hence volatility of an exchange is also to be considered. The Volume Weighted Standard Deviation formula is provided below:



## Drawbacks and future improvements
