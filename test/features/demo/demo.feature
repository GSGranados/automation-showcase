Feature: Initial web interactions feature

    This feature file will cover a variety of web interactions using the Browser element and making some assertions with Chai
    @demo
    Scenario Outline: <TestID>: Running First Demo Feature - Web Interactions
        Given Using a <SearchTerm> to find an Automation practice website
        When You clicked on the option that appears first
        Then Navigate through various links and test some web interactions
        Then Applying all automation knowledge, use an effective selector strategy to obtain and assert certain data

        Examples:
            | TestID     | SearchTerm              |
            | DEMO_TC001 | the internet heroku app |
