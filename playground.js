// offsets the decimal point given an offset
function offset(number, offset) {
  number = Math.abs(number);

  let intg = number.toString().split('.')[0] || 0;
  let frac = number.toString().split('.')[1] || '';

  return (offset < 0) ? 
  [intg.slice(0, offset) == '' ? '0' : intg.slice(0, offset), "0".repeat(Math.max(0, Math.abs(offset) - intg.length)) + intg.slice(offset) + frac].join('.') :
  [intg + frac.slice(0, offset) + "0".repeat(Math.max(0, Math.abs(offset) - frac.length)), frac.slice(offset)].join('.');
}

// displaces a number by a given exponent (turns exponent to 0)
function displace10(mantissa, exponent) {
  result = (exponent == 0) ? mantissa : offset(mantissa, exponent);
  return (mantissa < 0) ? "-" + result : result;
}

// converts a number to its binary equivalent
function binary(num) {
  return num.toString(2);
}

// displace the decimal point to follow ^-1
function normalize(number) {
  if (number[0] == '-') number = number.substring(1);
  let position = (number.indexOf(".") == -1) ? 
    number.length : number.indexOf(".");
  let intg = number.toString().split('.')[0] || 0;
  let frac = number.toString().split('.')[1] || '';

  let exponent = parseFloat(intg) != 0 ? 
    intg.indexOf("1") + 1 - position : frac.indexOf("1") + 1;

  let result = number.replace(".", "");
  return [parseFloat(result.substring(0, position + exponent) +   
    "." + result.substring(position + exponent)).toString(), -exponent];
}

function print_results(n, b, e) {
  let displaced = displace10(n, e);
  let displaced_binary = (b == 10) ? binary(parseFloat(displaced)) : displaced.toString();
  let [normalized, exponent] = normalize(displaced_binary);

  let sign = n < 0 ? 1 : 0;
  let exponent_bits = "", mantissa = "";

  if (exponent + 1023 < 0) {
    console.log("Case: Denormalized");
    exponent_bits = "0".repeat(11);
    mantissa = offset(n, exponent + 1023 - 1).split(".")[1].padEnd(52, "0");
  } else if (exponent > 1023) {
    console.log("Case: Infinity");
    exponent_bits = "1".repeat(11);
    mantissa = "0".repeat(52);
  } else {
    console.log("Case: Default");
    exponent_bits = (exponent + 1023).toString(2).padStart(11, "0");
    mantissa = normalized.substring(Math.max(normalized.indexOf(".") + 1, 1)).padEnd(52, "0");
  }

  console.log(`\nInput value: ${n} x ${b}^${e}`)
  console.log(`Binary conversion: ${displaced_binary}`);
  console.log(`Normalized: ${normalized} x ${2}^${exponent}\n`);

  console.log(`Raw binary representation: \n${sign} ${exponent_bits} ${mantissa}\n`);
  console.log(`Hex representation: 0x${parseInt(sign + exponent_bits + mantissa, 2).toString(16).toUpperCase()}\n`);
}

// test cases
// print_results(39.0, 10, 0);
// print_results(1812.5, 10, -2);
// print_results(10.0101, 2, 2);

// print_results(-100.111, 2, -7);
// print_results(4.0, 10, 0);

// print_results(-1, 2, -1022)
// print_results(1, 2, -1022)

//print_results(-1.1110, 2, -1026);
//print_results (1.111, 2, 1024);