const fs = require('fs')
const prompt = require('prompt');
function product(iterables, repeat) {
  var argv = Array.prototype.slice.call(arguments), argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
  	var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) {
    	copies.push(argv[0].slice()); // Clone
    }
    argv = copies;
  }
  return argv.reduce(function tl(accumulator, value) {
    var tmp = [];
    accumulator.forEach(function(a0) {
      value.forEach(function(a1) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}
prompt.start();
const asked = [];
var regex = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g;
var testregex = /[\s1234567890]/g;
fs.writeFileSync(`test.txt`, '')
prompt.get(['password'], function (err, result) {
    if (err) { return onErr(err); }
  console.clear();
  const password = result.password
  let attempts = 0
  let char = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()<>?`
  const rockyou1 = fs.readFileSync('rockyou.txt').toString()
  const rockyou = rockyou1.split('\n')
  let chars = char.split("");
  let break1 = false
  console.log(`Checking for password ${password}`)
  for (i = 0; i < 322402; i++) {
    newPass = rockyou[i]
    if (newPass == password) {
      console.log('We found your password using a list of common passwords! (if this is your password you should change it)')
      break1 = true
      break;
    }
  }
  for (i = 1; i < password.length; i++) {
    for(newPass1 in product(chars, repeat = i)) {
      if(newPass1 == password) {
        break1 = true 
        break;
      } else {
        attempts++;
      }
    }
    if (break1 == true) {
      break;
    }
    console.log(`Checked all passwords for ${i} letter passwords`)
  }

  console.log(`We got your password ${password} in ${attempts} tries!`)
});

function onErr(err) {
    console.log(err);
    return 1;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
