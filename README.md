# Usage

```
const api = require ('node-palmettosolar');

async function test() {
    let token = await api.authenticate('user@email.com', 'password');

    let user = await api.user(token);

    let sitestatus = await api.siteStatus(token);

    let energy = await api.energy(token, '2022-04-23', api.intervals.week, api.values.total);

    let notifications = await api.notifications(token);
}

test()
```