/// <reference types="cypress" />

after('after:run', () => {
    const runner = Cypress.mocha.getRunner();
    const totalTests = runner.stats.tests;
    const passed = runner.stats.passes;
    const failed = runner.stats.failures;
    const pending = runner.stats.pending;
    const passedTests = [];
    const failedTests = [];
    const pendingTests = [];
    let currentSuite = '';

    runner.suite.eachTest((test) => {
        const itName = test.title; // obter somente o nome do IT
        const suiteName = test.parent.titlePath()[0];
        if (currentSuite !== suiteName) {
            currentSuite = suiteName;
        }
        if (test.state === 'passed') {
            passedTests.push(`✅ ${itName}`); // adicionar somente o nome do IT aos testes passados
        } else if (test.state === 'failed') {
            failedTests.push(`❌ ${itName} \n\n ${test.err.stack} \n`); // adicionar somente o nome do IT aos testes falhos e Também o motivo da falha
        } else {
            pendingTests.push(`⌛ ${itName}`); // adicionar somente o nome do IT aos testes pendentes
        }
    });

    const results = {
        totalTests,
        passed,
        failed,
        pending,
        currentSuite, // adicionar o nome da suíte da spec ao objeto results
        passedTests,
        failedTests,
        pendingTests
    };

    let specNameArquivo = Cypress.spec.name;

    cy.task('sendResults', { results, specNameArquivo }).then(results => {
        console.log(results)
    });
});