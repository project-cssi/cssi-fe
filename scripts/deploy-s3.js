// console colors
const green = '\x1b[32m';
const blue = '\x1b[34m';
const red = '\x1b[31m';
const magenta = '\x1b[35m';
const reset = '\x1b[0m';

console.log(
  green,
  '-------------------- Starting ---------------------\n',
  reset
);
console.log(
  blue,
  '         CSSI FRONT END - AWS S3 deployment         \n',
  reset
);
console.log(
  green,
  '-------------------- ........ ---------------------\n',
  reset
);

const execSync = require('child_process').execSync;

const arg = process.argv[2] || 'default-s3'; // Default s3 bucket `default-s3` if no args provided via CLI.

console.log(
  magenta,
  'Please note that the app will be deployed in the ',
  `${red}"${arg}"`,
  magenta,
  ' s3 bucket\n\n',
  reset
);

execSync(`aws s3 sync build/ s3://${arg}`, { stdio: [0, 1, 2] });
