const log = {
  debug(msg) {
    print('blue', msg);
  },

  error(msg) {
    print('red', msg);
  },

  warn(msg) {
    print('yellow', msg);
  }
};

export default log;

function print(color, msg) {
  console.log(`${chalk[color]('[pillot]')} ${msg}`);
}
