# Volume Weighted Average Price

## Introduction

The methodology discussed in this paper aims towards achieving the goal of optimizing a given trade order for a given capital, at a given instance. When the model is requested for the best optimal exchange for a given trade capital, the alogrithm analyses the Level 2 Order Book data for various exchanges and selects the best exchange among the available exchanges based Volume Weighted Average Price method. Also, the paper introduces another alternative method of considering Volume Weighted Standard Deviation which considers the exchanges with tighter bid/ask spreads as optimal exchange to trade.

## Methodology

Considering the price of the order book data for different volumes as the pivot colummn and volumes for each underlying price as their weights, the weighted average is calculated using the following formula:

### `VWAP = (Sum(VolumeBid*OrderPriceBid)+Sum(VolumeAsk*OrderPriceAsk))/(SUM(VolumeBid)+SUM(VoumeAsk))`

While considering the exchange with the lowest average price might seem to provide the best solution for the trade, it is also important to consider market volatility as one of the important constraint. As Limit orders with wider spreads are prone to the danger of sudden large market movements with large market orders over exchanges with such wider spreads. Hence volatility of an exchange is also to be considered. The Volume Weighted Standard Deviation formula is provided below:

### `VWSD = (SUM((OrderPriceBid*VolumeBid-VWAP*VolumeBid)^2)+SUM((OrderPriceAsk*VolumeAsk-VWAP*VolumeAsk)^2))+SUM(VolumeAsk-VWAP)^2)/(SUM(VolumeBid)+SUM(VolumeAsk))`

## Drawbacks and future improvements

1. The method follows the generalized approach of estimating the best price providing by the exchange considering the Level 2 order book data parameters as input values. The method ignores the consideration of market orders which are to be considered as one of the main factors driving the price of underlying assets. When there are such missing parameters in the estimation procedure more sophisticated estimated techniques such as logistic regression, log normal estimation, neural networks can be replaced instead of the Volume Weighted Average method followed in this paper, keeping rest of the modules similar.
2. Similarly standard deviation method followed in this paper is under the assumption that there is a constant deviation of order book data ovevr time. While in the real world scenario the markets are highly volatile and the volatility itself is said to exhibit randomness called heteroskedasticity and are said to follow Brownian distribution rather than the general Normal distribution. The varying volatility can me much accurately estimated using technique like GARCH where the model is able to estimate the volatility (standard deviation) varying with respect to time parameter.
3. There could be a numerous techniques in reaching the optimal price for a exchange. The current procedure in paper only gives the estimated optimal price as a single trade. In reality the limit orders are fulfilled and replaced continously with new limit orders and the more probable solution of fulfilling the limit orders in as series of buy/sell orders cannot be performed by the current model. Reinforcement learning techniques that are used in innovative automated technologies such as Proximal Policy Optimization, Deterministic Deep Policy Gradient algorithms are capable of reacting according to the market trends and able to take actions of buy and sell in series considering the global goal of optimizing the buy average of input capital.
