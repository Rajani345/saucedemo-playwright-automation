// @ts-nocheck
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
    jsonDir: 'reports', // The directory containing your JSON report
    reportPath: './reports/html', // Output directory for HTML
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '20.04'
        }
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project', value: 'RAJ' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toLocaleString() },
            { label: 'Execution End Time', value: new Date().toLocaleString() }
        ]
    }
});
