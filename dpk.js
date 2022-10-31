const crypto = require("crypto");
const MAX_PARTITION_KEY_LENGTH = 256

function generateHash(data) {
  return crypto
      .createHash("sha3-512")
      .update(data)
      .digest("hex");
}

function generateCandidate(event) {
  if(event.partitionKey) {
    return event.partitionKey.length > MAX_PARTITION_KEY_LENGTH ?
      generateHash(event.partitionKey) :
      event.partitionKey
  }
  else {
    const data = JSON.stringify(event);
    return generateHash(data);
  }
}


exports.deterministicPartitionKey = (event) => {
  /*
  This function hashes a a given partitionKey
  */

  return event ? generateCandidate(event): "0"
  

    /* Is this correct? I feel like the intent of this
    code is to return a hashed string but
    this logic forces returning of event.partitionKey (if it is not a string)
    or TRIVIAL_PARTITION_KEY.
    This is a refactor of the original logic but it seems incorrectly implemented?
    It looks like this code presumes createHash does not return
    a string when it actually does and tries to coerce it.*/
    // candidate = typeof candidate !== "string" ?
    //   JSON.stringify(candidate) : TRIVIAL_PARTITION_KEY;    
    /**This line ^ **/

};