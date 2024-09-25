describe('BMI Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/calculation');
  });

  it('should header contains Calculation and Bilan elements', () => {
    cy.contains('Calculation');
    cy.contains('Bilan');
  });

  it('should calculate BMI in metric system', () => {
    cy.get('[formControlName="weight"]').type('70');
    cy.get('[formControlName="height"]').type('1.75');
    cy.contains('Your BMI:').should('exist');
  });

  it('should calculate BMI in imperial system', () => {
    cy.get('mat-radio-button[value="imperial"]').click();
    cy.get('[formControlName="weight"]').type('154.3234');
    cy.get('[formControlName="height"]').type('68.897675');
    cy.contains('Your BMI:').should('exist');
  });

  it('should switch to imperial system and convert values', () => {
    cy.get('[formControlName="weight"]').type('70');
    cy.get('[formControlName="height"]').type('1.75');
    cy.get('mat-radio-button[value="imperial"]').click();
    cy.get('[formControlName="weight"]').should('have.value', '154.3234');
    cy.get('[formControlName="height"]').should('have.value', '68.897675');
  });

  it('should switch to metric system and convert values', () => {
    cy.get('[formControlName="weight"]').type('70');
    cy.get('[formControlName="height"]').type('1.75');
    cy.get('mat-radio-button[value="imperial"]').click();
    cy.get('[formControlName="weight"]').should('have.value', '154.3234');
    cy.get('[formControlName="height"]').should('have.value', '68.897675');
    cy.get('mat-radio-button[value="metric"]').click();
    cy.get('[formControlName="weight"]').type('70');
    cy.get('[formControlName="height"]').type('1.75');
  });

  it('should check bmi rest the same when changing system', () => {
    cy.get('[formControlName="weight"]').type('70');
    cy.get('[formControlName="height"]').type('1.75');

    cy.get('p')
      .contains('Your BMI:')
      .invoke('text')
      .then((bmiMetricText) => {
        const bmiMetric = parseFloat(bmiMetricText.replace('Your BMI: ', ''));

        cy.get('mat-radio-button[value="imperial"]').click();

        cy.get('[formControlName="weight"]').should('have.value', '154.3234');
        cy.get('[formControlName="height"]').should('have.value', '68.897675');

        cy.get('p')
          .contains('Your BMI:')
          .invoke('text')
          .then((bmiImperialText) => {
            const bmiImperial = parseFloat(
              bmiImperialText.replace('Your BMI: ', '')
            );
            expect(bmiMetric).equal(bmiImperial);
          });
      });
  });
});
