const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});


describe("generateCandidate", () => {
  it("Generates sha-512 hashses from event tokens", () => {
    let event = {};
    let output = null;
    output = deterministicPartitionKey(event);
    expect(output.length).toBeLessThanOrEqual(256);

  })
})


describe("Use original partition key", () => {
  it("Uses the original partition key if not too long", () => {
    let event = {};
    event.partitionKey = "taco bell";
    output = deterministicPartitionKey(event);
    expect(output).toBe(event.partitionKey);
  })
})


describe("Replace long keys", () => {
  it("Replaces partition keys that are too long", () => {
    let event = {};
    event.partitionKey = "testing the test cases".repeat(256)
    output = deterministicPartitionKey(event);
    expect(output.length).toBeLessThanOrEqual(256);
    expect(output.includes("testing the test cases")).toBe(false);
  })
})


describe("Non-string partition keys", () => {
  it("Uses the original partition key if not too long", () => {
    let event = {};
    event.partitionKey = 123456;
    output = deterministicPartitionKey(event);
    expect(output).toBe(event.partitionKey);
  })
})