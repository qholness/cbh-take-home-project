const crypto = require("crypto");

function generateCandidate(event) {
  const data = JSON.stringify(event);

  return event.partitionKey ? 
    event.partitionKey : 
    crypto
      .createHash("sha3-512")
      .update(data)
      .digest("hex");
}


exports.deterministicPartitionKey = (event) => {
  /*
  This function hashes a a given partitionKey
  */
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate;
  
  if (event) {
    candidate = generateCandidate(event);

    /* Is this correct? I feel like the intent of this
    code is to return a hashed string but
    this logic forces returning of event.partitionKey (if it is not a string)
    or TRIVIAL_PARTITION_KEY.
    This is a refactor of the original logic but it seems incorrectly implemented? */
    // candidate = typeof candidate !== "string" ?
    //   JSON.stringify(candidate) : TRIVIAL_PARTITION_KEY;    
    /**This line ^ **/

    return candidate
  }

  return TRIVIAL_PARTITION_KEY;

};