Feature: API Feature test

    This feature is going to validate the data coming from a Placeholder API
    @api
    Scenario Outline: <TestID>: API Test to obtain 10 placeholder user records
        Given Fetch a set of placeholder users, with <Endpoint> endpoint, store those in the data folder

        Examples:
            | TestID    | Endpoint |
            | API_TC001 | users    |