import './lib/Helpers'
import { coefficientsToString, decimalToString } from './lib/Helpers';

function getPolynomialParams() {
    return {
        maxAPR: decimalToString('0.50'), // 50%
        coefficients: coefficientsToString([0, 20, 0, 0, 0, 0, 20, 60]),
    };
    // return {

    //     maxAPR: decimalToString('1.00'), // 100%
    //     coefficients: coefficientsToString([0, 10, 10, 0, 0, 80]),
    // };
}

function getDoubleExponentParams() {
    return {
        maxAPR: decimalToString('1.00'), // 100%
        coefficients: coefficientsToString([20, 20, 20, 20, 20]),
    };
}


function getDaiPriceOracleDeviationParams() {

    return {
        denominator: decimalToString('1.00'),
        maximumPerSecond: decimalToString('0.0001'),
        maximumAbsolute: decimalToString('0.01'),
    };
}
// return {
//   denominator: decimalToString('1.00'),
//   maximumPerSecond: decimalToString('0.0001'),
//   maximumAbsolute: decimalToString('0.01'),
// };
//   }

let res = getDoubleExponentParams()
console.log(res)
res = getPolynomialParams()
console.log(res)
let res2 = getDaiPriceOracleDeviationParams()
console.log(res2)