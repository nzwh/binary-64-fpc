// offsets the decimal point given an offset
function offset(number: number, offset: number) {
  number = Math.abs(number);
  let intg = number.toString().split('.')[0] || '0';
  let frac = number.toString().split('.')[1] || '';

  return (offset < 0) ? 
  [intg.slice(0, offset) == '' ? '0' : intg.slice(0, offset), "0".repeat(Math.max(0, Math.abs(offset) - intg.length)) + intg.slice(offset) + frac].join('.') :
  [intg + frac.slice(0, offset) + "0".repeat(Math.max(0, Math.abs(offset) - frac.length)), frac.slice(offset)].join('.');
}

// displaces a number by a given exponent (turns exponent to 0)
function displace10(mantissa: number, exponent: number): string {
  let result = (exponent == 0) ? Math.abs(mantissa) : offset(mantissa, exponent);
  return (mantissa < 0) ? "-" + result : "" + result;
}

// converts a number to its binary equivalent
function binary(number: number) {
  return number.toString(2);
}

// displace the decimal point to follow ^-1
function normalize(number: string): [string, number] {
  if (number[0] == '-') number = number.substring(1);
  let position = (number.indexOf(".") == -1) ? 
    number.length : number.indexOf(".");
  let intg = number.toString().split('.')[0] || '0';
  let frac = number.toString().split('.')[1] || '';

  let exponent = parseFloat(intg) != 0 ? 
    intg.indexOf("1") + 1 - position : frac.indexOf("1") + 1;

  let result = number.replace(".", "");
  return [result.substring(0, position + exponent).replace(/^0+/, '') +   
    "." + result.substring(position + exponent), -exponent];
}

function get_results(n: string, b: number, e: number): string[] {
  let negative = (n[0] == '-') ? "1" : "0";
  let number = parseFloat(n);

  let displaced = displace10(number, e);
  let displaced_binary = (b == 10) ? binary(parseFloat(displaced)) : displaced.toString();
  let [normalized, exponent] = normalize(displaced_binary);

  let sign = negative;
  let exponent_bits = "", mantissa = "";
  let s_case = "";

  if (number == 0) {
    s_case = "Zero";
    exponent_bits = "0".repeat(11);
    mantissa = "0".repeat(52);

  } else if (isNaN(number)) {
    s_case = "NaN";
    exponent_bits = "1".repeat(11);
    mantissa = "1".repeat(52);

  } else if ((b == 2 && e + 1023 < 0) || (b == 10 && e + 309 < 0)) {
    s_case = "Denormalized";
    exponent_bits = "0".repeat(11);
    mantissa = offset((b == 2) ? number : parseFloat(number.toString(2)), e + 1023 - 1).split(".")[1].padEnd(52, "0");

  } else if (e > 1023) {
    s_case = "Infinity";
    exponent_bits = "1".repeat(11);
    mantissa = "0".repeat(52);

  } else {
    s_case = "";
    exponent_bits = (exponent + 1023).toString(2).padStart(11, "0");
    mantissa = (!isNaN(parseFloat(normalized)) ? 
      normalized.substring(Math.max(normalized.indexOf(".") + 1, 1)) : "").padEnd(52, "0");
  }

  let hex = '0x' + (
  parseInt(sign + exponent_bits, 2).toString(16).toUpperCase() +
  parseInt(mantissa, 2).toString(16).toUpperCase().padEnd(13, "0")).padStart(16, "0");

  let n_binary = `${normalized} x ${2}^${exponent}`;

  return [displaced_binary, n_binary, sign, exponent_bits, mantissa, hex, s_case];
}

export { get_results };