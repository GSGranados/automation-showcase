Feature: Ecommerce E2E Feature

    Feature Description
    @ecommerce
    Scenario Outline: <TestID>: Scenario Outline name
        Given An ecommerce website, access to the <homeSection>
        When You provide the standard user credentials
        Then Start adding <numberOfProducts> products to the cart
        # Then Proceed to the checkout part

        Examples:
            | TestID    | homeSection | numberOfProducts |
            | ECO_TC001 | Home        | 5                |
