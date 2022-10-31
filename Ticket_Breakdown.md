# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Ticket #1 
    Title: Create a table in the database for cross-referencing CustomAgentIds to Facilities.
        Example:
            ```CREATE TABLE CustomAgentId (
                agentId VARCHAR
                faciltiyID VARCHAR
            );```
    Time:
        1 hour (depends on database augmentation process. I'm familiar with Alembic for database schema management.)
    Acceptance:
        Table is created and exists in databases across the CI pipeline.
    Implementation:
        Depends on database management tool and security infrastructure.
        Would hopefully be as simple as making a database ORM model revision and pushing to a project.
Ticket #2
    Title: Extend Admin Panel
    Time:
        1 day - 1 week.
        Depends on the state of an admin panel and other security concerns.
        Admin panels aren't too complex to implement but we should be rigorous in what we want to not expose.
    Acceptance:
        Users are able to enter the admin panel, select various agents and input custom names as text to replace agent IDs on reports.
    Implementation:
        Extend an admin panel for facilities to map CustomAgentIds to internal `Agent` ids restricting their available selection to only those that are available in any of their reports.
        Facilities should be able to map custom names to agents from a drop-down list of agents.
        Facilities should be able to map many agents in a single POST request.
        (User input may be rather complicated and I'd want to work directly with facilities if possible to design the most efficient data entry solution for them)
Ticket #3
    Title: Augment `generateReport`
    Time:
        1 day
    Acceptance:
        Tests are added to the test suite to verify data is pulled from `CustomAgentId` and replaces existing Agent.ids.
        Users see their custom IDs in place to internal database IDs.
    Implemetation:
        Augment necessary queries in `generateReport` to query the `CustomAgentId` for custom IDs, using the original ID if not found.
