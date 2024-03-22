// displaces a number by a given exponent (turns exponent to 0)
function displace10(mantissa, exponent) {
  const isNegative = mantissa < 0;
  mantissa = Math.abs(mantissa);

  let intg = mantissa.toString().split('.')[0] || 0;
  let frac = mantissa.toString().split('.')[1] || '';

  if (exponent == 0) result = mantissa;
  else result = exponent < 0 ? 
    [intg.slice(0, exponent), "0".repeat(Math.max(0, Math.abs(exponent) - intg.length)) + intg.slice(exponent) + frac].join('.') :
    [intg + frac.slice(0, exponent) + "0".repeat(Math.max(0, Math.abs(exponent) - frac.length)), frac.slice(exponent)].join('.');

  return isNegative ? result * -1 : result * 1;
}

// converts a number to its binary equivalent
function binary(num) {
  return num.toString(2);
}

// displace the decimal point to follow ^-1
function normalize(number) {
  let position = (number.indexOf(".") == -1) ? 
    number.length : number.indexOf(".");
  let intg = number.toString().split('.')[0] || 0;
  let frac = number.toString().split('.')[1] || '';

  let exponent = parseFloat(intg) != 0 ? 
    intg.indexOf("1") + 1 - position : frac.indexOf("1") + 1;

  let result = number.replace(".", "");
  return [result.substring(0, position + exponent) +   
    "." + result.substring(position + exponent), -exponent];
}

function print_results(n, b, e) {

  let displaced = displace10(n, e);
  let displaced_binary = (b == 10) ? binary(displaced) : displaced.toString();
  let [normalized, exponent] = normalize(displaced_binary);

  let sign = n < 0 ? 1 : 0;
  let exponent_bits = (1023 + exponent).toString(2).padStart(8, "0");
  let mantissa = normalized.substring(1).replace(".", "").padEnd(52, "0");

  console.log(`\nInput value: ${n} x ${b}^${e}`)
  console.log(`Binary conversion: ${displaced_binary}`);
  console.log(`Normalized: ${normalized} x ${b}^${exponent}\n`);

  console.log(`Raw binary representation: \n${sign} ${exponent_bits} ${mantissa}\n`);
  console.log(`Hex representation: 0x${parseInt(sign + exponent_bits + mantissa, 2).toString(16)}\n`);
}

// test cases
print_results(39, 10, 0);
print_results(1812.5, 10, -2);
print_results(10.0101, 2, 2);