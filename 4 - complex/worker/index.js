const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,

  // If the redis client ever loses connection to the redis server it should try every 1 second to reconnect to it
  retry_strategy: () => 1000,
});

// Create a duplicate of the redis client. Sub stands for subscription
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// Anytime we get a new message, ruin this callback function right here
sub.on('message', (channel, message) => {

  // redis is a key value store. The key is the message (index), the value is the fib associate with
  // This line sets the value associatied with the key (the message)
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');
