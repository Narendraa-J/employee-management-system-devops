const test = require('node:test');
const assert = require('node:assert');

const API_URL = process.env.API_URL || 'http://localhost:5000';

test('GET /employees should return employee list', async () => {
    const response = await fetch(`${API_URL}/employees`);

    assert.strictEqual(response.status, 200);

    const data = await response.json();

    assert.ok(Array.isArray(data));
});

test('POST /employees should add an employee', async () => {
    const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Jenkins Test',
            department: 'DevOps'
        })
    });

    assert.strictEqual(response.status, 200);

    const data = await response.json();

    assert.strictEqual(
        data.message,
        'Employee Added Successfully'
    );
});