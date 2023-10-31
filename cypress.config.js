const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        sendResults({ results, specNameArquivo }) {
          const body = {
            tituloModulo: specNameArquivo,
            totalTests: results.totalTests,
            passed: results.passed,
            failed: results.failed,
            pending: results.pending,
            tituloPassed: results.passedTests.join('\n\n'),
            tituloFailed: results.failedTests.join('\n\n'),
            tituloPendente: results.pendingTests.join('\n\n'),
            currentSuite: results.currentSuite,
          };
          return body;
        }
      });
      
    },
  },
});
