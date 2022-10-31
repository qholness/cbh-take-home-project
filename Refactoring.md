# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Major choices:
-- Altered decision tree to be more concise. Many if statements made the code a bit hard to follow so I reduced their usage and eliminated some redundancy.
-- Moved MAX_PARTITION_KEY_LENGTH checking to only check event with "partitionKey"s since hashed data returns fixed output.
-- Had some questions about string coercion (lines 17-23 in the original dpk.js). It coerces non-string candidates and coerced hashed strings to the TRIVIAL_PARTITION_KEY. Is this intentional? The logic here is a bit confusing as it also made the subsequent MAX_PARTITION_LENGTH check obsolete.

In summary, pulled out redundant code and made event processing it's own function for testability.