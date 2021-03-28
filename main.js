data = {
    bitmex: {
        bid: [[56175.96, 1], [56173.76, 2], [56173.74, 1], [56172.88, 1], [56169.36, 1], [56167.66, 1], [56165.84, 1]],
        ask: [[56205.18, 1], [56208.10, 1], [56209.18, 1], [56209.20, 1], [56210.86, 1], [56213.08, 1], [56213.72, 1]]
    },
    coinbase: {
        bid: [[56185.96, 1], [56183.76, 2], [56183.74, 1], [56182.88, 1], [56179.36, 1], [56177.66, 1], [56195.74, 1]],
        ask: [[56235.18, 1], [56203.10, 1], [56239.18, 1], [56249.20, 1], [56200.86, 1], [56223.08, 1], [56203.72, 1]]
    },
    etoro: {
        bid: [[56145.96, 1], [56143.76, 2], [56143.74, 1], [56142.88, 1], [56149.36, 1], [56147.66, 1], [56145.74, 1]],
        ask: [[56245.18, 1], [56243.10, 1], [56249.18, 1], [56289.20, 1], [56190.86, 1], [56183.08, 1], [56203.72, 1]]
    }
}
let buffer_list = {};
let best_buffer = 0;
capital = 1000000;
let commissioned_capital= capital-capital*4/100;

function Covariance(x, mean) {
    let cov_temp_sum = 0;
    let volume_temp = 0;

    for (i in x) {
        cov_temp_sum += (x[i][1] * x[i][0] - mean * x[i][1]) ** 2;
        volume_temp += x[i][1];
    }
    let variance = cov_temp_sum / volume_temp;
    let sd = Math.sqrt(variance);
    return sd;
}

try {
    for (key in data) {
        let bid_weight = 0;
        let ask_weight = 0;
        let volume_weight = 0;
        for (key2 in data[key]) {
            if (key2 == "bid") {
                for (i in data[key][key2]) {
                    data[key][key2].map(e => {
                        volume_weight += e[1];
                        bid_weight += e[0] * e[1];
                    }
                    );
                }
            }
            else if (key2 == "ask") {
                for (i in data[key][key2]) {
                    data[key][key2].map(e => {
                        volume_weight += e[1];
                        ask_weight += e[0] * e[1];
                    }
                    );
                }
            }
        }
        if (bid_weight != 0 && ask_weight != 0) {
            buffer_list[key] = (bid_weight + ask_weight) / volume_weight;
        }
    }
}
catch (e) {
    console.log("API Exception occurred", e);
}



let min = 0;
let init = true;
let keys = [];
try {
    let bid_covariances = {};
    let ask_covariances = {};
    let absolute_covariances = {};
    var sorted_prices = [];
    for (var key in buffer_list) {
        sorted_prices.push([key, buffer_list[key]]);
    }

    sorted_prices.sort(function (a, b) {
        return a[1] - b[1];
    });
    for (key in buffer_list) {
        
        bid_covariances[key] = Covariance(data[key]["bid"], buffer_list[key]);
        ask_covariances[key] = Covariance(data[key]["ask"], buffer_list[key]);
        let combined_list = data[key]["bid"].concat(data[key]["ask"]);
        absolute_covariances[key] = Covariance(combined_list, buffer_list[key]);
        
        if (init) {
            min = buffer_list[key];
        }
        if (min > buffer_list[key]) {
            min = buffer_list[key];
        }
    }
    for (key in buffer_list) {

        if (min == buffer_list[key]) {
            keys.push(key);
        }
    }
    console.log();
    if (keys.length >= 1) {
        if (keys.length == 1) {
            console.log("The best price is provided by the following exchange: " + keys[0] + ".");
        }
        else if (keys.length > 1) {
            console.log("The best price is provided by the following exchanges:");
            keys.map(e => {
                console.log(String(e).toUpperCase());
            });
        }
        console.log();
        console.log("The average expected buying cost would be : $" + String(min) + ".");
        console.log("Expected units holding after the trade: " + commissioned_capital/min);
        console.log();
    }

    if (Object.keys(buffer_list).length > 0) {
        console.log("Also based on minumum volume weighted deviation the following are TOP 3 exchanges with the average volume weighted expected prices, can also be considered as alternatives.");
        console.log();
        var sorted_variances = [];
        for (var key in buffer_list) {
            sorted_variances.push([key, absolute_covariances[key]]);
        }

        sorted_variances.sort(function (a, b) {
            return a[1] - b[1];
        });

        let counter = 0;
        for (key in sorted_variances) {

            console.log("Exchange: " + String(sorted_variances[key][0]).toUpperCase() + ". Price: $" + String(buffer_list[sorted_variances[key][0]]).toUpperCase()+".");
            console.log("Expected units holding after the trade: " + commissioned_capital/buffer_list[sorted_variances[key][0]]+". Standard deviation for the "+String(sorted_variances[key][0]).toUpperCase()+": "+String(sorted_variances[key][1]).toUpperCase());
            console.log();
            console.log();
            console.log();
            counter += 1;
            if (counter >= 3) {
                break;
            }
        }
    }

}
catch (e) {
    console.log("Error while data processing. Please check the dataset." + e);
}

