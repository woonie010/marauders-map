describe('NavBar Component', () => {
  beforeEach(() => {
    // Visit the main page
    cy.visit('/');
  });

  it('should render the navigation bar', () => {
    // Check if the nav bar is rendered
    cy.get('nav#nav-bar').should('exist');
  });

  it('should display the correct organisation name', () => {
    // Check if the organisation name is displayed correctly
    cy.get('nav#nav-bar').contains('Monash');
  });

  it('should have a link to Tracking page', () => {
    // Check if the link to the Tracking page exists and works
    cy.get('nav#nav-bar').contains('Tracking').should('have.attr', 'href', '/tracking');
  });

  it('should have a link to Database page', () => {
    // Check if the link to the Database page exists and works
    cy.get('nav#nav-bar').contains('Database').should('have.attr', 'href', '/database');
  });

  it('should have a link to Dashboard page', () => {
    // Check if the link to the Dashboard page exists and works
    cy.get('nav#nav-bar').contains('Dashboard').should('have.attr', 'href', '/dashboard');
  });

  it('should render the SearchBar component', () => {
    // Check if the SearchBar component is rendered
    cy.get('nav#nav-bar').find('input[type="text"]').should('exist');
  });
});
