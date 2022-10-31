const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKeyWithEvent", () => {
  it("Returns signed partition keys", () => {
    let event = 1231293812093812082198912309810938210983120983019280983210983210831028321093812093821098312094;
    const output = deterministicPartitionKey(event);
    expect(output.length).toBeLessThanOrEqual(256);
  });
});
